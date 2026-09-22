#!/usr/bin/env python3
"""Build the production EN→RU dictionary served by sENG.

Source: WikDict English→Russian generic SQLite database.
WikDict data is derived from Wiktionary via DBnary and distributed under
Creative Commons Attribution-ShareAlike (CC BY-SA).

The source database is downloaded only during deployment. The browser never
needs WikDict for normal lookups: generated JSON shards are served from the
same origin as sENG. External translation remains only a last-resort fallback.
"""

from __future__ import annotations

import json
import re
import sqlite3
import sys
import tempfile
import time
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

SOURCE_URL = "https://download.wikdict.com/dictionaries/sqlite/2/en-ru.sqlite3"
OUT_DIR = Path("public/dictionary/en-ru")
MIN_SOURCE_BYTES = 5 * 1024 * 1024
USER_AGENT = "sENG-dictionary-builder/1.0 (+https://qsen.ru/eng-source/)"


def normalize_headword(value: str) -> str:
    value = (
        value.lower()
        .replace("’", "'")
        .replace("‘", "'")
        .replace("‐", "-")
        .replace("‑", "-")
        .strip()
    )
    value = re.sub(r"\s+", " ", value)
    return value


def bucket_for(value: str) -> str:
    first = value[:1]
    return first if "a" <= first <= "z" else "_"


def download_database(target: Path) -> tuple[str | None, int]:
    last_error: Exception | None = None
    for attempt in range(1, 4):
        try:
            request = urllib.request.Request(
                SOURCE_URL,
                headers={"User-Agent": USER_AGENT, "Accept": "application/octet-stream"},
            )
            print(f"[dictionary] downloading {SOURCE_URL} (attempt {attempt}/3)", flush=True)
            with urllib.request.urlopen(request, timeout=120) as response:
                last_modified = response.headers.get("Last-Modified")
                content_length = response.headers.get("Content-Length")
                with target.open("wb") as handle:
                    while True:
                        chunk = response.read(1024 * 1024)
                        if not chunk:
                            break
                        handle.write(chunk)

            size = target.stat().st_size
            expected = int(content_length) if content_length and content_length.isdigit() else None
            if expected is not None and size != expected:
                raise RuntimeError(
                    f"Dictionary download incomplete: expected {expected}, got {size}"
                )
            if size < MIN_SOURCE_BYTES:
                raise RuntimeError(
                    f"Dictionary download is unexpectedly small: {size} bytes"
                )
            return last_modified, size
        except Exception as exc:
            last_error = exc
            target.unlink(missing_ok=True)
            if attempt < 3:
                time.sleep(attempt * 3)

    raise RuntimeError(f"Unable to download dictionary after 3 attempts: {last_error}")


def find_translation_table(connection: sqlite3.Connection) -> tuple[str, str, str]:
    tables = {
        row[0]
        for row in connection.execute(
            "SELECT name FROM sqlite_master WHERE type IN ('table','view')"
        )
    }

    for table in ("simple_translation", "translation_grouped", "translation"):
        if table not in tables:
            continue
        columns = {
            row[1]
            for row in connection.execute(f'PRAGMA table_info("{table}")')
        }
        word_col = "written_rep" if "written_rep" in columns else None
        trans_col = "trans_list" if "trans_list" in columns else None
        if word_col and trans_col:
            return table, word_col, trans_col

    raise RuntimeError(
        "Unsupported WikDict schema: no translation table with written_rep/trans_list"
    )


def merge_translation(existing: str | None, incoming: str) -> str:
    values: list[str] = []
    seen: set[str] = set()
    for source in (existing or "", incoming):
        for item in re.split(r"\s*\|\s*", source):
            item = item.strip()
            if not item:
                continue
            key = item.casefold()
            if key in seen:
                continue
            seen.add(key)
            values.append(item)
    return " | ".join(values)


def build_shards(database: Path, last_modified: str | None, source_size: int) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for stale in OUT_DIR.glob("*.json"):
        stale.unlink()
    notice = OUT_DIR / "NOTICE.txt"
    if notice.exists():
        notice.unlink()

    connection = sqlite3.connect(f"file:{database}?mode=ro", uri=True)
    try:
        table, word_col, trans_col = find_translation_table(connection)
        query = (
            f'SELECT "{word_col}", "{trans_col}" FROM "{table}" '
            f'WHERE "{word_col}" IS NOT NULL AND "{trans_col}" IS NOT NULL '
            f'ORDER BY "{word_col}" COLLATE NOCASE'
        )

        shards: dict[str, dict[str, str]] = defaultdict(dict)
        source_rows = 0
        for raw_word, raw_translation in connection.execute(query):
            source_rows += 1
            word = normalize_headword(str(raw_word))
            translation = str(raw_translation).strip()
            if not word or not translation:
                continue
            # The reading UI is English-only on the source side. Keep real
            # headwords and phrases, but discard malformed whitespace/control data.
            if len(word) > 120 or len(translation) > 2000:
                continue
            bucket = bucket_for(word)
            shards[bucket][word] = merge_translation(
                shards[bucket].get(word), translation
            )
    finally:
        connection.close()

    entry_count = 0
    byte_count = 0
    shard_meta: dict[str, int] = {}

    for bucket in [chr(code) for code in range(ord("a"), ord("z") + 1)] + ["_"]:
        entries = shards.get(bucket, {})
        path = OUT_DIR / f"{bucket}.json"
        payload = json.dumps(
            entries,
            ensure_ascii=False,
            separators=(",", ":"),
            sort_keys=True,
        )
        path.write_text(payload, encoding="utf-8")
        entry_count += len(entries)
        size = path.stat().st_size
        byte_count += size
        shard_meta[bucket] = len(entries)

    generated_at = datetime.now(timezone.utc).isoformat()
    metadata = {
        "name": "WikDict English–Russian",
        "languagePair": "en-ru",
        "entries": entry_count,
        "sourceRows": source_rows,
        "source": SOURCE_URL,
        "sourceLastModified": last_modified,
        "sourceBytes": source_size,
        "generatedAt": generated_at,
        "license": "CC BY-SA",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
        "attribution": "WikDict / Wiktionary via DBnary",
        "shards": shard_meta,
        "jsonBytes": byte_count,
    }
    (OUT_DIR / "meta.json").write_text(
        json.dumps(metadata, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

    notice.write_text(
        "sENG local English–Russian dictionary\n\n"
        "Dictionary data: WikDict / Wiktionary via DBnary\n"
        "Source: https://www.wikdict.com/ and "
        "https://download.wikdict.com/dictionaries/sqlite/2/en-ru.sqlite3\n"
        "License: Creative Commons Attribution-ShareAlike (CC BY-SA)\n"
        "https://creativecommons.org/licenses/by-sa/3.0/\n\n"
        "The dictionary data files in this directory are redistributed under "
        "the source data license. Application code remains separately licensed.\n",
        encoding="utf-8",
    )

    print(
        f"[dictionary] {entry_count:,} normalized entries from {source_rows:,} rows; "
        f"{byte_count / 1024 / 1024:.1f} MiB JSON across {len(shard_meta)} shards",
        flush=True,
    )


def main() -> int:
    OUT_DIR.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="seng-wikdict-") as tmp:
        database = Path(tmp) / "en-ru.sqlite3"
        last_modified, size = download_database(database)
        build_shards(database, last_modified, size)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"[dictionary] ERROR: {exc}", file=sys.stderr)
        raise
