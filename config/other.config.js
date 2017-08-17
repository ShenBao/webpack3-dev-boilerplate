const path = require("path");
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');


const commonConfig = require('./common.config.js');
const commonPath = commonConfig.commonPath;

// //entryFilesFn 函数   自动抓取入口文件
const entryFilesFn= function () {
    let entryFiles = glob.sync(path.join(commonPath.entryJsPath, '*.js'));
    let map = {};
    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    };
    return map;
};
// //html_webpack_plugins 定义
const htmlPluginsFn = function () {
    let entryHtml = glob.sync(path.join(commonPath.htmlPath, '*.html'));
    let map = [];
    let entryFiles = entryFilesFn();
    for (let i = 0; i < entryHtml.length; i++) {
        let filePath = entryHtml[i];
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        let conf = {
            template: filePath,
            filename: filename + '.html',
            favicon: path.join(commonPath.faviconPath, filename + '.ico'),
        };
        if (filename in entryFiles) {
            conf.inject = 'body'
            conf.chunks = ['vendor', filename]
        };
        //跨页面引用，如pageA,pageB 共同引用了common-a-b.js，那么可以在这单独处理
        //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common-a-b')
        map.push(new HtmlWebpackPlugin(conf));
    }
    return map;
};

const otherConfig = {
    entryFilesFn: entryFilesFn,
    htmlPluginsFn: htmlPluginsFn,
};

module.exports = otherConfig;