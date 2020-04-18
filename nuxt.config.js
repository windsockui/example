export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
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
                href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@300;400'
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
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/fontawesome'
    ],
    fontawesome: {
        component: 'fa',
        icons: {
            solid: ['faGripVertical', 'faUpload', 'faTimes', 'faSave', 'faUndoAlt', 'faCamera', 'faCameraRetro', 'faCheck', 'faExclamationTriangle', 'faSyncAlt', 'faArrowUp', 'faArrowDown', 'faTrashAlt']
        }
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    proxy: [

        ['/cms', {
            target: 'http://localhost:8080',
            pathRewrite: {'^/cms': '/'}
        }]
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    },
    server: {
        port: 3000,
        host: '0.0.0.0'
    }
}
