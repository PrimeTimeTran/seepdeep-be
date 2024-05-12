
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    setupFiles: ['./test/globalSetup.js'],
  },
  resolve: {
    alias: {
      // Add an alias for 'zod-to-mongoose' npm package
      'zod-to-mongoose': 'zod-to-mongoose',
    },
  },
})
