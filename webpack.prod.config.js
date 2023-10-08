const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { exec } = require('child_process'); 

const webpackProdConfig = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                terserOptions: {
                    compress: {
                        drop_console: false
                    }
                }
            }),
        ]
    },
    plugins: [
        new class {
            apply(compiler) {
                compiler.hooks.done.tap('ExecPlugin', () => {
                    // 在编译完成之后执行批处理脚本  
                    exec(path.resolve(__dirname, 'copy.bat'));
                });
            }
        }(),
    ]
}

module.exports = merge(webpackProdConfig, webpackBaseConfig)