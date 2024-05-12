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
  routeRules: {
    '/administrator/**': { ssr: false },
    '/api/**': { cors: true, ssr: false, prerender: false },
  },
  mongoose: {
    options: {},
    modelsDir: 'models',
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/turboship',
  },
  runtimeConfig: {
    host: process.env.HOST,
    googleAPIKey: process.env.GOOGLE_API_KEY,
    authTokenExpiresIn: process.env.AUTH_TOKEN_EXPIRES_IN || '3650 days',
    authTokenSecret: process.env.AUTH_TOKEN_SECRET || 'secretsecretTaseSpray',
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
    'nuxt-vuefire',
    '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils/module'
  ],
  alias: {
    '@models': path.resolve(__dirname, 'server/models'),
    '@utils': path.resolve(__dirname, 'server/utils'),
    '@services': path.resolve(__dirname, 'server/services'),
    '@security': path.resolve(__dirname, 'server/utils/security'),
    '@helpers': path.resolve(__dirname, 'server/utils/helpers/all.js'),
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
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
      projectId: 'turboship-dev',
      measurementId: 'G-3Y4HHYCZK7',
      messagingSenderId: '885916988672',
      storageBucket: 'turboship-dev.appspot.com',
      authDomain: 'turboship-dev.firebaseapp.com',
      databaseURL: 'https://turboship-dev-default-rtdb.firebaseio.com',
      appId: '1:885916988672:web:1cca060cfd4ac74a2eafe5',
      apiKey: 'AIzaSyBaBHq_Igg8V6xDmuNBMDWK_KputgYfSLM',
    },
  },
})
