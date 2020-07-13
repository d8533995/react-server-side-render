const path = require('path')
const webpack = require('webpack')
const dllManifest = require('@my/tools/dll/dll_manifest.json')
const AssetsManifestPlugin = require('webpack-assets-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssNested = require('postcss-nested')
// const TerserPlugin = require('terser-webpack-plugin')
const getbabelConfig = require('./utils/getbabelConfig')
const { outputPath, publicPath, outputFileName } = require('./utils/getOutputConfig')

const devMode = process.env.NODE_ENV === 'development'

global.isBrowser = true

module.exports = {
  entry: {
    app: path.resolve('./src/client/App.jsx')
  },
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    path: path.resolve(outputPath),
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  devtool: false,
  // devtool: 'nosources-source-map',
  // optimization: {
  //   usedExports: true
  // },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        // include:[],
        exclude: [],
        use: {
          loader: 'babel-loader',
          options: getbabelConfig({ isBrowser: true, transformCss: false })
        }
      },
      {
        test: /\.(c|le)ss$/,
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
              localsConvention: 'camelCase',
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
                postcssImport(),
                postcssPresetEnv({
                  browsers: ['> 0%'],
                  autoprefixer: {
                    overrideBrowserslist: ['> 0%']
                  }
                }),
                postcssNested()
              ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)/,
        use: {
          loader: 'file-loader',
          options: {
            name: outputFileName
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    }),
    new webpack.DllReferencePlugin({
      manifest: dllManifest
    }),
    new webpack.SourceMapDevToolPlugin({
      append: false,
      noSources: true,
      filename: '[name]-[hash].js.map'
    }),
    new AssetsManifestPlugin({
      done (manifest, stats) {
        global.manifest = manifest.assets
        // console.log(`The manifest has been written to ${manifest.getOutputPath()}`)
        // console.log(`${manifest}`)
      }
    })
  ],
  optimization: {
    minimizer: [
      // new TerserPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true, // Must be set to true if using source-maps in production
      //   terserOptions: {
      //     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      //   }
      // }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            },
            normalizeUrl: false
          }]
        }
      })
    ],
    splitChunks: {
      chunks: 'async', // 默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
      // maxInitialRequests: 20, // for HTTP2
      // maxAsyncRequests: 20, // for HTTP2
      // minSize: 500000, // for example only: choosen to match 2 modules
      cacheGroups: {
        // vendors: {
        //   minSize: 500000,
        //   maxSize: 1500000,
        //   name: 'vendors',
        //   test: /[\\/]node_modules[\\/]/,
        //   chunks: 'initial',
        //   priority: 1
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // },
        // scripts: {
        //   minSize: 500000,
        //   maxSize: 1500000,
        //   name: 'scripts',
        //   test: /\.jsx?$/,
        //   chunks: 'initial',
        //   priority: 0
        // },
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
