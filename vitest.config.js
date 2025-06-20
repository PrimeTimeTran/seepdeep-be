// vitest.config.js
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.js'],
  },
  resolve: {
    alias: {
      '@services': path.resolve('./server/services'),
      '@api': path.resolve('./server/api'),
    },
  },
})
