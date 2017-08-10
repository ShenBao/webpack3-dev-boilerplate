/**
 * @Author: ShenBao shenbaoone@gmail.com
 * @Date: 2017-08-07 20:10:37
 * @Last Modified time: 2017-08-08 19:24:50
 */

'use strict';

const path = require('path');

const rootPath = path.resolve(__dirname, '..');     // 项目根目录
const srcPath = path.join(rootPath, 'src');             // 开发源码目录

const commonPath = {
  rootPath: rootPath,
  srcPath: srcPath,
  public: path.join(rootPath, 'public'),              // build 后输出目录
  indexHTML: path.join(srcPath, 'index.html'),        // 入口模板页面
  staticDir: path.join(rootPath, 'static')          // 不需编译的静态资源
};

module.exports = commonPath;