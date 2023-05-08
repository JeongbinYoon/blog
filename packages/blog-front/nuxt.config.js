export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog-front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css',
        integrity:
          'sha512-rO+olRTkcf304DQBxSWxln8JXCzTHlKnIdnMUwYvQa9/Jd4cQaNkItIUj6Z4nvW1dqK0SKXLbn9h4KwZTNtAyw==',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
      },
    ],
  },
  router: {
    middleware: 'protect-login',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/common.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sanity/module',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['@/assets/scss/common.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://172.30.1.48:8851',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@blocknote/core'],
  },
  sanity: {
    projectId: 'lyvfm7vk',
    apiVersion: '2023-04-25',
    useCdn: false,
  },
  server: {
    // host: '0.0.0.0',
    port: '3000', // optional
  },
}
