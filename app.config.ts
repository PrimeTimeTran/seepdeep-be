// https://nuxt.com/modules/icon

export default defineAppConfig({
  nuxtIcon: {
    size: '20px',
    class: 'app-icon',
    aliases: {
      mLogo: 'logos:medium',
      nuxt: 'logos:nuxt-icon',
    },
    iconifyApiOptions: {
      url: 'https://<your-api-url>',
      publicApiFallback: true,
    },
  },
})
