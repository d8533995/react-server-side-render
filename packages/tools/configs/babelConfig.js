const getScopedNameGenerator = require('../utils/scopedNameGenerator')
const { publicPath, fileName } = require('./outputConfig')

module.exports = function ({ isBrowser }) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  return {
    presets: [
      [
        '@babel/preset-env',
        isBrowser
          ? {
            modules: false,
            targets: { ie: '11' },
            useBuiltIns: 'entry',
            corejs: 3
          }
          : {
            targets: { node: '12' }
          }

      ],
      ['@babel/preset-react', {
        // Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.
        useBuiltIns: true
      }]
    ],
    plugins: [
      !isBrowser && ['transform-assets',
        {
          extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'woff', 'woff2', 'eot', 'ttf'],
          name: `${publicPath}/${fileName}`
        }
      ],
      !isBrowser && ['@my/babel-plugin-transform-css',
        {
          extensions: ['.css', '.less'],
          camelCase: true,
          generateScopedName: getScopedNameGenerator(),
          keepImport: isBrowser
        }
      ],
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      isBrowser && ['@babel/plugin-proposal-class-properties', { loose: true }],
      // isBrowser && ['@babel/plugin-transform-runtime', { // 目前用不了 node_modules里面的都会编译
      //   corejs: 3, // default false
      //   regenerator: true, // default true
      //   // @babel/runtime/helpers使用/esm目录下文件
      //   useESModules: true
      // }],
      !isDevelopment && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true
        }
      ]
    ].filter(Boolean)
  }
}
