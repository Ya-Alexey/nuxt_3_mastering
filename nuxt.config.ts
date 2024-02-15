// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    baseSecret: '',
    public: {
      baseKey: '',
    }
  },
  nitro: {
    prerender: {
      routes: ['/landing'],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  supabase: {
    redirect: false,
  }
})
