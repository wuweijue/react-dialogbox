const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const webpackProdConfig = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'react-dialogbox.js',
        clean: true
    },
    externals: [
        nodeExternals() 
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                parallel: 4,
                terserOptions: {
                    compress: {
                        drop_console: false
                    }
                }
            }),
        ]
    },
}

module.exports = merge(webpackProdConfig, webpackBaseConfig)