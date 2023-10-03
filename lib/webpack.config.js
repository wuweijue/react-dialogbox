const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackBaseConfig = {
    entry: [
        path.join(__dirname, './src/index.tsx'),
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        clean: true
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
                        // "plugins": [
                        //     "@babel/plugin-proposal-decorators",
                        //     {
                        //         "legacy": true,
                        //         // "decoratorsBeforeExport": true
                        //     }
                        //     // ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        // ],
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
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
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", '.less', ".json"]
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
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    context: 'src/',
                    from: '**/*.d.ts',
                    to: ".",
                },
            ],
        }),
    ]
}

module.exports = webpackBaseConfig;