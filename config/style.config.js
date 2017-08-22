
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require("less-plugin-clean-css");

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        "sourceMap":true,
        // "plugins":[
        //         {
        //             "options":{
        //                 "advanced":true
        //             }
        //         }
        // ],
        // autoprefixer : {
        // add      : true,
        // remove   : true,
        // browsers : ['last 2 versions']
        // }
    },
};

const devStyle = [
    {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    minimize: false,        // 启用/禁用 压缩 {} or Boolean
                    sourceMap: true,        // 启用/禁用 Sourcemap
                }
            },
            postcssLoader,
        ]
    },


    // 处理less
    {
        test: /\.less$/,
        use: [
            {
                loader: "style-loader" // creates style nodes from JS strings
            },
            {
                loader: "css-loader", // translates CSS into CommonJS
                options: {
                    sourceMap: true
                }
            },
            postcssLoader,
            {
                loader: "less-loader", // compiles Less to CSS
                options: {
                    sourceMap: true,
                    plugins: [
                        new CleanCSSPlugin({ advanced: true })
                    ],
                }
            }
        ]
    },

    // 处理sass
    {
        test: /\.scss$/,
        use: [
            {
                loader: "style-loader"      // 将 JS 字符串生成为 style 节点
            },
            {
                loader: "css-loader",       // 将 CSS 转化成 CommonJS 模块
                options: {
                    sourceMap: true,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions'],
                        },
                        discardComments: {
                            removeAll : true,
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: true,
                    },
                },
            },
           postcssLoader,
            {
                loader: "sass-loader",      // 将 Sass 编译成 CSS
                options: {
                    sourceMap: true         //开发环境
                }
            }
        ]
    },
];

const prodStyle = [
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,        // 启用/禁用 压缩 {} or Boolean
                    }
                },
                postcssLoader,
          ]
        })
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,        // 启用/禁用 压缩 {} or Boolean
                    }
                },
                postcssLoader,
                {
                    loader: "less-loader", // compiles Less to CSS
                    options: {
                        plugins: [
                            new CleanCSSPlugin({ advanced: true })
                        ],
                    }
                }
            ]
        })
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                 {
                    loader: "css-loader",       // 将 CSS 转化成 CommonJS 模块
                    options: {
                        minimize: true,
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions'],
                        },
                        discardComments: {
                            removeAll : true,
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                    },
                },
                postcssLoader,
                {
                    loader: "sass-loader",      // 将 Sass 编译成 CSS
                    options: {
                    }
                }
            ]
        })
    },
];

const stylePlugin= [
    new ExtractTextPlugin({
        // filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
        filename: '[name].[contenthash:6].css',
        disable: false,
        allChunks: true,
        // disable: process.env.NODE_ENV === "development"
    })
];

const styleConfig = {
    devStyle: devStyle,
    prodStyle: devStyle,
    stylePlugin: stylePlugin
};


module.exports = styleConfig;
