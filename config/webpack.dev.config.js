
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./common.config.js');
const otherConfig = require('./other.config.js');
const baseConfig = require('./webpack.base.config.js');
const styleConfig = require('./style.config.js');

const dependencies = require('../package.json').dependencies;
const commonPath = commonConfig.commonPath;
const entryFilesFn = otherConfig.entryFilesFn;
const htmlPluginsFn = otherConfig.htmlPluginsFn;
const devStyle = styleConfig.devStyle;

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
        port: 8080,
        hot: true,
        open: true,
        compress: false,
        historyApiFallback: true,
        inline: true,
        overlay: true,
        stats: { colors: true },
        // stats: 'errors-only',//减少dev开发模式减少日志信息输出的时间
        proxy: {
			"/api": {
				target: "http://test.com/",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				},
				bypass: function(req) {
					if(req.url === "/api/nope") {
						return "/test.html";
					}
				}
			}
		}
    },
    module: {
        rules: devStyle.concat([
            // 处理js
            {
                test: /\.js[x]?$/,
                use: [
                    {
                        loader: 'react-hot-loader',
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve('.cache')
                        }
                    },
                ],
                exclude: path.join(commonPath.rootPath, 'node_modules')
            },
        ])
    },
    plugins: htmlPluginsFn().concat([

        // 定义环境变量为开发环境
        new webpack.DefinePlugin(
            {
                'process.env':{
                    'NODE_ENV': JSON.stringify('development')
                },
                IS_DEVELOPMETN: false,
            }
        ),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dll/vendor-manifest.json'),
            name:'react_library'
        }),

        new webpack.HotModuleReplacementPlugin(),

        // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('common.js'),// 默认会把所有入口节点的公共代码提取出来,生成一个common.js
        new webpack.NamedModulesPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     debug: true
        // }),

        
        // new webpack.NoErrorsPlugin(), 废弃，用 NoEmitOnErrorsPlugin 代替
        new webpack.NoEmitOnErrorsPlugin(),

        // new OpenBrowserWebpackPlugin({
        //     url: `http://localhost`,
        // }),
        // 分析代码
        // new BundleAnalyzerPlugin({ analyzerPort: 8188 }),

    ]),
};


module.exports = webpackMerge(baseConfig, devConfig);