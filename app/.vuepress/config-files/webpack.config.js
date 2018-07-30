const path = require('path')
const webpack = require('webpack')

module.exports = config => {

  config.plugin('loader-option')
    .use(webpack.LoaderOptionsPlugin, [
      {
        options: {
          stylus: {
            import: [path.resolve(__dirname, './styles/variables.styl')]
          }
        }
      }
    ])

}