const webpack = require('webpack');
const configDefine = require('./config');
// vue.config.js

module.exports = {
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        return [
          {
            'process.env': {
              ...args[0]['process.env'],
              ...configDefine[process.env.NODE_ENV]
            },
            BROWSER_SUPPORTS_HTML5: true,
            VERSION: JSON.stringify('0.0.1')
          }
        ];
      })
  }
}
