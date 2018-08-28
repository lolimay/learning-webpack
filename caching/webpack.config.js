const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')

const common = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            name: true,
            cacheGroups: {
                default: {
                    chunks: 'async',
                    minSize: 30000,
                    minChunks: 2,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    name: 'vendor',
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2,
                    test: /[\\/]src[\\/]/,
                    priority: -5,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Caching',
            favicon: 'src/assets/favicon.ico',
            chunksSortMode: 'dependency'
        }),
        new InlineManifestWebpackPlugin('runtime')
    ]
}

const development = {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
}

const production = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJsPlugin({
            exclude: /\.min\.js$/,
            cache: true,
            sourceMap: false,
            extractComments: false,
            uglifyOptions: {
                parallel: 4,
                compress: {
                    ecma: 6,
                    toplevel: true,
                    warnings: false,
                },
                output: {
                    comments: false
                }
            }
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
}

if(process.env.NODE_ENV === 'production') {
    module.exports = merge(common, production)
} else {
    module.exports = merge(common, development)
}