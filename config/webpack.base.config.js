/**
 * @Author: ShenBao shenbaoone@gmail.com
 * @Date: 2017-08-07 20:10:37
 * @Last Modified time: 2017-08-08 19:24:50
 */

 
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonPath = require('./common.path.js');
const dependencies = require('../package.json').dependencies;


const baseConfig = {
  // entry: {
  //   index: path.join(commonPath.srcPath, 'index.js'),
  //   vendor: Object.keys(dependencies)
  // },
  output: {
    // filename: '[name].bundle.js',
    path: commonPath.public,
    // publicPath: '../static/'
  },

  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // 处理sass
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // 处理img
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/,
        use: [
          'file-loader'
        ]
      },
      // 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // 数据处理
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
            'xml-loader'
        ]
      },
      {
        test: /\.js[x]?$/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ],
        exclude: path.join(commonPath.rootPath, 'node_modules')
      },
    ]
  },
  resolve:{
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    // 生成html
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin生成的页面',
      template: commonPath.indexHTML
    }),

    // new HtmlWebpackPlugin({
    //   template: paths.client('index.html'),
    //   hash: false,
    //   favicon: paths.client('static/favicon.ico'),
    //   filename: 'index.html',
    //   inject: 'body',
    //   minify: {
    //     collapseWhitespace: true
    //   }
    // })

    // 使用文件名替换数字作为模块ID
    // new webpack.NamedModulesPlugin(),
    // 使用 hash 作模块 ID，文件名作ID太长了，文件大小剧增
    // new HashedModuleIdsPlugin(),
    // 根据文件内容生成 hash
    // new WebpackMd5Hash()

    // 去掉重复模块
    // new webpack.optimize.DedupePlugin()
  ],
};

module.exports = baseConfig;