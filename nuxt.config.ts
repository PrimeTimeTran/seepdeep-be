// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: ['~/plugins/fontawesome.ts'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  formkit: {
    autoImport: true,
  },
  mongoose: {
    options: {},
    modelsDir: 'models',
    uri: process.env.MONGODB_URI,
  },
  runtimeConfig: {
    host: process.env.HOST,
    googleAPIKey: process.env.GOOGLE_API_KEY,
    public: {
      apiUrl: process.env.API_URL,
      hostUrl: process.env.HOST_URL,
    },
  },
  app: {
    head: {
      script: [
        { src: '/js/Hotkeys.js', tagPosition: 'head' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js', tagPosition: 'head' },
      ],
    },
  },
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@formkit/nuxt',
    'nuxt-mongoose',
    '@nuxt/content',
    'nuxt-vuefire',
    '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  alias: {
    '@models': path.resolve(__dirname, 'server/models'),
    '@utils': path.resolve(__dirname, 'server/utils'),
    '@services': path.resolve(__dirname, 'server/services'),
    '@security': path.resolve(__dirname, 'server/utils/security'),
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  content: {
    documentDriven: true,
    api: {
      baseURL: '/api/_my_content',
    },
    highlight: {
      preload: ['dart', 'python', 'javascript', 'js', 'typescript', 'ts', 'vue'],
      theme: {
        light: 'github-light',
        default: 'github-dark',
      },
    },
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/fontawesome-free',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/pro-light-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },
  vuefire: {
    config: {
      appId: '',
      apiKey: '',
      projectId: '',
      authDomain: '',
      databaseURL: '',
      measurementId: '',
      storageBucket: '',
      messagingSenderId: '',
    },
  },
})
