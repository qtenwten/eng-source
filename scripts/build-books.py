#!/usr/bin/env python3
"""Build sENG's full-books library from public-domain Project Gutenberg texts.

The generated files are served from the same origin as sENG. Project Gutenberg
is contacted only during CI/deploy; normal reading happens entirely from qsen.ru.

All selected authors died more than 70 years ago. Project Gutenberg marks the
selected editions as public domain in the USA. Source links and attribution are
kept in the generated catalog and reader UI.
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.request
from pathlib import Path

OUT_DIR = Path("public/books")
TARGET_WORDS = 1350
MIN_WORDS = 450

BOOKS = [
    {
        "slug": "peter-rabbit",
        "title": "The Tale of Peter Rabbit",
        "author": "Beatrix Potter",
        "gutenbergId": 14838,
        "cefr": "A2",
        "country": "UK",
        "year": 1902,
        "description": "Короткая оригинальная классика: хороший первый шаг от адаптаций к настоящему тексту.",
    },
    {
        "slug": "wizard-of-oz",
        "title": "The Wonderful Wizard of Oz",
        "author": "L. Frank Baum",
        "gutenbergId": 55,
        "cefr": "B1",
        "country": "US",
        "year": 1900,
        "description": "Приключенческий оригинал с ясным сюжетом и повторяющейся лексикой.",
    },
    {
        "slug": "alice-in-wonderland",
        "title": "Alice's Adventures in Wonderland",
        "author": "Lewis Carroll",
        "gutenbergId": 11,
        "cefr": "B1–B2",
        "country": "UK",
        "year": 1865,
        "description": "Живой британский английский, игра слов и необычные диалоги.",
    },
    {
        "slug": "secret-garden",
        "title": "The Secret Garden",
        "author": "Frances Hodgson Burnett",
        "gutenbergId": 17396,
        "cefr": "B1–B2",
        "country": "UK",
        "year": 1911,
        "description": "Большой, но довольно доступный роман для долгого погружения.",
    },
    {
        "slug": "tom-sawyer",
        "title": "The Adventures of Tom Sawyer",
        "author": "Mark Twain",
        "gutenbergId": 74,
        "cefr": "B2",
        "country": "US",
        "year": 1876,
        "description": "Американская классика с разговорной речью, юмором и приключениями.",
    },
    {
        "slug": "treasure-island",
        "title": "Treasure Island",
        "author": "Robert Louis Stevenson",
        "gutenbergId": 120,
        "cefr": "B2",
        "country": "UK",
        "year": 1883,
        "description": "Пираты, море и насыщенный приключенческий английский.",
    },
    {
        "slug": "little-women",
        "title": "Little Women",
        "author": "Louisa May Alcott",
        "gutenbergId": 514,
        "cefr": "B2–C1",
        "country": "US",
        "year": 1868,
        "description": "Большой американский роман: семья, взросление и богатая бытовая лексика.",
    },
    {
        "slug": "call-of-the-wild",
        "title": "The Call of the Wild",
        "author": "Jack London",
        "gutenbergId": 215,
        "cefr": "B2–C1",
        "country": "US",
        "year": 1903,
        "description": "Плотная литературная проза Джека Лондона и сильная природная лексика.",
    },
    {
        "slug": "sherlock-holmes",
        "title": "The Adventures of Sherlock Holmes",
        "author": "Arthur Conan Doyle",
        "gutenbergId": 1661,
        "cefr": "B2–C1",
        "country": "UK",
        "year": 1892,
        "description": "Двенадцать рассказов — удобно читать как отдельные законченные истории.",
    },
    {
        "slug": "black-beauty-young-folks",
        "title": "Black Beauty — Young Folks' Edition",
        "author": "Anna Sewell",
        "gutenbergId": 11860,
        "cefr": "A2–B1",
        "country": "UK",
        "year": 1877,
        "description": "Сокращённое старое издание Black Beauty: заметно легче большинства викторианских романов.",
    },
    {
        "slug": "doctor-dolittle",
        "title": "The Story of Doctor Dolittle",
        "author": "Hugh Lofting",
        "gutenbergId": 501,
        "cefr": "A2–B1",
        "country": "UK",
        "year": 1920,
        "description": "Детская приключенческая история с довольно прямым синтаксисом и повторяющейся лексикой.",
    },
    {
        "slug": "railway-children",
        "title": "The Railway Children",
        "author": "E. Nesbit",
        "gutenbergId": 1874,
        "cefr": "B1",
        "country": "UK",
        "year": 1906,
        "description": "Детская британская классика с очень высокой читаемостью и ясным повествованием.",
    },
    {
        "slug": "pollyanna",
        "title": "Pollyanna",
        "author": "Eleanor H. Porter",
        "gutenbergId": 1450,
        "cefr": "B1",
        "country": "US",
        "year": 1913,
        "description": "Доступный американский роман с бытовой лексикой, диалогами и понятным сюжетом.",
    },
    {
        "slug": "anne-green-gables",
        "title": "Anne of Green Gables",
        "author": "L. M. Montgomery",
        "gutenbergId": 45,
        "cefr": "B1–B2",
        "country": "CA",
        "year": 1908,
        "description": "Тёплая канадская классика: много живой речи, школы, семьи и повседневной лексики.",
    },
    {
        "slug": "jungle-book",
        "title": "The Jungle Book",
        "author": "Rudyard Kipling",
        "gutenbergId": 236,
        "cefr": "B1–B2",
        "country": "UK",
        "year": 1894,
        "description": "Сборник приключенческих рассказов: оригинал уже сложнее, но главы читаются отдельно.",
    },
    {
        "slug": "wind-in-the-willows",
        "title": "The Wind in the Willows",
        "author": "Kenneth Grahame",
        "gutenbergId": 27805,
        "cefr": "B1–B2",
        "country": "UK",
        "year": 1908,
        "description": "Детская классика с богатым, но понятным контекстом и сильной атмосферой.",
    },
    {
        "slug": "little-princess",
        "title": "A Little Princess",
        "author": "Frances Hodgson Burnett",
        "gutenbergId": 37332,
        "cefr": "B1–B2",
        "country": "UK",
        "year": 1905,
        "description": "Школьная и бытовая лексика, много диалогов и эмоционально понятный сюжет.",
    },
    {
        "slug": "great-expectations",
        "title": "Great Expectations",
        "author": "Charles Dickens",
        "gutenbergId": 1400,
        "cefr": "C1",
        "country": "UK",
        "year": 1861,
        "description": "Диккенс в оригинале: длинный синтаксис, социальная лексика и полноценный C1-челлендж.",
    },
]

START_RE = re.compile(r"\*{3}\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\*{3}", re.I)
END_RE = re.compile(r"\*{3}\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\*{3}", re.I)
WORD_RE = re.compile(r"[A-Za-z]+(?:['’][A-Za-z]+)?")
HEADING_RE = re.compile(
    r"^(?:(?:chapter|book|part)\s+[ivxlcdm0-9]+\b|[ivxlcdm]{1,8}[.)]\s+|[0-9]{1,3}[.)]\s+)",
    re.I,
)


def source_urls(gid: int) -> list[str]:
    return [
        f"https://www.gutenberg.org/cache/epub/{gid}/pg{gid}.txt",
        f"https://www.gutenberg.org/ebooks/{gid}.txt.utf-8",
        f"https://www.gutenberg.org/files/{gid}/{gid}-0.txt",
        f"https://www.gutenberg.org/files/{gid}/{gid}.txt",
    ]


def download_text(book: dict) -> tuple[str, str]:
    last_error: Exception | None = None
    for url in source_urls(book["gutenbergId"]):
        for attempt in range(1, 4):
            try:
                request = urllib.request.Request(
                    url,
                    headers={
                        "User-Agent": "sENG-books-builder/1.0 (+https://qsen.ru/eng-source/)",
                        "Accept": "text/plain,*/*",
                    },
                )
                print(f"[books] {book['slug']}: {url} (attempt {attempt}/3)", flush=True)
                with urllib.request.urlopen(request, timeout=90) as response:
                    raw = response.read()
                text = raw.decode("utf-8-sig", errors="replace")
                if len(text) < 3000:
                    raise RuntimeError(f"download too small: {len(text)} chars")
                return text, url
            except Exception as exc:
                last_error = exc
                if attempt < 3:
                    time.sleep(attempt * 2)
    raise RuntimeError(f"could not download {book['title']}: {last_error}")


def strip_gutenberg(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    start = START_RE.search(text)
    if start:
        text = text[start.end():]
    end = END_RE.search(text)
    if end:
        text = text[:end.start()]
    text = text.replace("\ufeff", "").strip()
    return text


def make_paragraphs(text: str) -> list[str]:
    blocks = re.split(r"\n\s*\n+", text)
    paragraphs: list[str] = []
    for block in blocks:
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        if not lines:
            continue
        # Gutenberg wraps prose to fixed line lengths. Joining lines restores paragraphs.
        value = " ".join(lines)
        value = re.sub(r"\s+", " ", value).strip()
        if value:
            paragraphs.append(value)
    return paragraphs


def word_count(text: str) -> int:
    return len(WORD_RE.findall(text))


def heading_for(paragraph: str) -> str | None:
    clean = paragraph.strip()
    if len(clean) > 110:
        return None
    if HEADING_RE.match(clean):
        return clean
    if len(clean.split()) <= 10 and clean.isupper() and any(ch.isalpha() for ch in clean):
        return clean.title()
    return None


def chunk_paragraphs(paragraphs: list[str]) -> list[dict]:
    parts: list[dict] = []
    current: list[str] = []
    current_words = 0
    pending_title: str | None = None

    def flush() -> None:
        nonlocal current, current_words, pending_title
        if not current:
            return
        number = len(parts) + 1
        text = "\n\n".join(current).strip()
        parts.append(
            {
                "id": f"part-{number}",
                "title": pending_title or f"Part {number}",
                "wordCount": word_count(text),
                "text": text,
            }
        )
        current = []
        current_words = 0
        pending_title = None

    for paragraph in paragraphs:
        words = word_count(paragraph)
        heading = heading_for(paragraph)

        if (
            heading
            and current_words >= MIN_WORDS
            and current_words >= int(TARGET_WORDS * 0.65)
        ):
            flush()
            pending_title = heading

        current.append(paragraph)
        current_words += words

        if current_words >= TARGET_WORDS:
            flush()

    flush()
    return parts


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    catalog: list[dict] = []

    for stale in OUT_DIR.glob("*.json"):
        stale.unlink()

    for book in BOOKS:
        raw, downloaded_from = download_text(book)
        text = strip_gutenberg(raw)
        paragraphs = make_paragraphs(text)
        parts = chunk_paragraphs(paragraphs)
        total_words = sum(part["wordCount"] for part in parts)

        if not parts or total_words < 1000:
            raise RuntimeError(
                f"{book['title']} parsed incorrectly: {len(parts)} parts, {total_words} words"
            )

        source_page = f"https://www.gutenberg.org/ebooks/{book['gutenbergId']}"
        payload = {
            "meta": {
                **book,
                "sourcePage": source_page,
                "downloadedFrom": downloaded_from,
                "source": "Project Gutenberg",
                "publicDomain": True,
                "wordCount": total_words,
                "partCount": len(parts),
            },
            "parts": parts,
        }

        (OUT_DIR / f"{book['slug']}.json").write_text(
            json.dumps(payload, ensure_ascii=False, separators=(",", ":")),
            encoding="utf-8",
        )

        catalog.append(payload["meta"])
        print(
            f"[books] {book['slug']}: {total_words:,} words / {len(parts)} parts",
            flush=True,
        )

    (OUT_DIR / "catalog.json").write_text(
        json.dumps(catalog, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    (OUT_DIR / "NOTICE.txt").write_text(
        "sENG full-books library\n\n"
        "Texts are downloaded from Project Gutenberg during deployment.\n"
        "Each generated book record contains its exact Project Gutenberg source page.\n"
        "Project Gutenberg marks these selected editions as public domain in the USA.\n"
        "https://www.gutenberg.org/\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    try:
        build()
    except Exception as exc:
        print(f"[books] ERROR: {exc}", file=sys.stderr)
        raise
