
const path = require('path')
const locales = require('./config-files/locales')
const webpackConfig = require('./config-files/webpack.config.js')
const webpack = require('webpack')



module.exports = {
  base: '/', // It should always start and end with a slash. ex) "/bar/"
  title: 'Title', //This will be the prefix for all page titles,
  description: 'description config',
  port: '9999',
  dest: './build',

  //[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['meta', {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}],
    ['meta', {name: 'keywords', content: 'hoge fuga piyo'}],

    //- og
    ['meta', {property: "og:type", content: "website"}],
    ['meta', {property: "og:title", content: "meta.title"}],
    ['meta', {property: "og:description", content: "meta.description"}],
    ['meta', {property: "og:site_name", content: "title"}],
    ['meta', {property: "og:url", content: "meta.url"}],
    // ['meta', {property: "og:image", content: "http://xxxx.com/img/ogimg"}],
    ['meta', {property: "og:locale", content: "ja_JP"}],
    ['meta', {name: "twitter:card", content: "summary_large_image"}],

    //favicon
    ['link', {rel: "icon", href: '/favicon.ico', type: 'image/vnd.microsoft.icon'}],

    //test 01 inline js test
    ['script', { type: 'text/javascript' }, `
      console.log("head inner script");
    `],
    //test02 element is inserted body top
    ['div', {}, '<!--<div>hoge</div>-->']
    
  ],
  locales: locales,
  chainWebpack: webpackConfig
}