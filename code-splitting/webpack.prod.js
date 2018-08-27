const merge =  require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production',
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
})