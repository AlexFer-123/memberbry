// Webpack configuration for Vercel build optimization
const path = require('path')

module.exports = {
  // Otimizações específicas para Vercel
  optimization: {
    // Reduzir uso de memória
    concatenateModules: false,
    // Split chunks para reduzir tamanho dos bundles
    splitChunks: {
      chunks: 'all',
      maxSize: 244000, // 244KB limit
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        uppy: {
          test: /[\\/]node_modules[\\/]@uppy[\\/]/,
          name: 'uppy',
          chunks: 'all',
          priority: 10
        }
      }
    }
  },
  // Configurações de resolução
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
      "crypto": false,
      "stream": false,
      "buffer": false,
      "util": false,
      "assert": false,
      "url": false
    }
  },
  // Configurações de cache para Vercel
  cache: process.env.VERCEL ? {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache/webpack')
  } : undefined,
  // Configurações de performance
  performance: {
    maxAssetSize: 244000,
    maxEntrypointSize: 244000,
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
}
