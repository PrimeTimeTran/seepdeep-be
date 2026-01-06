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
      '@': path.resolve(__dirname), // root of your project
    },
    extensions: ['.js', '.ts'], // add these!
  },
})
