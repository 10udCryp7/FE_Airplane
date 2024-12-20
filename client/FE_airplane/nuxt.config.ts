// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from "path";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  components: [
    './components',
    './components/button',
    './components/input',
    './components/form',
    './components/main',
    './components/display',
    './components/admin',
  ],

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
});