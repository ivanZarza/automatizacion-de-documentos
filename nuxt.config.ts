// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: '.',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    './app/styles/variables.css'
  ],
  nitro: {
    externals: {
      traceInclude: ['playwright', 'playwright-core']
    }
  }
})
