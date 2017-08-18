const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./common.config.js');
const commonPath = commonConfig.commonPath;


module.exports = {
    output: {
        path: commonPath.publicPath
    },
    resolve:{
        // root: [path.resolve('../src')],
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.scss',
            '.png',
            '.jpg'
        ],
        alias: {
            tmpl: '/tmpl',
        }
    },
    cache: true,
    module: {
        rules: [
            // 数据处理
            // ebpack >= v2.0.0 默认支持导入 JSON 文件
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // 使所有以 .json5 结尾的文件使用 `json5-loader`
            {
                test: /\.json5$/,
                loader: 'json5-loader'
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            // 处理img
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:10].[ext]',
                            // [ext] 资源扩展名
                            // [name] 资源的基本名称
                            // [path] 资源相对于 context 查询参数或者配置的路径
                            // [hash] 内容的哈希值，默认为十六进制编码的 md5
                            // [<hashType>:hash:<digestType>:<length>] 可选配置
                            // 其他的 hashType, 即 sha1, md5, sha256, sha512
                            // 其他的 digestType, 即 hex, base26, base32, base36, base49, base52, base58, base62, base64
                            // length 字符的长度
                            limit: 10240,
                            // context: '',
                            // publicPath: 'assets',
                            // outputPath: 'images',
                            // useRelativePath: false, 
                            // emitFile: true,
                        }
                    }
                ],
            },
            // 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                     {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:10].[ext]',
                            limit: 10240,
                        }
                    }
                ]
            },
            {
                test: /\.(wav|mp3)$/,
                use: [
                     {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:10].[ext]',
                            limit: 10240,
                        }
                    }
                ]
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            // minimize: true,
                            // removeComments: false,
                            // collapseWhitespace: false
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        



    ],
};

