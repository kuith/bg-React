import { LocalStorageService, STORAGE_KEYS } from './localStorageService';
import { mockGames } from '../data/mockGames';

// Servicio local para games
const gamesLocalService = new LocalStorageService(STORAGE_KEYS.GAMES, mockGames);

// Obtener todos los juegos
export const getAllGames = async () => {
  try {
    const games = await gamesLocalService.getAll();
    return games;
  } catch (error) {
    console.error("Error al obtener juegos:", error);
    return [];
  }
};

// Buscar un juego por ID
export const getGamesById = async (id) => {
  try {
    const game = await gamesLocalService.getById(id);
    if (game) {
      return game;
    } else {
      throw new Error("Juego no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener juego por id:", error);
    return {};
  }
};

// Crear un nuevo juego
export const createGame = async (gameData) => {
  try {
    const newGame = await gamesLocalService.create(gameData);
    return newGame;
  } catch (error) {
    console.error("Error al crear juego:", error);
    throw error;
  }
};

// Actualizar un juego existente
export const updateGame = async (id, gameData) => {
  try {
    const updatedGame = await gamesLocalService.update(id, gameData);
    return updatedGame;
  } catch (error) {
    console.error("Error al actualizar juego:", error);
    throw error;
  }
};

// Eliminar un juego
export const deleteGame = async (id) => {
  try {
    const result = await gamesLocalService.delete(id);
    return result;
  } catch (error) {
    console.error("Error al eliminar juego:", error);
    throw error;
  }
};

// Obtener juegos por autor
export const getGamesByAuthors = async (authorId) => {
  try {
    const games = await gamesLocalService.getAll();
    const gamesByAuthor = games.filter(game => game.autor_id === parseInt(authorId));
    return gamesByAuthor;
  } catch (error) {
    console.error("Error al obtener juegos por autor:", error);
    return [];
  }
};