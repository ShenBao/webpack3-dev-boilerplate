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