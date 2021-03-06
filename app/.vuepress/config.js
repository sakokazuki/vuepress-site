
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
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-12345678-1' // UA-00000000-0
      }
    ]
  ],
  chainWebpack: (config, isServer) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

  }
}
