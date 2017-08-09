const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const dependencies = require('../package.json').dependencies;

const commonPath = require('./common.path.js');
const baseConfig = require('./webpack.base.config.js');

const devConfig = {

    entry: {
        index: path.join(commonPath.srcPath, 'index.js'),
        vendor: Object.keys(dependencies)
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    // devtool: 'inline-source-map',
    devtool: 'source-map',
    devServer: {
        // contentBase: commonPath.public,
        host: 'localhost',
        port: 80,
        // 启用 HMR 需要 new webpack.HotModuleReplacementPlugin()
        hot: true,
        // historyApiFallback: true,
        // publicPath: commonPath.public,
        // headers: { "X-Custom-Header": "yes" },
        // stats: { colors: true }
        // quiet: false,
        // progress: true,//报错无法识别，删除后也能正常刷新
        // inline: true,
        // clientLogLevel: "info",
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



