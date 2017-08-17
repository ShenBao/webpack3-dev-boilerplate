
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./common.config.js');
const otherConfig = require('./other.config.js');
const baseConfig = require('./webpack.base.config.js');

const dependencies = require('../package.json').dependencies;
const commonPath = commonConfig.commonPath;
const entryFilesFn = otherConfig.entryFilesFn;
const htmlPluginsFn = otherConfig.htmlPluginsFn;

const devConfig = {
    entry: Object.assign(
        {
            vendor: Object.keys(dependencies),
        },
        entryFilesFn()
    ),
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: commonPath.htmlPath,//本地服务器所加载的页面所在的目录
        host: 'localhost',
        port: 9000,
        hot: true,
        open: true,
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
                        loader: 'react-hot-loader',
                    },
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
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dll/vendor-manifest.json'),
            name:'react_library'
        }),

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


    ].concat(htmlPluginsFn()),

};


module.exports = webpackMerge(baseConfig, devConfig);