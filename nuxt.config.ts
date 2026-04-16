// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    '../app/styles/variables.css'
  ],
  app: {
    baseURL: '/generacion-documentacion',
    head: {
      title: 'Generación de Documentación - Solay',
      meta: [
        { name: 'description', content: 'Sistema de generación de documentación profesional' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  nitro: {
    baseURL: '/generacion-documentacion'
  }
})
