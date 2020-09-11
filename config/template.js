/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = require('./pages');


exports.generateTemplates = (options) => {
    const entry = pages.getPagesEntry();
    return Object.entries(entry).map(([filename, pathname]) => {
        return new HtmlWebpackPlugin({
            filename: `${filename}.html`,
            template: require('html-webpack-template'),
            bodyHtmlSnippet: '<div id="app"></div>',
            inject: false,
            chunks: [
                filename
            ],
            inlineManifestWebpackName: 'manifest',
            title: 'react 组件',
        });
    });
}
