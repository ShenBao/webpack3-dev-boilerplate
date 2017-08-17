
var webpack = require('webpack');
var path = require('path');
var publicPath = path.resolve(__dirname, '../public/');

const commonConfig = require('./common.config.js');
const commonPath = commonConfig.commonPath;
var dependencies = require('../package.json').dependencies;

module.exports = {
    entry: {
        'vendor': Object.keys(dependencies)
    },
    output: {
        path: commonPath.dllPath,
        filename: '[name].dll.js',
        library: '[name]_library',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(commonPath.dllPath, '[name]-manifest.json'),
            name: '[name]_library',
        }),
    ],
}