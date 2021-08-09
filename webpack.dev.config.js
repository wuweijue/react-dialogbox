const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = '8084';

const webpackDevConfig = {
    mode: "development",
    devtool: "inline-source-map",
    entry: [
        path.join(__dirname, './src/index.tsx'),
    ],
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'dialogbox.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './lib/dialogbox.css'
        })
    ],
    devServer: {
        port,
        publicPath: '/',
        stats: 'minimal',
        hot: true,
        open: true,
        contentBase: path.join(__dirname, './lib'),
    }
}

module.exports = merge(webpackDevConfig, webpackBaseConfig);