const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageName = require('./package.json').name;

const webpackBaseConfig = {
    target: 'web',
    entry: [
        path.join(__dirname, './page/index.tsx'),
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        clean: true,
        library: 'react-dialogbox',
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${packageName}`,
        globalObject: 'window'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(j|t)sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-proposal-decorators",
                                {
                                    "legacy": true,
                                    // "decoratorsBeforeExport": true
                                }
                                // ["@babel/plugin-proposal-class-properties", { "loose": true }]
                            ],
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            ">0.2%",
                                            "not dead",
                                            "not op_mini all"
                                        ]
                                    })
                                ]
                            }
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                type: 'asset'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './page/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    resolve: {
        alias: {
            'dialogbox': path.resolve(__dirname, '/lib/src'),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", '.less', ".json"]
    }
}

module.exports = webpackBaseConfig;