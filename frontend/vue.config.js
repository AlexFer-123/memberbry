const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    // Força a transpilação das dependências Uppy.js
    /@uppy\/.*/,
  ],
  configureWebpack: {
    resolve: {
      fallback: {
        "path": false,
        "fs": false
      }
    }
  },
  chainWebpack: config => {
    // Configuração adicional do Babel para dependências node_modules
    config.module
      .rule('js')
      .include.add(/node_modules\/@uppy/)
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: [
          ['@vue/cli-plugin-babel/preset', {
            targets: { node: '22' }
          }]
        ],
        plugins: [
          '@babel/plugin-transform-private-methods',
          '@babel/plugin-transform-class-properties',
          '@babel/plugin-transform-private-property-in-object'
        ]
      })
  },
  // Otimizações para produção
  productionSourceMap: false,
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false
  }
})