export default defineNuxtConfig({
  devtools: { enabled: true },

  // Agregamos Nuxt Content a los módulos
  modules: [
    '@nuxt/content'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: [
    '~/assets/css/main.css'
  ]
})