const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackHandleCssInjectPlugin = require('./HtmlWebpackHandleCssInjectPlugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { NODE_ENV } = process.env;

const isDev = NODE_ENV === 'dev';

// 主题路径
const THEME_PATH = './src/less/themes';

const extractLess = new ExtractTextPlugin('style.[hash].css');

const styleLoaders = [{ loader: 'css-loader' }, { loader: 'less-loader' }];

const resolveToThemeStaticPath = fileName => path.resolve(THEME_PATH, fileName);
const themeFileNameSet = fs.readdirSync(path.resolve(THEME_PATH));
const themePaths = themeFileNameSet.map(resolveToThemeStaticPath);
const getThemeName = fileName => `theme-${path.basename(fileName, path.extname(fileName))}`;

// 全部 ExtractLessS 的集合
const themesExtractLessSet = themeFileNameSet.map(fileName => new ExtractTextPlugin(`${getThemeName(fileName)}.css`))
// 主题 Loader 的集合
const themeLoaderSet = themeFileNameSet.map((fileName, index) => {
  return {
    test: /\.(less|css)$/,
    include: resolveToThemeStaticPath(fileName),
    loader: themesExtractLessSet[index].extract({
      use: styleLoaders
    })
  }
});

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3201
  },
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isDev ? '/' : './'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        // exclude: themePaths,
        use: styleLoaders
        // loader: extractLess.extract({
        //   use: styleLoaders,
        //   // use style-loader in development
        //   fallback: 'style-loader?{attrs:{prop: "value"}}'
        // })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
      // 将Loader 的集合，加入 rules
      // ...themeLoaderSet
    ]
  },
  plugins: [
    // (complier) => {
    //   console.log(complier.hooks)
    //   complier.hooks.emit.tapAsync('------', (compilation, cb) => {
    //     console.log('aaaa', compilation)
    //     cb()
    //   })
    // },
    new MonacoWebpackPlugin({
      languages:["javascript", "css", "html", "json"],
      features:["coreCommands", "find"]
    }),
    new VueLoaderPlugin(),
    extractLess,
    // 将所有的 themesExtractLess 加入 plugin
    ...themesExtractLessSet,
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      title: 'webpack 多主题打包演示',
      template: 'src/index.html',
      inject: true,
      chunks: ['app']
    }),
    new HtmlWebpackHandleCssInjectPlugin({
      filter: (filePath) => {
        return filePath.includes('style');
      }
    }),
    new webpack.DefinePlugin({
      'process.env.themes': JSON.stringify(themeFileNameSet.map(fileName => fileName.replace('.less', '')))
    })
  ]
};
