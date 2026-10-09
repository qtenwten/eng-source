import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// CI uses the deployed commit; local builds also get a unique version.
const buildId = process.env.GITHUB_SHA?.slice(0, 12) || 'local-' + Date.now().toString(36)

function pwaVersionPlugin(): Plugin {
  return {
    name: 'seng-pwa-version',
    apply: 'build',
    async closeBundle() {
      const swPath = resolve('dist', 'sw.js')
      const sw = await readFile(swPath, 'utf8')
      const placeholder = '__SENG_BUILD_ID__'
      if (!sw.includes(placeholder)) throw new Error('Missing service-worker version placeholder')
      await writeFile(swPath, sw.replaceAll(placeholder, buildId), 'utf8')
      await writeFile(resolve('dist', 'version.json'), JSON.stringify({ version: buildId }) + '\n', 'utf8')
    },
  }
}

export default defineConfig({
  plugins: [react(), pwaVersionPlugin()],
  base: './',
  define: { __SENG_BUILD_ID__: JSON.stringify(buildId) },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
})
