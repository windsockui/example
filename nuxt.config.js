export default {
    mode: 'spa', /* @TODO: Needs to switch to universal at some stage */
    env: {
        //domain: process.env.DOMAIN || window.location.host,
        databaseUrl: process.env.DATABASE_URL || 'http://localhost:8080'
    },
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@300;400&family=GFS+Neohellenic'
            }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/fontawesome',
        '@nuxtjs/dotenv',
    ],
    fontawesome: {
        component: 'fa',
        icons: {
            solid: [
                'faGripVertical', 'faUpload', 'faTimes', 'faSave', 'faUndoAlt', 'faCamera',
                'faCheck', 'faExclamationTriangle', 'faSyncAlt', 'faArrowUp', 'faArrowDown', 'faTrashAlt',
                'faPlus', 'faAngleRight', 'faChevronRight'
            ]
        }
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/markdownit',
        'nuxt-purgecss'
    ],
    markdownit: {
        injected: true,
        breaks: true
    },
    proxy: [

        ['/cms', {
            target: process.env.DATABASE_URL || 'http://localhost:8080',
            pathRewrite: {'^/cms': '/'}
        }]
    ],
    purgeCSS: {
        whitelist: 'a, .font-mono .h-24 .h-36 .h-48',
        whitelistPatterns: [/svg.*/],
        //purgeCSSInDev: true
        enabled: true
    },
    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    },
    /*
    server: {
        port: process.env.HOST_PORT || 3000, // default: 3000
        host: process.env.HOST_DOMAIN || '0.0.0.0' // default: localhost
    }
    // other configs
      */

}
