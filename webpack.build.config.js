const merge = require("webpack-merge")
const TerserPlugin = require('terser-webpack-plugin');

const baseWebpackConfig = require("./webpack.base.config");


const buildWebpackConfig = merge(baseWebpackConfig, {

    mode: "production",

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: false
            }),
        ],
    },
    plugins: []
});

module.exports = buildWebpackConfig;




