import { LocalStorageService, STORAGE_KEYS } from './localStorageService';
import { mockMatches } from '../data/mockMatches';

// Servicio local para matches
const matchesLocalService = new LocalStorageService(STORAGE_KEYS.MATCHES, mockMatches);

// Obtener todas las partidas
export const getAllMatches = async () => {
  try {
    const matches = await matchesLocalService.getAll();
    return matches;
  } catch (error) {
    console.error("Error al obtener partidas:", error);
    return [];
  }
};

// Buscar una partida por ID
export const getMatchesById = async (id) => {
  try {
    const match = await matchesLocalService.getById(id);
    if (match) {
      return match;
    } else {
      throw new Error("Partida no encontrada");
    }
  } catch (error) {
    console.error("Error al obtener partida por id:", error);
    return {};
  }
};

// Crear una nueva partida
export const createMatch = async (matchData) => {
  try {
    const newMatch = await matchesLocalService.create(matchData);
    return newMatch;
  } catch (error) {
    console.error("Error al crear partida:", error);
    throw error;
  }
};

// Actualizar una partida existente
export const updateMatch = async (id, matchData) => {
  try {
    const updatedMatch = await matchesLocalService.update(id, matchData);
    return updatedMatch;
  } catch (error) {
    console.error("Error al actualizar partida:", error);
    throw error;
  }
};

// Eliminar una partida
export const deleteMatch = async (id) => {
  try {
    const result = await matchesLocalService.delete(id);
    return result;
  } catch (error) {
    console.error("Error al eliminar partida:", error);
    throw error;
  }
};