const path = require('path');
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
        test: /\.(png|svg|jpg|gif)$/,
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
  ],
};

module.exports = baseConfig;