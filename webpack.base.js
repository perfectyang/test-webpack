const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const InlineSourePlugin = require('./plugins/inlinesource.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}
function assetsPath(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    'static' :
    'static'
  return path.posix.join(assetsSubDirectory, _path)
}
module.exports = {
  entry: {
    index: [path.resolve(__dirname, 'src/app.js')]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src')
    }
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve('./loaders')]
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     emitError: true,
      //     autofix: true
      //   }
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          process.env.NODE_ENV === 'production' ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              publicPath: '/',
            }
          } : 'vue-style-loader',
          {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
          },
          // {
          //     loader: 'postcss-loader'
          // },
          {
              loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: false,
          name: assetsPath('img/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '首页在这里',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true
    })
    // new HtmlWebpackPlugin({
    //   title: '首页在这里',
    //   filename: 'm2/index.html',
    //   template: path.resolve(__dirname, 'src', 'm2/index.html'),
    //   hash: true
    // })
  ]
}