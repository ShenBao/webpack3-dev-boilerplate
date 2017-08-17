const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require("less-plugin-clean-css");
const path = require('path');
const glob = require('glob');

const commonConfig = require('./common.config.js');
const otherConfig = require('./other.config.js');
const baseConfig = require('./webpack.base.config.js');
const styleConfig = require('./style.config.js');

const dependencies = require('../package.json').dependencies;
const commonPath = commonConfig.commonPath;
const entryFilesFn = otherConfig.entryFilesFn;
const htmlPluginsFn = otherConfig.htmlPluginsFn;
const prodStyle = styleConfig.prodStyle;
const stylePlugin = styleConfig.stylePlugin;

const prodPugins = htmlPluginsFn().concat(stylePlugin);

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
        rules: prodStyle.concat([
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
        ])
    },

    plugins: prodPugins.concat([
        // 清楚文件夹
        // new CleanWebpackPlugin([commonPath.publicPath]),

        // 定义环境变量为生产环境
        new webpack.DefinePlugin(
            {
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                },
                IS_DEVELOPMETN: false,
            }
        ),

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

        
        // stataic目录下静态资源的复制
        new CopyWebpackPlugin([ {
            context: commonPath.rootPath,
            from: 'static/*',
            ignore: ['*.md']
            }
        ]),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // 公共代码分离打包
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'mainifest']
        // }),
        
        // 生css 若要按需加载 CSS 则请注释掉该行
		// new ExtractTextPlugin({
		// 	// filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
		// 	filename: '[name].[contenthash:6].css',
		// 	disable: false,
		// 	allChunks: true,
        //     disable: process.env.NODE_ENV === "development"
        // }),



    ]),

};

module.exports = webpackMerge(baseConfig, prodConfig);