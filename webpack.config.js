
const path = require("path");

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');


const rootPath = path.resolve(__dirname, './');             // 项目根目录
const srcPath = path.join(rootPath, 'src');                 // 开发源码目录
const commonPath = {
    rootPath: rootPath,
    srcPath: srcPath,
    publicPath: path.join(rootPath, 'public'),              // build 后输出目录
    htmlPath: path.join(srcPath, 'html'),                   // html 模板文件
    faviconPath: path.join(srcPath, 'favicon'),             // html 的favicon文件
    entryJsPath: path.join(srcPath, 'entryjs'),             // js入口文件
    staticPath: path.join(rootPath, 'static'),              // 不需编译的静态资源
};

// //entryFilesFn 函数   自动抓取入口文件
var entryFilesFn= function () {
    var entryFiles = glob.sync(path.join(commonPath.entryJsPath, '*.js'));
    var map = {};
    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    };
    return map;
};

// //html_webpack_plugins 定义
var htmlPluginsFn = function () {
    var entryHtml = glob.sync(path.join(commonPath.htmlPath, '*.html'));
    var map = [];
    var entryFiles = entryFilesFn();
    for (var i = 0; i < entryHtml.length; i++) {
        var filePath = entryHtml[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
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

module.exports = {
    entry: entryFilesFn(),
    output: {
        path: commonPath.publicPath,
        filename: "[name].js",
    },
    devServer: {
        contentBase: commonPath.htmlPath, //本地服务器所加载的页面所在的目录
    },
    plugins: htmlPluginsFn()
}