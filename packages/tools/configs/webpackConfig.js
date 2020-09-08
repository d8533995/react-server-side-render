const path = require('path')
const webpack = require('webpack')
const WebpackPluginHash = require('../webpackHashPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const scopedNameGenerator = require('../utils/scopedNameGenerator')
// 优化\最小化js
const TerserPlugin = require('terser-webpack-plugin')
// 优化\最小化CSS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const getbabelConfig = require('./babelConfig')
const { outputPath, publicPath, outputFileName } = require('./outputConfig')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: [
      devMode && 'webpack-hot-middleware/client',
      path.resolve('./src/client/App.jsx')
    ].filter(Boolean)
  },
  output: {
    filename: outputFileName,
    chunkFilename: outputFileName,
    path: outputPath,
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  mode: devMode ? 'development' : 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: getbabelConfig({ isBrowser: true })
        }
      },
      {
        test: /\.(c|le)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: devMode,
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-import',
                  'autoprefixer',
                  'postcss-nested',
                  [
                    'postcss-modules',
                    {
                      getJSON: () => {},
                      generateScopedName: scopedNameGenerator()
                    }
                  ]
                ]
              }
            }
          },
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } }
          }
        ]
      },
      {
        test: /\.(c|le)ss$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } }
          }
        ]
      }
      // {
      //   test: /\.(jpg|png|svg|gif)/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: outputFileName
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    devMode && new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve('dll/dll_manifest.json'))
    }),
    !devMode && new webpack.SourceMapDevToolPlugin({
      append: false,
      noSources: true,
      filename: 'sroucemaps/[file].map'
    }),
    devMode && new webpack.EvalSourceMapDevToolPlugin(),
    new WebpackPluginHash()
  ].filter(Boolean),
  optimization: {
    minimize: !devMode,
    minimizer: [
      new TerserPlugin({
        // cache: true,
        // parallel: true,
        sourceMap: true // Must be set to true if using source-maps in production
        // terserOptions: {
        //   // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        // }
      }),
      new CssMinimizerPlugin()
    ].filter(Boolean),
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          name: 'vendor',
          maxSize: 1000000
        },
        // Extracting all CSS in a single file
        styles: {
          name: 'styles',
          test: /\.css$|\.less$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
