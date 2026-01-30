#!/bin/bash

# Paso 1: Build
echo "🚀 Compilando con Vite..."
npm run build

# Paso 2: Limpiar la raíz
echo "🧹 Limpiando antiguos assets..."
rm -rf assets index.html

# Paso 3: Copiar nuevo build
echo "📦 Copiando build a la raíz..."
cp -r dist/* .

# Paso 4: Commit y push
echo "💾 Haciendo commit y push..."
git add .
git commit -m "Deploy automático"
git push

echo "✅ Deploy completado. Tu web está actualizada!"
