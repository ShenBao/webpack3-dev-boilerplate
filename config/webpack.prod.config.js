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
    },
    devtool: 'inline-source-map',
   
    plugins: [
        new webpack.NoErrorsPlugin(),
        // new webpack.BannerPlugin('author : ShenBao; mail: shenbaoone@gmail.com'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //     warnings: false,
        //     },
        //     comments: false
        // }),
    ],
};


module.exports = webpackMerge(baseConfig, prodConfig);



