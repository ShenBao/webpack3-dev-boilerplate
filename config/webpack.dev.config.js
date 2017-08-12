/**
 * @Author: ShenBao shenbaoone@gmail.com
 * @Date: 2017-08-07 20:10:37
 * @Last Modified time: 2017-08-08 19:24:50
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin')

const dependencies = require('../package.json').dependencies;

const commonPath = require('./common.path.js');
const baseConfig = require('./webpack.base.config.js');

const devConfig = {

    entry: {
        index: path.join(commonPath.srcPath, 'index.js'),
        // index:  [
        //     'eventsource-polyfill',
        //     'webpack-hot-middleware/client?reload=true',
        //     'webpack/hot/only-dev-server',
        //     path.join(commonPath.srcPath, "index.js")
        // ],
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
        port: 3000,
        // 启用 HMR 需要 new webpack.HotModuleReplacementPlugin()
        // hot: true,
        hotOnly: true, //HMR
        // historyApiFallback: true,
        // publicPath: commonPath.public,
        // headers: { "X-Custom-Header": "yes" },
        // stats: { colors: true }
        // quiet: false,
        // progress: true,//报错无法识别，删除后也能正常刷新
        // inline: true,
        // clientLogLevel: "info",
        // lazy: false,
        // stats: 'errors-only',
        // compress: true,
        // noInfo: true,
    },
    plugins: [
         // 定义环境变量为开发环境
        // new webpack.DefinePlugin({
        // 'process.env.NODE_ENV': JSON.stringify('development'),
        // IS_DEVELOPMETN: true,
        // }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../public/vendor-manifest.json'),
            name:'react_library'
        }),
        // 开启HMR
        new webpack.HotModuleReplacementPlugin(),

        // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('common.js'),// 默认会把所有入口节点的公共代码提取出来,生成一个common.js

        // new webpack.NamedModulesPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     debug: true
        // }),
        // new webpack.NoErrorsPlugin(),

        // new OpenBrowserWebpackPlugin({
        //     url: `http://localhost`,
        // }),
        // 分析代码
        // new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
    ],
};


module.exports = webpackMerge(baseConfig, devConfig);



