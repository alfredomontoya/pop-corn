#!/bin/bash
# Script de despliegue para Laravel + React + Inertia en Hostinger

set -e  # Detener ejecución si hay algún error

BRANCH_DEPLOY="deploy"
BUILD_DIR="public/build"  # Vite genera los archivos aquí
LARAVEL_DIRS="vendor public/build bootstrap/cache"

echo "🚀 Iniciando despliegue de Laravel + React + Inertia..."

# Asegurarse de estar en la rama principal
git checkout master
git pull origin master

# Crear o actualizar la rama deploy
if git rev-parse --verify $BRANCH_DEPLOY >/dev/null 2>&1; then
  echo "🔄 Actualizando rama $BRANCH_DEPLOY..."
  git checkout $BRANCH_DEPLOY
  git merge master --no-edit
else
  echo "🌿 Creando rama $BRANCH_DEPLOY..."
  git checkout -b $BRANCH_DEPLOY
fi

# Instalar dependencias y generar build
echo "⚙️ Instalando dependencias de Node y generando build..."
npm install
npm run build

# Instalar dependencias PHP (solo locales, no se suben)
echo "📦 Instalando dependencias PHP (localmente, no en prod)..."
composer install --no-dev --optimize-autoloader

# Forzar añadir los archivos de build y vendor (aunque estén en .gitignore)
echo "📤 Preparando archivos para deploy..."
git add -f $BUILD_DIR
git add -f bootstrap/cache
git add composer.lock
git commit -m "🚀 Build y dependencias PHP listas para deploy ($(date '+%Y-%m-%d %H:%M:%S'))" || echo "🟡 Sin cambios nuevos para commitear"

# Subir la rama de despliegue
echo "⬆️ Subiendo rama
