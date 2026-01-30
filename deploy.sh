#!/bin/bash

# ===========================
# Deploy divino automático
# ===========================

# Colores para la terminal
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m" # sin color

echo -e "${BLUE}🚀 Iniciando deploy automático...${NC}"

# Paso 1: Build
echo -e "${YELLOW}🔧 Compilando con Vite...${NC}"
npm run build || { echo "❌ Error en build"; exit 1; }

# Paso 2: Limpiar la raíz
echo -e "${YELLOW}🧹 Limpiando antiguos assets...${NC}"
rm -rf assets index.html

# Paso 3: Copiar nuevo build
echo -e "${YELLOW}📦 Copiando build a la raíz...${NC}"
cp -r dist/* .

# Paso 4: Commit
echo -e "${YELLOW}💾 Preparando commit...${NC}"
git add .
git commit -m "Deploy automático" || echo "ℹ️ Nada que commitear"

# Paso 5: Pull con rebase para sincronizar remoto
echo -e "${YELLOW}🔄 Sincronizando con GitHub...${NC}"
git pull --rebase origin main || { echo "❌ Error en pull"; exit 1; }

# Paso 6: Push
echo -e "${YELLOW}📤 Subiendo a GitHub...${NC}"
git push || { echo "❌ Error en push"; exit 1; }

echo -e "${GREEN}✅ Deploy completado. Tu web está actualizada!${NC}"
