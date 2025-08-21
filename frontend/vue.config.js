const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    // Força a transpilação das dependências Uppy.js
    /@uppy\/.*/,
  ],
  configureWebpack: config => {
    // Otimizações específicas para Vercel
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      "path": false,
      "fs": false,
      "crypto": false,
      "stream": false,
      "buffer": false
    }

    // Otimizações de performance para build
    if (process.env.NODE_ENV === 'production') {
      // Reduzir tamanho do bundle
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              maxSize: 244000, // 244KB limit
            },
            uppy: {
              test: /[\\/]node_modules[\\/]@uppy[\\/]/,
              name: 'uppy',
              chunks: 'all',
              priority: 10
            }
          }
        }
      }

      // Limitar uso de memória
      config.optimization.minimizer = config.optimization.minimizer || []
      if (config.optimization.minimizer.length > 0) {
        config.optimization.minimizer[0].options = {
          ...config.optimization.minimizer[0].options,
          parallel: 2, // Reduzir paralelismo para economizar memória
          terserOptions: {
            ...config.optimization.minimizer[0].options?.terserOptions,
            compress: {
              drop_console: true, // Remove console.logs em produção
              drop_debugger: true
            }
          }
        }
      }
    }
  },
  chainWebpack: config => {
    // Desabilitar ESLint webpack plugin para evitar erro de 'extensions'
    config.plugins.delete('eslint')
    
    // Configuração específica do Babel para dependências node_modules
    config.module
      .rule('js')
      .include.add(/node_modules\/@uppy/)
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: [
          ['@vue/cli-plugin-babel/preset', {
            targets: { node: '22' },
            useBuiltIns: 'entry',
            corejs: 3
          }]
        ],
        plugins: [
          '@babel/plugin-transform-private-methods',
          '@babel/plugin-transform-class-properties',
          '@babel/plugin-transform-private-property-in-object'
        ]
      })

    // Otimizações específicas para Vercel
    if (process.env.VERCEL) {
      // Reduzir uso de memória durante o build
      config.optimization.concatenateModules(false)
      
      // Configurar cache para Vercel
      config.cache({
        type: 'filesystem',
        cacheDirectory: '.cache/webpack'
      })
    }
  },
  // Otimizações para produção
  productionSourceMap: false,
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false
  },
  // Configurações específicas para Vercel
  parallel: process.env.VERCEL ? false : require('os').cpus().length > 1,
  lintOnSave: false,
  
  // Configurações do dev server para Render.com
  devServer: {
    allowedHosts: 'all', // Permite todos os hosts (resolve o "Invalid Host header")
    host: '0.0.0.0', // Aceita conexões de qualquer IP
    port: process.env.PORT || 8080, // Usa a porta definida pelo Render
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws' // WebSocket config para Render
    },
    historyApiFallback: true, // Para SPA routing
    compress: true, // Compressão gzip
    hot: true, // Hot module replacement
    // Headers de segurança
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
})