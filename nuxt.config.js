export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/components.js' },
    { src: '@/plugins/api.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    '@nuxtjs/toast'

  ],

  toast: {
    position: 'top-right',
    duration: 4000,
    fitToScreen: true,
    action: {
      text: 'x',
      onClick: (e, toastObject) => {
        toastObject.goAway(1)
      }
    }
  },

  auth: {
    strategies: {
      local: false,
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${process.env.KEYCLOAK_API}auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
          token: `${process.env.KEYCLOAK_API}auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          userInfo: `${process.env.KEYCLOAK_API}auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
          logout: `${process.env.KEYCLOAK_API}auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=` + encodeURIComponent(process.env.KEYCLOAK_REDIRECT_HOST)
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 1800 // Can be dynamic ?
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30 // Can be dynamic ?
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        realm: process.env.KEYCLOAK_REALM,
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256',
      },
    },
    redirect: {
      login: '/login',
      home: '/dashboard',
      logout: '',
      callback: '/callback'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    proxyHeaders: true,
  },

  proxy: {
    '/products_api': {target: process.env.PRODUCTS_API, pathRewrite: {'^/products_api': '/api'}, changeOrigin: true},
    // '/products_api/docs': {target: process.env.PRODUCTS_API, pathRewrite: {'^/products_api': '/'}, changeOrigin: true},
    // '/products_api/openapi.json': {target: process.env.PRODUCTS_API, pathRewrite: {'^/products_api': '/'}, changeOrigin: true},

    '/users_api': {target: process.env.USERS_API, pathRewrite: {'^/users_api': '/api'}, changeOrigin: true},
    // '/users_api/docs': {target: process.env.USERS_API, pathRewrite: {'^/users_api': '/api'}, changeOrigin: true},
    // '/users_api/openapi.json': {target: process.env.USERS_API, pathRewrite: {'^/users_api': '/api'}, changeOrigin: true},
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth']
  },

  env: {
    KEYCLOAK_API: process.env.KEYCLOAK_API,
    PRODUCTS_API: process.env.PRODUCTS_API,
    USERS_API: process.env.USERS_API,
    KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_REDIRECT_HOST: process.env.KEYCLOAK_REDIRECT_HOST,
  }
}
