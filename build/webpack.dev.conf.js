/* eslint-disable */
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { parentResolve } = require('./utils');
const { generateTemplates } = require('../config/template');
process.env.NODE_ENV = 'development';

const baseWebpackConfig = require('./webpack.base.conf');

module.exports =
    merge(baseWebpackConfig, {
        devtool: 'cheap-module-eval-source-map',
        mode: 'development',
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ],
        },
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            port: 1010,
            allowedHosts: [
                'dev.oa.com',
                'dev.zhenai.com',
            ],
            contentBase: parentResolve('/'),
            openPage: 'index.html',
            open: true,
            hot: true,
        },
        plugins: [
            ...generateTemplates(),

            new webpack.HotModuleReplacementPlugin(),
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env': require('../config/dev.env')
            })
        ]
    });
