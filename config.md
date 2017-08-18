
```
处理css
style-loader
css-loader

处理less
style-loader
css-loader
less-loader
less

处理sass
style-loader
css-loader
sass-loader
node-sass

处理img
file-loader
(压缩和优化您的图像。查看 image-webpack-loader 和 url-loader)

字体
file-loader
url-loader

数据
json已经默认支持
csv-loader
xml-loader

自动生成html
html-webpack-plugin

清理文件夹
clean-webpack-plugin

开启source-map
inline-source-map

设置dev-server
webpack-dev-server
阔以开启 HMR

打包css
extract-text-webpack-plugin

js[x]
react-hot-loader
babelt-loader

合并配置参数
webpack-merge




```

使用webpack-uglify-parallel代替webpack自带的UglifyJsPlugin（多核压缩代码，提升n（发布机的核数 － 1）压缩速度）-重点推荐
```
webpackConfig.plugins.some(function(plugin, i) {
        if (plugin instanceof webpack.optimize.UglifyJsPlugin) {
            webpackConfig.plugins.splice(i, 1);
            return true;
        }
    });
    
    const os = require('os');

    const options = {
        workers: os.cpus().length,
        compress: {
            warnings: true,
            drop_console: true,
            pure_funcs: ['console.log'],
        },
        //mangle: {
        //    except: ['$super', '$', 'exports', 'require']
        //},
        mangle: false,
        output: {
            comments: false,
            ascii_only: false,
        },
        sourceMap: false,
    };

    const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
    webpackConfig.plugins.push(
        new UglifyJsParallelPlugin(options)
    );
```










