#!/usr/bin/env node

// Script otimizado para build na Vercel
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Starting Vercel build...')

// Configurar variáveis de ambiente para otimização
process.env.NODE_ENV = 'production'
process.env.VERCEL = '1'
process.env.NODE_OPTIONS = '--max-old-space-size=4096'
process.env.GENERATE_SOURCEMAP = 'false'

try {
  // Limpar cache se existir
  const cacheDir = path.join(__dirname, '.cache')
  if (fs.existsSync(cacheDir)) {
    console.log('🧹 Clearing cache...')
    fs.rmSync(cacheDir, { recursive: true, force: true })
  }

  // Limpar dist se existir
  const distDir = path.join(__dirname, 'dist')
  if (fs.existsSync(distDir)) {
    console.log('🧹 Clearing dist...')
    fs.rmSync(distDir, { recursive: true, force: true })
  }

  // Executar build
  console.log('📦 Installing dependencies...')
  execSync('npm ci --production=false', { 
    stdio: 'inherit',
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  })

  console.log('🔨 Building application...')
  execSync('npm run build:prod', { 
    stdio: 'inherit',
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  })

  console.log('✅ Build completed successfully!')

} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}
