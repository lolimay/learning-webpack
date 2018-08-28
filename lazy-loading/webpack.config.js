const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')

const common = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'lazy loading'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}

const development = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
}

const production = {
    mode: 'production',
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                parallel: 4,
                compress: {
                    ecma: 6,
                    toplevel: true
                }
            }
        })
    ],
    optimization: {
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
    }
}

if(process.env.NODE_ENV === 'production') {
    module.exports = merge(common, production)
} else {
    module.exports = merge(common, development)
}