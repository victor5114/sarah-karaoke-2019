const webpack = require('webpack');
const config = require('./config');
// vue.config.js

module.exports = {
  configureWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': config[process.env.NODE_ENV],
          BROWSER_SUPPORTS_HTML5: true,
          VERSION: JSON.stringify('0.0.1')
        }),
      ]
  }
}
