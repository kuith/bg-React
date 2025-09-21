# 🚀 Guía de Deployment a A2 Hosting

## ✅ Archivos Preparados
- ✅ Build de producción generado en `/dist`
- ✅ Archivo `.htaccess` configurado para React SPA
- ✅ Variables de entorno para producción
- ✅ Optimizaciones de cache y compresión

## 📋 Pasos para Subir a A2 Hosting

### Opción 1: File Manager (Recomendado para principiantes)

1. **Acceder al cPanel**
   - Ve a https://tu-dominio.com:2083
   - Ingresa tus credenciales de A2 Hosting

2. **Abrir File Manager**
   - En cPanel, busca "File Manager" y haz clic

3. **Navegar a public_html**
   - Ve a la carpeta `public_html` (esta es la raíz de tu sitio web)

4. **Limpiar carpeta (si hay contenido anterior)**
   - Elimina cualquier archivo index.html existente
   - Mantén solo carpetas como `cgi-bin` si existen

5. **Subir archivos**
   - Haz clic en "Upload" en la barra superior
   - Arrastra TODOS los archivos de la carpeta `dist/` a la zona de upload
   - Espera a que se suban todos los archivos

6. **Verificar estructura**
   Tu `public_html` debe verse así:
   ```
   public_html/
   ├── index.html
   ├── .htaccess
   ├── assets/
   │   ├── index-DAblzpdu.js
   │   └── index-DjQYM7I3.css
   └── images/
       ├── portada.jpg
       ├── portada01.jpg
       └── portada - copia.jpg
   ```

### Opción 2: FTP/SFTP (Para usuarios avanzados)

1. **Usar un cliente FTP como FileZilla**
   - Host: ftp.tu-dominio.com
   - Usuario: tu usuario de cPanel
   - Contraseña: tu contraseña de cPanel
   - Puerto: 21 (FTP) o 22 (SFTP)

2. **Navegar a public_html**
   - Conectar y ir a `/public_html/`

3. **Subir archivos**
   - Arrastra todos los archivos de `dist/` a `public_html/`

## 🔧 Configuraciones Adicionales

### Variables de Entorno
Si tu aplicación necesita configuración específica, edita `.env.production`:
```env
VITE_APP_ENV=production
VITE_BASE_URL=/images/
VITE_API_BASE_URL=https://tu-dominio.com/api
```

### Base de Datos (si la necesitas)
1. En cPanel > "MySQL Databases"
2. Crear nueva base de datos
3. Crear usuario y asignarlo a la base de datos
4. Configurar las credenciales en tu backend

## ✅ Verificación

1. **Visita tu dominio**
   - Ve a https://tu-dominio.com
   - Debería cargar tu aplicación React

2. **Probar navegación**
   - Verifica que las rutas funcionen (players, games, etc.)
   - Debe funcionar la navegación sin errores 404

3. **Verificar recursos**
   - Las imágenes deben cargar correctamente
   - Los estilos deben aplicarse
   - No debe haber errores en la consola del navegador

## 🐛 Solución de Problemas

### Error 404 en rutas
- Verificar que `.htaccess` esté en `public_html/`
- Asegurarse que Apache mod_rewrite esté habilitado

### Imágenes no cargan
- Verificar que la carpeta `images/` esté en `public_html/`
- Revisar las rutas en el código

### Error de permisos
- Permisos recomendados:
  - Archivos: 644
  - Carpetas: 755

## 📊 Optimizaciones Post-Deploy

1. **Configurar SSL/HTTPS**
   - En cPanel > "SSL/TLS"
   - Activar "Let's Encrypt" (gratuito)

2. **Configurar CDN (Opcional)**
   - Usar Cloudflare para mejorar velocidad

3. **Monitoreo**
   - Configurar Google Analytics
   - Revisar logs en cPanel > "Error Logs"

## 🎯 Checklist Final

- [ ] Build generado sin errores
- [ ] Archivos subidos a public_html
- [ ] Sitio web accesible desde el navegador
- [ ] Navegación entre páginas funciona
- [ ] Imágenes cargan correctamente
- [ ] Login/logout funciona
- [ ] Responsive design se ve bien
- [ ] SSL configurado (HTTPS)

¡Tu aplicación React está lista para producción en A2 Hosting! 🎉