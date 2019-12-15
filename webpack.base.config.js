const path = require('path');
const webpack = require('webpack');
// const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src/js'),

    entry: {
        main: './app'
    },

    output: {
        path: path.join(__dirname, 'public/js'),
        filename: '[name].js'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules"
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        // new HtmlPlugin({
        //     title: 'Webpack dev server'
        // }),
        // выделение общих блоков в отдельный файл
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['common'],
        //     minChunks: 2
        // })
    ]
};
