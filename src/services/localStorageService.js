/**
 * Servicio de almacenamiento local usando LocalStorage
 * Proporciona operaciones CRUD persistentes para la aplicación autocontenida
 */

// Claves para LocalStorage
const STORAGE_KEYS = {
  PLAYERS: 'bg_app_players',
  AUTHORS: 'bg_app_authors', 
  GAMES: 'bg_app_games',
  MATCHES: 'bg_app_matches',
  INITIALIZED: 'bg_app_initialized'
};

/**
 * Obtiene datos del LocalStorage
 * @param {string} key - Clave del storage
 * @param {Array} defaultData - Datos por defecto si no existen
 * @returns {Array} Datos del storage o por defecto
 */
export const getFromStorage = (key, defaultData = []) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error(`Error al leer ${key} del storage:`, error);
    return defaultData;
  }
};

/**
 * Guarda datos en LocalStorage
 * @param {string} key - Clave del storage
 * @param {any} data - Datos a guardar
 * @returns {boolean} Éxito de la operación
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error al guardar ${key} en storage:`, error);
    return false;
  }
};

/**
 * Inicializa el storage con datos mock si es la primera vez
 * @param {string} key - Clave del storage
 * @param {Array} mockData - Datos mock iniciales
 */
export const initializeStorage = (key, mockData) => {
  const existing = getFromStorage(key);
  if (existing.length === 0) {
    saveToStorage(key, mockData);
  }
};

/**
 * Obtiene el siguiente ID disponible para una entidad
 * @param {Array} data - Array de datos
 * @returns {number} Siguiente ID
 */
export const getNextId = (data) => {
  if (data.length === 0) return 1;
  return Math.max(...data.map(item => item.id)) + 1;
};

/**
 * Simula delay de red para hacer más realista la experiencia
 * @param {number} ms - Milisegundos de delay
 */
export const simulateNetworkDelay = (ms = 300) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Operaciones CRUD genéricas para cualquier entidad
 */
export class LocalStorageService {
  constructor(storageKey, mockData = []) {
    this.storageKey = storageKey;
    this.mockData = mockData;
    this.initializeIfNeeded();
  }

  initializeIfNeeded() {
    initializeStorage(this.storageKey, this.mockData);
  }

  async getAll() {
    await simulateNetworkDelay();
    return getFromStorage(this.storageKey, this.mockData);
  }

  async getById(id) {
    await simulateNetworkDelay();
    const data = getFromStorage(this.storageKey, this.mockData);
    return data.find(item => item.id === parseInt(id));
  }

  async create(newItem) {
    await simulateNetworkDelay();
    const data = getFromStorage(this.storageKey, this.mockData);
    const item = {
      ...newItem,
      id: getNextId(data)
    };
    data.push(item);
    saveToStorage(this.storageKey, data);
    return item;
  }

  async update(id, updatedItem) {
    await simulateNetworkDelay();
    const data = getFromStorage(this.storageKey, this.mockData);
    const index = data.findIndex(item => item.id === parseInt(id));
    
    if (index === -1) {
      throw new Error(`Item con id ${id} no encontrado`);
    }
    
    data[index] = { ...data[index], ...updatedItem, id: parseInt(id) };
    saveToStorage(this.storageKey, data);
    return data[index];
  }

  async delete(id) {
    await simulateNetworkDelay();
    const data = getFromStorage(this.storageKey, this.mockData);
    const filteredData = data.filter(item => item.id !== parseInt(id));
    
    if (filteredData.length === data.length) {
      throw new Error(`Item con id ${id} no encontrado`);
    }
    
    saveToStorage(this.storageKey, filteredData);
    return { success: true, message: 'Item eliminado correctamente' };
  }
}

export { STORAGE_KEYS };