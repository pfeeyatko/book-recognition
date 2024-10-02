// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    SHEET_SCRIPT_URL: process.env.SHEET_SCRIPT_URL,
    public: {
      //
    },
  },
  imports: {
    presets: [
      {
        from: 'vue-barcode-reader',
        imports: ['StreamBarcodeReader']
      }
    ]
  }
})