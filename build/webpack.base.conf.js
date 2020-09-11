/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve, parentResolve } = require('./utils');
const pages = require('../config/pages');

module.exports = {
    entry: {
        ...pages.getPagesEntry()
    },
    output: {
        filename: 'js/index.js',
        path: parentResolve('dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    },
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            },
                            localsConvention: 'camelCase',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: resolve('postcss.config.js')
                            }
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|doc?x|excel)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    fallback: require.resolve('file-loader'),
                    outputPath: 'img',
                    name(file) {
                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }
                        return '[contenthash].[ext]';
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }

        ],
    },
};
