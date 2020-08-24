const path = require('path')
const webpack = require('webpack')
const WebpackPluginHash = require('../webpackHashPlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 优化\最小化js
const TerserPlugin = require('terser-webpack-plugin')
// 优化\最小化CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const getbabelConfig = require('./babelConfig')
const { outputPath, publicPath, outputFileName } = require('./outputConfig')

const devMode = process.env.NODE_ENV === 'development'

global.isBrowser = true

module.exports = {
  entry: {
    app: path.resolve('./src/client/App.jsx')
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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import'),
                require('autoprefixer'),
                require('postcss-nested')
              ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(c|le)ss$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
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
    new webpack.ProgressPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve('dll/dll_manifest.json'))
    }),
    new webpack.SourceMapDevToolPlugin({
      append: devMode ? undefined : false,
      noSources: !devMode,
      filename: 'sroucemaps/[file].map'
    }),
    new WebpackPluginHash({})
  ],
  optimization: {
    minimizer: [
      !devMode && new TerserPlugin({
        // cache: true,
        // parallel: true,
        sourceMap: true // Must be set to true if using source-maps in production
        // terserOptions: {
        //   // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        // }
      }),
      !devMode && new OptimizeCSSAssetsPlugin({
        // cssProcessorPluginOptions: {
        //   preset: ['default', {
        //     discardComments: {
        //       removeAll: true
        //     },
        //     normalizeUrl: false
        //   }]
        // }
      })
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
