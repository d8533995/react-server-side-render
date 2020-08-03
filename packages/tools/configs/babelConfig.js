const getScopedNameGenerator = require('../utils/scopedNameGenerator')
const { publicPath, fileName } = require('./outputConfig')

module.exports = function ({ isBrowser }) {
  let plugins
  if (!isBrowser) {
    plugins = [
      //  babel-transform-assets中loader-util版本过低导致和filer-loader生成的hash对不上，
      // 不建议在项目中引入图片资源
      ['transform-assets',
        {
          extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'woff', 'woff2', 'eot', 'ttf'],
          name: `${publicPath}/${fileName}`
        }
      ],
      ['@my/babel-plugin-transform-css',
        {
          extensions: ['.css', '.less'],
          camelCase: true,
          generateScopedName: getScopedNameGenerator(),
          keepImport: !isBrowser
        }
      ]
    ]
  }
  return {
    presets: [
      [
        '@babel/preset-env',
        !isBrowser
          ? { targets: { node: '12' } }
          : {
            modules: false,
            targets: { ie: '9' }
          }
      ],
      '@babel/preset-react'
    ],
    plugins
  }
}
