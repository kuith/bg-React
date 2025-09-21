#!/bin/bash

# Script de deploy para A2 Hosting
# Ejecutar con: npm run deploy

echo "🚀 Iniciando proceso de deploy para A2 Hosting..."

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
rm -rf dist

# Generar build de producción
echo "📦 Generando build de producción..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completado exitosamente"
    echo ""
    echo "📁 Archivos generados en la carpeta 'dist/'"
    echo ""
    echo "📋 Próximos pasos para A2 Hosting:"
    echo "1. Comprimir la carpeta 'dist' en un archivo ZIP"
    echo "2. Acceder al cPanel de A2 Hosting"
    echo "3. Ir a File Manager > public_html"
    echo "4. Subir y extraer el archivo ZIP"
    echo "5. Mover todos los archivos de 'dist' a 'public_html'"
    echo ""
    echo "🌐 Tu aplicación estará disponible en tu dominio"
else
    echo "❌ Error en el build. Revisa los errores anteriores."
    exit 1
fi