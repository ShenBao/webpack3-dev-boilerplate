/**
 * @Author: ShenBao shenbaoone@gmail.com
 * @Date: 2017-08-07 20:10:37
 * @Last Modified time: 2017-08-08 19:24:50
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // target: 'node', <=== 默认是 'web'，可省略
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "http://cdn.example.com/"
  },
  
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 80,
    contentBase: './dist',
    // 启用 HMR 需要 new webpack.HotModuleReplacementPlugin()
    hot: true 
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     }
      //   ]
      // }
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
      }
    ]
  },

  plugins: [
    // 清楚文件夹
    // new CleanWebpackPlugin(['dist']),
    // 生成html
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin生成的页面'
    }),
    // 开启HMR
    new webpack.HotModuleReplacementPlugin(),
    // 压缩代码
    // new webpack.optimize.UglifyJsPlugin(),
  ],
};