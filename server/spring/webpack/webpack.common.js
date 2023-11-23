const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils.js');

const getTsLoaderRule = env => {
    const rules = [
        {
            loader: 'thread-loader',
            options: {
                // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
                // The value may need to be adjusted (e.g. to 1) in some CI environments,
                // as cpus() may report more cores than what are available to the build.
                workers: require('os').cpus().length - 1,
            },
        },
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                happyPackMode: true,
            },
        },
    ];
    if (env === 'development') {
        rules.unshift({
            loader: 'react-hot-loader/webpack',
        });
    }
    return rules;
};

module.exports = options =>
    merge({
        cache: options.env !== 'production',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            modules: ['node_modules'],
            alias: utils.mapTypescriptAliasToWebpackAlias(),
            fallback: {
                path: require.resolve('path-browserify'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: getTsLoaderRule(options.env),
                    include: [utils.root('./src/main/webapp/app')],
                    exclude: [utils.root('node_modules')],
                },
                {
                    test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                    loader: 'file-loader',
                    options: {
                        digest: 'hex',
                        hash: 'sha512',
                        name: 'content/[hash].[ext]',
                    },
                },
                {
                    enforce: 'pre',
                    exclude: /node_modules/,
                    test: /\.jsx?$/,
                    loader: 'source-map-loader',
                },
            ],
        },
        stats: {
            children: false,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(options.env),
                    VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
                    DEBUG_INFO_ENABLED: options.env === 'development',
                    SERVER_API_URL: `''`,
                },
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './src/main/webapp/app/shared/assets/favicon.png',
                        to: 'favicon.png',
                    },
                ],
            }),
            new HtmlWebpackPlugin({
                template: './src/main/webapp/index.html',
                chunksSortMode: 'auto',
                inject: 'body',
                base: options.env === 'production' ? '/NLBaseReact' : '/',
                publicPath: options.env === 'production' ? '/NLBaseReact' : '/',
            }),
        ],
    });
