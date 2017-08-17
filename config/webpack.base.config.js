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
        extensions: [
            '.js',
            '.jsx',
            '.json',
        ],
    },
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
                    'file-loader'
                ]
            },
            // 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },

        ]
    },

    plugins: [
        



    ],
};

