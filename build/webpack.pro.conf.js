/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');

process.env.NODE_ENV = 'production';

const baseWebpackConfig = require('./webpack.base.conf');

const devConf = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: { // 最小化生产 https://webpack.docschina.org/plugins/mini-css-extract-plugin/#install
        minimizer: [
            new TerserJSPlugin(), // 最小化js
            new OptimizeCSSAssetsPlugin({}) // 最小化css
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        }),
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        }),
        // new CopyWebpackPlugin([{
        //     from: utils.parentResolve('src/'),
        //     to: utils.parentResolve('dist/'),
        // }]),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: utils.parentResolve('src'),
        //             to: utils.parentResolve('dist/src'),
        //         }
        //     ]
        // }),
    ]
});

module.exports = devConf;
