import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

const version = JSON.parse(readFileSync('dist/version.json', 'utf8')).version
const workerCode = readFileSync('dist/sw.js', 'utf8')
assert.match(version, /^[a-zA-Z0-9-]{8,64}$/)
assert.ok(!workerCode.includes('__SENG_BUILD_ID__'), 'The SW placeholder must be replaced')
assert.ok(workerCode.includes("const VERSION='" + version + "'"), 'SW version must match version.json')
assert.ok(readdirSync('dist/assets').filter(name => name.endsWith('.js'))
  .some(name => readFileSync('dist/assets/' + name, 'utf8').includes(version)),
  'The app must embed the same version as the service worker')

const listeners = new Map()
let skipped = 0
let claimed = 0
const deleted = []
const scope = 'https://example.test/englearning/'
const worker = {
  addEventListener(type, callback) { listeners.set(type, callback) },
  skipWaiting() { skipped++ },
  clients: { claim() { claimed++ } },
  registration: { scope },
  location: { origin: 'https://example.test' },
}
const caches = {
  async open() { return { async addAll() {} } },
  async keys() { return ['seng-shell-v2', 'seng-shell-old', 'unrelated-cache'] },
  async delete(name) { deleted.push(name) },
}
runInNewContext(workerCode, { self: worker, caches, URL, Request, Response, fetch })

let install
listeners.get('install')({ waitUntil(value) { install = value } })
await install
assert.equal(skipped, 0, 'SW may not automatically take over during a study session')

listeners.get('message')({ data: { type: 'OTHER_MESSAGE' } })
assert.equal(skipped, 0)
listeners.get('message')({ data: { type: 'SKIP_WAITING' } })
assert.equal(skipped, 1, 'The user action must activate the waiting SW')

let activation
listeners.get('activate')({ waitUntil(value) { activation = value } })
await activation
assert.equal(claimed, 1)
assert.deepEqual(deleted.sort(), ['seng-shell-old', 'seng-shell-v2'])
console.log('PWA update assets and SW lifecycle: OK (' + version + ')')
