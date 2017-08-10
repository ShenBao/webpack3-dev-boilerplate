/**
 * @Author: ShenBao shenbaoone@gmail.com
 * @Date: 2017-08-07 20:10:37
 * @Last Modified time: 2017-08-08 19:24:50
 */

var webpack = require('webpack');
var path = require('path');
var publicPath = path.resolve(__dirname, '../public/');

const commonPath = require('./common.path.js');

var dependencies = require('../package.json').dependencies;

module.exports = {
    entry: {
        'vendor': Object.keys(dependencies)
    },
    output: {
        path: commonPath.public,
        filename: '[name].dll.js',
        library: '[name]_library',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(commonPath.public, '[name]-manifest.json'),
            name: '[name]_library',
        }),
    ],
    // debug: true
}