import type { ColorMode } from '../types'
export function resolveColorMode(mode: ColorMode) { if (mode !== 'system') return mode; return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
