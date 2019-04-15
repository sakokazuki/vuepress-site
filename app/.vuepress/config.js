
const path = require('path')
const locales = require('./config-files/locales')
const webpackConfig = require('./config-files/webpack.config.js')

module.exports = {
  base: '/',
  title: 'Title',
  description: 'description config',
  port: '9999',
  dest: './build',
  //[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['meta', {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}],
    ['meta', {name: 'keywords', content: 'hoge fuga piyo'}],

    //favicon
    ['link', {rel: "icon", href: '/favicon.ico', type: 'image/vnd.microsoft.icon'}],   
    
    ['meta', {property: "og:type", content: "website"}],
    ['meta', {property: "og:site_name", content: "Title"}],
    ['meta', {property: "og:image", content: "http://localhost:9999/og.png"}],
    ['meta', {property: "og:locale", content: "ja_JP"}],
    ['meta', {name: "twitter:card", content: "summary_large_image"}],
  ],
  locales: locales,
  stylus: {
    preferPathResolver: 'webpack', //default
    import: [
      path.resolve(__dirname, './config-files/styles/variables.styl'),
    ],
  },
  chainWebpack: webpackConfig,
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]  
  ]
}