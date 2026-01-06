import { setup } from '@nuxt/test-utils'

globalThis.defineEventHandler = (handler) => handler

if (process.env.VITEST_NUXT_SERVER === 'true') {
  await setup({
    rootDir: './',
    setup: true,
    server: true,
  })
}
