const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonPath = require('./common.path.js');
const dependencies = require('../package.json').dependencies;

const baseConfig = require('./webpack.base.config.js');

const devConfig = {
    // devtool: 'inline-source-map',
    devtool: 'source-map',
    devServer: {
        host: 'localhost',
        port: 80,
        contentBase: './dist',
        // 启用 HMR 需要 new webpack.HotModuleReplacementPlugin()
        hot: true 
    },
    plugins: [
        // 开启HMR
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../public/vendor-manifest.json')
        })
    ],
};


module.exports = webpackMerge(baseConfig, devConfig);



