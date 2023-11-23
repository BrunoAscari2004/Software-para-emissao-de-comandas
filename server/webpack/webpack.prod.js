const webpack = require('webpack');
const webpackMerge = require('webpack-merge').merge;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'production';

module.exports = webpackMerge(commonConfig({ env: ENV }), {
    // devtool: 'source-map', // Enable source maps. Please note that this will slow down the build
    mode: ENV,
    entry: {
        main: './src/main/webapp/app/index',
    },
    output: {
        path: utils.root('target/static/'),
        filename: 'app/[name].[fullhash].bundle.js',
        chunkFilename: 'app/[name].[chunkhash].chunk.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({
                css: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.s?css$/,
                loader: 'stripcomment-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            filename: 'content/[name].[contenthash].css',
            chunkFilename: 'content/[name].[contenthash].css',
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
    ],
});
