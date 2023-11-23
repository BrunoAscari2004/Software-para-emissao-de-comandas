const webpack = require('webpack');
const webpackMerge = require('webpack-merge').merge;
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = options =>
    webpackMerge(commonConfig({ env: ENV }), {
        devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
        mode: ENV,
        entry: ['./src/main/webapp/app/index'],
        output: {
            path: utils.root('target/classes/static/'),
            filename: 'app/[name].bundle.js',
            chunkFilename: 'app/[id].chunk.js',
        },
        optimization: {
            moduleIds: 'named',
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
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                },
            ],
        },
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            stats: options.stats,
            hot: true,
            // contentBase: './target/classes/static/',
            proxy: [
                {
                    context: ['/'],
                    target: `http://localhost:8080`,
                    secure: false,
                },
            ],
            watchOptions: {
                ignore: [/node_modules/, utils.root('src/test')],
            },
            historyApiFallback: true,
        },
        stats: options.stats ? 'none' : options.stats,
        plugins: [new webpack.HotModuleReplacementPlugin()].filter(Boolean),
    });
