/**
 * @Author: ShenBao shenbaoone@gmail.com
 * @Date: 2017-08-07 20:10:37
 * @Last Modified time: 2017-08-08 19:24:50
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const dependencies = require('../package.json').dependencies;

const commonPath = require('./common.path.js');
const baseConfig = require('./webpack.base.config.js');

const prodConfig = {

    entry: {
        index: path.join(commonPath.srcPath, 'index.js'),
        vendor: Object.keys(dependencies)
    },

    output: {
        filename: '[name].[chunkhash:6].js',
        chunkFilename: '[id].[chunkhash:6].js',
        publicPath: "http://localhost:3000/"
    },
    devtool: 'inline-source-map',
   
    plugins: [
        // 定义环境变量为生产环境
        // new webpack.DefinePlugin({
        // 'process.env.NODE_ENV': JSON.stringify('production'),
        // IS_DEVELOPMETN: false,
        // }),
        // new webpack.NoErrorsPlugin(),
        // new webpack.BannerPlugin('author : ShenBao; mail: shenbaoone@gmail.com'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //     warnings: false,
        //     },
        //     comments: false
        // }),
        // 为组件分配id
        // new webpack.optimize.OccurrenceOrderPlugin(),
        /* 压缩优化代码开始  可以关掉*/
        // new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        /* 压缩优化代码结束*/
    ],
};


module.exports = webpackMerge(baseConfig, prodConfig);



