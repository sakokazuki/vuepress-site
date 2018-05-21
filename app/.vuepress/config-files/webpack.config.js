const path = require('path')
const webpack = require('webpack')

module.exports = config => {
  config.merge({ devtool: 'source-map' });
  config
    .module.rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
        .end()
  config.resolve.alias.set("@img", path.resolve(__dirname, '../public/img/'))
  config.plugin('loader-option')
    .use(webpack.LoaderOptionsPlugin, [
      {
        options: {
          stylus: {
            import: [path.resolve(__dirname, '../styles/variables.styl')]
          }
        }
      }
    ])
  const jsRule = config.module.rule('js')
  jsRule.uses.delete('buble-loader')
  jsRule.use('babel-loader').loader('babel-loader')
}