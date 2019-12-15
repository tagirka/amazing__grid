const merge = require("webpack-merge")
const baseWebpackConfig = require("./webpack.base.config");
const path = require('path');

const devWebpackConfig = merge(baseWebpackConfig, {

    mode: "development",
    devtool: "cheap-module-eval-source-map",

    plugins: []
});

module.exports = devWebpackConfig;




