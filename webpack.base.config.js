const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const transformDecorators = require("babel-plugin-transform-decorators-legacy")

const webpackBaseConfig = {

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(j|t)sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: {
                                        version: 2
                                    },
                                    useBuiltIns: 'usage',
                                    targets: {
                                        ie: '9'
                                    }
                                }
                            ],
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
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
    
    resolve: {
        alias: {
            'react': path.resolve(__dirname, 'node_modules', 'react'),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", '.less', ".json"]
    }
}

module.exports = webpackBaseConfig;