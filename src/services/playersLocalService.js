import { LocalStorageService, STORAGE_KEYS } from './localStorageService';
import { mockPlayers } from '../data/mockPlayers';

// Servicio local para players
const playersLocalService = new LocalStorageService(STORAGE_KEYS.PLAYERS, mockPlayers);

// Obtener todos los jugadores
export const getAllPlayers = async () => {
  try {
    const players = await playersLocalService.getAll();
    return players;
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    return [];
  }
};

// Buscar un jugador por ID
export const getPlayerById = async (id) => {
  try {
    const player = await playersLocalService.getById(id);
    if (player) {
      return player;
    } else {
      throw new Error("Jugador no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener jugador por id:", error);
    return null;
  }
};

// Crear un nuevo jugador
export const createPlayer = async (playerData) => {
  try {
    const newPlayer = await playersLocalService.create(playerData);
    return newPlayer;
  } catch (error) {
    console.error("Error al crear jugador:", error);
    throw error;
  }
};

// Actualizar un jugador existente
export const updatePlayer = async (id, playerData) => {
  try {
    const updatedPlayer = await playersLocalService.update(id, playerData);
    return updatedPlayer;
  } catch (error) {
    console.error("Error al actualizar jugador:", error);
    throw error;
  }
};

// Eliminar un jugador
export const deletePlayer = async (id) => {
  try {
    const result = await playersLocalService.delete(id);
    return result;
  } catch (error) {
    console.error("Error al eliminar jugador:", error);
    throw error;
  }
};

// Login local (función específica para autenticación)
export const loginPlayer = async (correo, password) => {
  try {
    const players = await getAllPlayers();
    const player = players.find(p => p.correo === correo && p.password === password);
    
    if (!player) {
      throw new Error("Credenciales incorrectas");
    }
    
    // No devolver la contraseña por seguridad
    const { password: _, ...playerData } = player;
    return playerData;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};