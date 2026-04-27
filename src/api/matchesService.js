import { api } from "../api/api";
import { isLocalMode } from "../config/appConfig";
import * as localService from "../services/matchesLocalService";

export const getAllMatches = async () => {
    if (isLocalMode()) {
        return await localService.getAllMatches();
    }
    
    try {
        const response = await api.get("/matches/");
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener partidas:", error);
    }
};

export const getMatchesById = async (id) => {
    if (isLocalMode()) {
        return await localService.getMatchesById(id);
    }
    
    try {
        const response = await api.get(`/matches/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error la partida por id:", error);
    }
};

export const getMatchesByDate = async (fecha) => {
    if (isLocalMode()) {
        const matches = await localService.getAllMatches();
        return matches.filter(match => match.fecha === fecha);
    }
    
    try {
        const response = await api.get(`/matches/date/${fecha}`);
        return response.data;
    } catch (error) {
        console.error("Error la partida por fecha:", error);
    }
};

export const getMatchesWinnersRanking = async () => {
    if (isLocalMode()) {
        const matches = await localService.getAllMatches();
        const winCounts = {};
        
        matches
            .filter(match => match.jugador_ganador_id !== null)
            .forEach(match => {
                const winnerId = match.jugador_ganador_id;
                winCounts[winnerId] = (winCounts[winnerId] || 0) + 1;
            });
            
        return Object.entries(winCounts)
            .map(([playerId, wins]) => ({ jugador_id: parseInt(playerId), victorias: wins }))
            .sort((a, b) => b.victorias - a.victorias);
    }
    
    try {
        const response = await api.get("/matches/winnersRanking");
        return response.data;
    } catch (error) {
        console.error("Error la partida por fecha:", error);
    }
};

export const getMatchesByPlayer = async (jugadorId) => {
    if (isLocalMode()) {
        const matches = await localService.getAllMatches();
        return matches.filter(match => 
            match.jugadores_ids.includes(parseInt(jugadorId))
        );
    }
    
    try {
        //console.log("Llamando a la API con jugadorId:", jugadorId);
        const response = await api.get(`/matches/player/${jugadorId}`);
        //console.log("Respuesta completa de la API:", response); // Verifica la estructura completa

        // Si la respuesta es un array directamente
        const data = Array.isArray(response.data) ? response.data : response;
        console.log("Datos procesados:", data); // Verifica los datos procesados
        return data;
    } catch (error) {
        console.error("Error las partidas de un jugador:", error);
        return [];
    }
};

export const getGamesByPlayer = async (jugadorId) => {
    if (isLocalMode()) {
        const matches = await localService.getAllMatches();
        const gameIds = new Set(
            matches
                .filter(match => match.jugadores_ids.includes(parseInt(jugadorId)))
                .map(match => match.juego_id)
        );
        
        // Necesitamos importar dinámicamente el servicio de juegos
        const { getAllGames } = await import("../services/gamesLocalService");
        const games = await getAllGames();
        return games.filter(game => gameIds.has(game.id));
    }
    
    try {
        const response = await api.get(`/matches/player/${jugadorId}`);
        return response.data;
    } catch (error) {
        console.error(
            "Error los juegos a los que ha jugado un jugador:",
            error
        );
    }
};

export const getPlayersByGame = async (juegoId) => {
    if (isLocalMode()) {
        const matches = await localService.getAllMatches();
        const playerIds = new Set();
        
        matches
            .filter(match => match.juego_id === parseInt(juegoId))
            .forEach(match => {
                match.jugadores_ids.forEach(id => playerIds.add(id));
            });
            
        // Necesitamos importar dinámicamente el servicio de jugadores
        const { getAllPlayers } = await import("../services/playersLocalService");
        const players = await getAllPlayers();
        return players.filter(player => playerIds.has(player.id));
    }
    
    try {
        const response = await api.get(`/matches/playersByGame/${juegoId}`);
        return response.data;
    } catch (error) {
        console.error("Error los jugadores que han jugado a un juego:", error);
    }
};

export const getWinnersByGame = async (juegoId) => {
    if (isLocalMode()) {
        const matches = await localService.getAllMatches();
        const winnerIds = new Set();
        
        matches
            .filter(match => match.juego_id === parseInt(juegoId) && match.jugador_ganador_id !== null)
            .forEach(match => winnerIds.add(match.jugador_ganador_id));
            
        // Necesitamos importar dinámicamente el servicio de jugadores
        const { getAllPlayers } = await import("../services/playersLocalService");
        const players = await getAllPlayers();
        return players.filter(player => winnerIds.has(player.id));
    }
    
    try {
        const response = await api.get(`/matches/winnersByGame/${juegoId}`);
        return response.data;
    } catch (error) {
        console.error("Error los jugadores que han ganado a un juego:", error);
    }
};

export const createMatch = async (matchData) => {
    if (isLocalMode()) {
        return await localService.createMatch(matchData);
    }
    return api.post("/matches/", matchData);
};

export const updateMatch = async (id, matchData) => {
    if (isLocalMode()) {
        return await localService.updateMatch(id, matchData);
    }
    return api.patch(`/matches/${id}`, matchData);
};

export const deleteMatch = async (id) => {
    if (isLocalMode()) {
        return await localService.deleteMatch(id);
    }
    return api.del(`/matches/${id}`);
};
