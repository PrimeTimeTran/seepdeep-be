import { setup } from '@nuxt/test-utils'

globalThis.defineEventHandler = (handler) => handler

await setup({
  rootDir: './',
  setup: true,
  server: true,
})
