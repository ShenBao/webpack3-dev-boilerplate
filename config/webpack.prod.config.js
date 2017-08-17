const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');


const commonConfig = require('./common.config.js');
const otherConfig = require('./other.config.js');
const baseConfig = require('./webpack.base.config.js');

const dependencies = require('../package.json').dependencies;
const commonPath = commonConfig.commonPath;
const entryFilesFn = otherConfig.entryFilesFn;
const htmlPluginsFn = otherConfig.htmlPluginsFn;


const prodConfig = {
    entry: Object.assign(
        {
            vendor: Object.keys(dependencies),
        },
        entryFilesFn()
    ),
    output: {
        filename: '[name].[chunkhash:12].js',
        chunkFilename: '[id].[chunkhash:12].js',
        // publicPath: "http://localhost:3000/"
    },
    devtool: 'inline-source-map',
    resolve:{

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
            {
                test: /\.js[x]?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    // {
                    //     loader: 'cache-loader',
                    //     options: {
                    //         cacheDirectory: path.resolve('.cache')
                    //     }
                    // },
                ],
                exclude: path.join(commonPath.rootPath, 'node_modules')
            },
        ]
    },

    plugins: [

        // 定义环境变量为生产环境
        new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV': JSON.stringify('production'),
                IS_DEVELOPMETN: false,
            }
        ),
        // 清楚文件夹
        new CleanWebpackPlugin([commonPath.publicPath]),

        // new webpack.BannerPlugin('author : ShenBao; mail: shenbaoone@gmail.com'),
        // 为组件分配id
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // // 压缩优化
        // new webpack.optimize.UglifyJsPlugin(
        //     {
        //         minimize: true,
        //         compress: {
        //             warnings: false,
        //         },
        //         comments: false,
        //     }
        // ),

        // new webpack.NoErrorsPlugin(),

    ].concat(htmlPluginsFn()),

};



module.exports = webpackMerge(baseConfig, prodConfig);