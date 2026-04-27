import { api } from "../api/api";
import { isLocalMode } from "../config/appConfig";
import * as localService from "../services/playersLocalService";

// Obtener el listado completo de jugadores
export const getAllPlayers = async () => {
    if (isLocalMode()) {
        return await localService.getAllPlayers();
    }
    
    try {
        const response = await api.get("/players/");
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener jugadores:", error);
        return [];
    }
};

// Buscar un jugador por ID
export const getPlayerById = async (id) => {
    if (isLocalMode()) {
        return await localService.getPlayerById(id);
    }
    
    try {
        const response = await api.get(`/players/id/${id}`);
        console.log("desde servicio", response);
        const data = Array.isArray(response.data) ? response.data : response;
        if (response) {
            return data;
        } else {
            throw new Error("Datos del jugador no encontrados");
        }
    } catch (error) {
        console.error("Error al obtener jugador por id:", error);
        return null;
    }
};

// Buscar jugadores por nombre
export const searchPlayersByName = async (name) => {
    if (isLocalMode()) {
        // Implementación local de búsqueda por nombre
        const players = await localService.getAllPlayers();
        return players.filter(player => 
            player.nombre.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    try {
        const response = await api.get("/players/name/", {
            params: { search: name },
        });
        return response.data;
    } catch (error) {
        console.error("Error al buscar jugadores por nombre:", error);
    }
};

// Buscar jugadores por rol
export const searchPlayersByRol = async (rol) => {
    if (isLocalMode()) {
        // Implementación local de búsqueda por rol
        const players = await localService.getAllPlayers();
        return players.filter(player => player.rol === rol);
    }
    
    try {
        const response = await api.get(`/players/role/${rol}`);
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al buscar jugadores por rol:", error);
    }
};

// Buscar jugadores por email
export const searchPlayersByEmail = async (email) => {
    if (isLocalMode()) {
        // Implementación local de búsqueda por email
        const players = await localService.getAllPlayers();
        return players.filter(player => player.correo === email);
    }
    
    try {
        const response = await api.get(`/players/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar jugadores por email:", error);
    }
};

export const getMatchesWonByPlayer = async (playerId) => {
    if (isLocalMode()) {
        // Implementación local - necesitamos importar el servicio de matches
        const { getAllMatches } = await import("../services/matchesLocalService.js");
        const matches = await getAllMatches();
        return matches.filter(match => match.jugador_ganador_id === parseInt(playerId));
    }
    
    try {
        const response = await api.get(`/players/${playerId}/matches/won`);
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener partidas ganadas por jugador:", error);
    }
};

export const getPlayersByGame = async (gameId) => {
    if (isLocalMode()) {
        // Implementación local - necesitamos importar el servicio de matches
        const { getAllMatches } = await import("../services/matchesLocalService.js");
        const matches = await getAllMatches();
        const playerIds = new Set();
        
        matches
            .filter(match => match.juego_id === parseInt(gameId))
            .forEach(match => {
                match.jugadores_ids.forEach(id => playerIds.add(id));
            });
        
        const players = await localService.getAllPlayers();
        return players.filter(player => playerIds.has(player.id));
    }
    
    try {
        const response = await api.get(`/players/games/${gameId}`);
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener jugadores por juego:", error);
    }
};

// Login de usuario
export const loginPlayer = async (correo, password) => {
    if (isLocalMode()) {
        return await localService.loginPlayer(correo, password);
    }
    
    try {
        const response = await api.post("/players/login", { correo, password });
        return response;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};

export const createPlayer = async (playerData) => {
    if (isLocalMode()) {
        return await localService.createPlayer(playerData);
    }
    return api.post("/players/", playerData);
};

export const updatePlayer = async (id, playerData) => {
    if (isLocalMode()) {
        return await localService.updatePlayer(id, playerData);
    }
    return api.patch(`/players/${id}`, playerData);
};

export const deletePlayer = async (id) => {
    if (isLocalMode()) {
        return await localService.deletePlayer(id);
    }
    return api.del(`/players/${id}`);
};
