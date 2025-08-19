#!/bin/bash
echo "🧹 Limpando instalação anterior..."
rm -rf node_modules
rm -f package-lock.json yarn.lock

echo "🔧 Limpando cache do npm..."
npm cache clean --force

echo "📦 Instalando dependências..."
npm install

echo "🔧 Verificando configuração do Babel..."
if [ ! -f ".babelrc" ]; then
    echo "⚠️  Arquivo .babelrc não encontrado!"
fi

echo "✅ Instalação concluída!"
echo "Para executar o projeto:"
echo "  npm run dev    # Desenvolvimento"
echo "  npm run build  # Build para produção"
