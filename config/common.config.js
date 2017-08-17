'use strict';

const path = require("path");

const rootPath = path.resolve(__dirname, '../');             // 项目根目录
const srcPath = path.join(rootPath, 'src');                 // 开发源码目录
const commonPath = {
    rootPath: rootPath,
    srcPath: srcPath,
    dllPath: path.join(rootPath, 'dll'),                    // dll 后输出目录
    publicPath: path.join(rootPath, 'public'),              // build 后输出目录
    htmlPath: path.join(srcPath, 'html'),                   // html 模板文件
    faviconPath: path.join(srcPath, 'favicon'),             // html 的favicon文件
    entryJsPath: path.join(srcPath, 'entryjs'),             // js入口文件
    staticPath: path.join(rootPath, 'static'),              // 不需编译的静态资源
};

const commonConfig = {
  commonPath: commonPath,
};

module.exports = commonConfig;