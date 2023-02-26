// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Audiowide: {
        ital: [700],
      },
      Play: {
        ital: [700],
      },
    },
  },
});
