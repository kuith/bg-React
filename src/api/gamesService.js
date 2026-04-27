import { api } from "../api/api";
import { isLocalMode } from "../config/appConfig";
import * as localService from "../services/gamesLocalService";

export const getAllGames = async () => {
    if (isLocalMode()) {
        return await localService.getAllGames();
    }
    
    try {
        const response = await api.get("/games/");
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener juegos:", error);
    }
}

export const getGamesById = async (id) => {
    if (isLocalMode()) {
        return await localService.getGamesById(id);
    }
    
    try {
        const response = await api.get(`/games/id/${id}`);
        console.log("Respuesta cruda de la API:", response);
        return response.data ? response.data : response;
    } catch (error) {
        console.error("Error al obtener juego por id:", error);
        return {};
    }
};

export const getGamesByName = async (name) => {
    if (isLocalMode()) {
        const games = await localService.getAllGames();
        return games.filter(game => 
            game.titulo.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    try {
        const response = await api.get(`/games/name/${name}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por nombre:", error);
    }
};

export const getGamesByYear = async (anio) => {
    if (isLocalMode()) {
        const games = await localService.getAllGames();
        return games.filter(game => 
            new Date(game.fecha_lanzamiento).getFullYear() === parseInt(anio)
        );
    }
    
    try {
        const response = await api.get(`/games/year/${anio}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por año de publicación:", error);
    }
};

export const getGamesByLocalEditorial = async (editorialLocal) => {
    if (isLocalMode()) {
        const games = await localService.getAllGames();
        return games.filter(game => game.editorial === editorialLocal);
    }
    
    try {
        const response = await api.get(
            `/games/localEditorial/${editorialLocal}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por editorial local:", error);
    }
};

// Operaciones CRUD básicas
export const createGame = async (gameData) => {
    if (isLocalMode()) {
        return await localService.createGame(gameData);
    }
    return api.post("/games/", gameData);
};

export const updateGame = async (id, gameData) => {
    if (isLocalMode()) {
        return await localService.updateGame(id, gameData);
    }
    return api.patch(`/games/${id}`, gameData);
};

export const deleteGame = async (id) => {
    if (isLocalMode()) {
        return await localService.deleteGame(id);
    }
    return api.del(`/games/${id}`);
};

export const getGamesByOriginEditorial = async (editorialMadre) => {
    try {
        const response = await api.get(
            `/games/originEditorial/${editorialMadre}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por editorial madre:", error);
    }
};

export const getGamesByPriceRange = async (minPrice, maxPrice) => {
    try {
        const response = await api.get(
            `/games/priceRange/${minPrice}/${maxPrice}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por rango de precios:", error);
    }
};

export const getGamesByUnderPrice = async (price) => {
    try {
        const response = await api.get(
            `/games/underPrice/${price}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por precio minimo:", error);
    }
};

export const getGamesByOverPrice = async (price) => {
    try {
        const response = await api.get(`/games/overPrice/${price}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego por precio superior:", error);
    }
};

export const getGamesByPlayersRange = async (nimPlayers, maxPlayers) => {
    try {
        const response = await api.get(
            `/games/playersRange/${nimPlayers}/${maxPlayers}`
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego entre rango de jugadores:", error);
    }
};

export const getGamesByMinPlayers = async (minjugadores) => {
    try {
        const response = await api.get(`/games/minplayers/${minjugadores}`);
        return response.data;
    } catch (error) {
        console.error(
            "Error al obtener juego con mínimo de jugadores:",
            error
        );
    }
};

export const getGamesByMaxPlayers = async (maxjugadores) => {
    try {
        const response = await api.get(`/games/maxPlayers/${maxjugadores}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego con máximo de jugadores:", error);
    }
};

export const getGamesByAuthors = async (id) => {
    if (isLocalMode()) {
        return await localService.getGamesByAuthors(id);
    }
    
    try {
        const response = await api.get(`/games/gamesByAutors/${id}`);
        return response;
    } catch (error) {
        console.error("Error al obtener juego por autor:", error);
        return [];
    }
};

export const getGamesByYesAutoma = async () => {
    try {
        const response = await api.get(`/games/yesAutoma`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego con automa:", error);
    }
};

export const getGamesByNoAutoma = async () => {
    try {
        const response = await api.get(`/games/noAutoma`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juego sin automa:", error);
    }
};

export const getGamesByType = async (tipo) => {
    try {
        const response = await api.get(`/games/type/${tipo}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juegos de un tipo:", error);
    }
};

export const getExpansionsByJuego = async (idJuego) => {
    try {
        const response = await api.get(`/games/expansionsByJuego/${idJuego}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las expansiones de un juego:", error);
    }
};

export const getAllExpansions = async () => {
    try {
        const response = await api.get(`/games/expansions`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las expansiones:", error);
    }
};

export const getExpansionsWithAutoma = async () => {
    try {
        const response = await api.get(`/games/expansionsWithAutoma`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las expansiones con automa:", error);
    }
};

export const getExpansionsWithoutAutoma = async () => {
    try {
        const response = await api.get(`/games/expansionsWithoutAutoma`);
        return response.data;
    } catch (error) {
        console.error(
            "Error al obtener todas las expansiones sin automa:",
            error
        );
    }
};
