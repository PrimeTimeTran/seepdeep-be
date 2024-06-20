// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbConnectionStringUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/turboship'
console.log({
  dbConnectionStringUri,
  env: process.env.ENV_FILE
})

export default defineNuxtConfig({
  sourcemap: { server: true, client: false },
  nitro: {
    prerender: {
      failOnError: false,
      routes: ['/', '/articles/**/**/**', '/theme/**'],
      ignore: ['/administrator/**'],
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  plugins: ['~/plugins/fontawesome.ts'],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  formkit: {
    autoImport: true,
  },
  routeRules: {
    '/articles/**/**/**': { prerender: true },
    '/administrator/**': { ssr: false },
    '/api/**': { cors: true, ssr: false, prerender: false },
  },
  mongoose: {
    options: {},
    modelsDir: 'models',
    uri: dbConnectionStringUri,
  },
  runtimeConfig: {
    host: process.env.HOST,
    googleAPIKey: process.env.GOOGLE_API_KEY,
    authTokenExpiresIn: process.env.AUTH_TOKEN_EXPIRES_IN || '3650 days',
    authTokenSecret: process.env.AUTH_TOKEN_SECRET || 'secretsecretTaseSpray',
    openAIKey: process.env.OPENAI_KEY || 'openAIKey',
    public: {
      apiUrl: process.env.API_URL,
      hostUrl: process.env.HOST_URL,
    },
  },
  app: {
    head: {
      script: [
        { src: '/js/Hotkeys.js', tagPosition: 'head' },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
          tagPosition: 'head',
        },
      ],
    },
  },
  content: {
    experimental: {
      search: true
    },
    documentDriven: true,
    highlight: {
      preload: [
        'dart',
        'python',
        'javascript',
        'js',
        'typescript',
        'ts',
        'vue',
        'vue-html',
        'bash',
      ],
      theme: {
        light: 'github-light',
        default: 'github-dark',
      },
    },
  },
  modules: [
    '@nuxt/content',
    'nuxt-icon',
    '@pinia/nuxt',
    '@formkit/nuxt',
    'nuxt-mongoose',
    'nuxt-vuefire',
    '@samk-dev/nuxt-vcalendar',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils/module',
    '@nuxt/image',
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
      projectId: 'seepdeep-dev',
      measurementId: 'G-Y90JY37LDH',
      messagingSenderId: '870966333694',
      storageBucket: 'seepdeep-dev.appspot.com',
      authDomain: 'seepdeep-dev.firebaseapp.com',
      apiKey: 'AIzaSyC_H8RdeUmT-5sms4ai23E6nLe_nvFghuA',
      appId: '1:870966333694:web:9d5168051bd506074155af',
    },
  }
})
