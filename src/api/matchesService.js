import { api } from "../api/api";

export const getAllMatches = async () => {
    try {
        const response = await api.get("/matches/");
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener partidas:", error);
    }
};

export const getMatchesById = async (id) => {
    try {
        const response = await api.get(`/matches/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error la partida por id:", error);
    }
};

export const getMatchesByDate = async (fecha) => {
    try {
        const response = await api.get(`/matches/date/${fecha}`);
        return response.data;
    } catch (error) {
        console.error("Error la partida por fecha:", error);
    }
};

export const getMatchesWinnersRanking = async () => {
    try {
        const response = await api.get("/matches/winnersRanking");
        return response.data;
    } catch (error) {
        console.error("Error la partida por fecha:", error);
    }
};

export const getMatchesByPlayer = async (jugadorId) => {
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
    try {
        const response = await api.get(`/matches/playersByGame/${juegoId}`);
        return response.data;
    } catch (error) {
        console.error("Error los jugadores que han jugado a un juago:", error);
    }
};

export const getWinnersByGame = async (juegoId) => {
    try {
        const response = await api.get(`/matches/winnersByGame/${juegoId}`);
        return response.data;
    } catch (error) {
        console.error("Error los jugadores que han ganado a un juago:", error);
    }
};

export const createMatch = (matchData) => api.post("/matches/", matchData);
export const updateMatch = (id, matchData) =>
    api.patch(`/matches/${id}`, matchData);
export const deleteMatch = (id) => api.del(`/matches/${id}`);
