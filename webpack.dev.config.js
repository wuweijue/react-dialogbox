const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

const port = '5000';

const webpackDevConfig = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        port,
        publicPath: '/',
        hot: true,
        open: true,
        contentBase: path.join(__dirname, './dist'),
    }
}

module.exports = merge(webpackDevConfig, webpackBaseConfig);