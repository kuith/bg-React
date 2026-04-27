/**
 * Configuración de la aplicación
 * Permite cambiar entre modo local (autocontenido) y modo remoto (con API)
 */

// Configuración principal
export const APP_CONFIG = {
  // Cambiar a false para usar la API remota
  USE_LOCAL_STORAGE: true,
  
  // Configuración de la API remota (solo se usa si USE_LOCAL_STORAGE es false)
  API_URL: import.meta.env.DEV ? "/api" : "https://bg-api-997t.onrender.com/api",
  
  // Configuración de debug
  DEBUG_MODE: import.meta.env.DEV,
  
  // Simulación de delay de red en modo local (ms)
  LOCAL_NETWORK_DELAY: 300,
  
  // Versión de la aplicación
  VERSION: "2.0.0-local"
};

// Función para verificar si estamos en modo local
export const isLocalMode = () => APP_CONFIG.USE_LOCAL_STORAGE;

// Función para obtener la URL de la API
export const getApiUrl = () => APP_CONFIG.API_URL;

// Función para logging condicional
export const debugLog = (message, data = null) => {
  if (APP_CONFIG.DEBUG_MODE) {
    console.log(`[BG-App Debug] ${message}`, data || '');
  }
};