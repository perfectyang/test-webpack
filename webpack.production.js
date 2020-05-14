let path = require('path')
let baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


function assetsPath(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    'static' :
    'static'
  return path.posix.join(assetsSubDirectory, _path)
}
const productionConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: assetsPath('js/[name].js?[hash]'),
    chunkFilename: assetsPath('js/[id].js?[chunkhash]')
  },
  module: {
    rules: []
  },
  optimization: {
    namedChunks: true,
    moduleIds: 'hashed',
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: 4,
        cache: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: false
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 3000,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {
        vendor: { // 将第三方模块提取出来
          test: /node_modules/,
          chunks: 'async',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  },
  stats: {
    // copied from `'minimal'`
    all: undefined,
    builtAt: true,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    outputPath: true,
    logging: 'info',
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: false,
    errorDetails: true,
    colors: {
      green: '\u001b[32m',
    },
    entrypoints: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].css?[hash]'),
      chunkFilename: assetsPath('css/[id].css?[hash]')
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality:  10
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    }),
    (compiler) => {
      compiler.hooks.emit.tapAsync('self', (compilation, cb) => {
        console.log('compilation', compilation)
        let assetNames = Object.keys(compilation.assets);
        console.log(assetNames)
        const statics = []
        const images = []
        assetNames.forEach(name => {
          if (/\.(js|css|html)/.test(name)) {
            statics.push(name)
          }
        })
        const reg = /\.(jpe?g|png)/
        statics.forEach(curJs => {
          let source = compilation.assets[curJs].source()
          source = source.replace(reg, ($0, $1) => '.webp')
          compilation.assets[curJs] = {
            source: () => source,
            size: () => source.length
          }
        })
        cb()
      })
    }
  ]
})

if (process.env.npm_config_report) {
  productionConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = productionConfig