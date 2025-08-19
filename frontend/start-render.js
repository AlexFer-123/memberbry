#!/usr/bin/env node

// Script otimizado para executar no Render.com
const { spawn } = require('child_process')

// Configurar variáveis de ambiente para Render
process.env.HOST = process.env.HOST || '0.0.0.0'
process.env.PORT = process.env.PORT || '10000'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

console.log('🚀 Starting Memberbry Frontend on Render.com...')
console.log(`📡 Host: ${process.env.HOST}`)
console.log(`🔌 Port: ${process.env.PORT}`)
console.log(`🌍 Environment: ${process.env.NODE_ENV}`)

// Executar o servidor Vue
const server = spawn('npx', [
  'vue-cli-service', 
  'serve',
  '--host', process.env.HOST,
  '--port', process.env.PORT,
  '--skip-plugins', '@vue/cli-plugin-eslint' // Pular ESLint em produção
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    // Configurações específicas para Render
    WEBPACK_DEV_SERVER_HOST: process.env.HOST,
    WEBPACK_DEV_SERVER_PORT: process.env.PORT,
    WEBPACK_DEV_SERVER_ALLOWED_HOSTS: 'all'
  }
})

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error)
  process.exit(1)
})

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code}`)
    process.exit(code)
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully')
  server.kill('SIGTERM')
})

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully')
  server.kill('SIGINT')
})
