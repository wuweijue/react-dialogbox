const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

const port = '5001';

const webpackDevConfig = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        port,
        hot: true,
        open: true,
        static: path.join(__dirname, './dist'),
        headers: {
            'Access-Control-Allow-Origin': '*', // 允许来自任何源的请求  
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS', // 允许的 HTTP 方法  
        },
    }
}

module.exports = merge(webpackDevConfig, webpackBaseConfig);