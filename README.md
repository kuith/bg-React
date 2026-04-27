# Board Game Control - Aplicación Autocontenida

Una aplicación React completamente autocontenida para gestionar jugadores, autores, juegos de mesa y partidas, sin necesidad de backend o base de datos externa.

## 🎯 Características

- ✅ **Completamente autocontenida** - No requiere servidor backend
- ✅ **Persistencia local** - Datos guardados en LocalStorage  
- ✅ **CRUD completo** - Crear, leer, actualizar y eliminar entidades
- ✅ **Sistema de login** - Autenticación local con roles
- ✅ **Datos de ejemplo** - Precargada con datos mock
- ✅ **Responsive** - Interface adaptable con Material-UI
- ✅ **Deploy estático** - Funciona en cualquier hosting estático

## 🚀 Inicio Rápido

### Desarrollo
```bash
npm install
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

### Deploy Estático
```bash
npm run build
# Sube la carpeta 'dist' a tu hosting favorito
```

## 🎮 Credenciales de Acceso

### Usuario Administrador
- **Email**: `admin@bg.com`
- **Password**: `admin123`
- **Permisos**: Acceso completo al dashboard

### Usuario Regular
- **Email**: `invitado@correo.com` 
- **Password**: `invitado123`
- **Permisos**: Solo visualización y gestión básica

## 📊 Funcionalidades

### Gestión de Entidades
- **👥 Jugadores**: Registro, estadísticas, historial
- **✍️ Autores**: Diseñadores de juegos, biografías  
- **🎯 Juegos**: Catálogo completo con detalles técnicos
- **⚔️ Partidas**: Registro de partidas, puntuaciones, ganadores

### Características Técnicas
- **Persistencia**: Los datos se guardan automáticamente en LocalStorage
- **Búsquedas**: Filtros por nombre, fecha, categoría, etc.
- **Estadísticas**: Rankings, promedios, historial de victorias
- **Exportación**: Los datos están en formato JSON estándar

## 🛠️ Tecnologías

- **React 19** + **Vite 6** - Framework y build tool
- **Material-UI 6** - Componentes de interface
- **React Router 7** - Navegación SPA
- **LocalStorage API** - Persistencia local
- **ES6 Modules** - Arquitectura modular

## 📁 Estructura del Proyecto

```
src/
├── api/               # Servicios (con fallback local)
├── components/        # Componentes reutilizables
├── config/           # Configuración de la app
├── context/          # Context API (estado global)
├── data/             # Datos mock iniciales
├── services/         # Servicios de LocalStorage
├── utils/            # Utilidades y helpers
└── views/            # Vistas principales
```

## 🔧 Configuración

### Modo de Operación
La aplicación está configurada en modo local por defecto. Para cambiar:

```javascript
// src/config/appConfig.js
export const APP_CONFIG = {
  USE_LOCAL_STORAGE: true, // Cambiar a false para usar API remota
  // ... otras configuraciones
};
```

### Personalización de Datos
Los datos iniciales están en:
- `src/data/mockPlayers.js`
- `src/data/mockAuthors.js` 
- `src/data/mockGames.js`
- `src/data/mockMatches.js`

### Reset de Datos
Para resetear todos los datos:
```javascript
localStorage.clear();
// Recargar la aplicación
```

## 🌐 Deploy en Hosting Estático

### GitHub Pages
```bash
npm run build
# Configurar GitHub Actions o subir manualmente /dist
```

### Netlify
```bash
npm run build
# Arrastrar carpeta 'dist' al dashboard de Netlify
```

### Vercel
```bash
npm run build
# Conectar repo o subir carpeta 'dist'
```

### Cualquier hosting
```bash
npm run build
# Subir contenido de 'dist' via FTP/SSH
```

## 📈 Futuras Mejoras

- [ ] PWA (Progressive Web App)
- [ ] Exportación/Importación de datos
- [ ] Sincronización entre dispositivos
- [ ] Modo offline completo
- [ ] Tema oscuro/claro

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

---

**¡Disfruta organizando tus partidas de juegos de mesa!** 🎲
