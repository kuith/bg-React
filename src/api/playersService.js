import { api } from "../api/api";

// Obtener el listado completo de jugadores
export const getAllPlayers = async () => {
    try {
        const response = await api.get("/players/");
        //console.log("Respuesta completa del servidor:", response); // Log completo
        const data = Array.isArray(response.data) ? response.data : response; // Maneja array directo
        //console.log("Datos obtenidos en el servicio:", data); // Log de los datos
        return data; // Devuelve el array de jugadores
    } catch (error) {
        console.error("Error al obtener jugadores:", error);
        return []; // Devuelve un array vacío como fallback en caso de error
    }
};

// Buscar un jugador por ID
export const getPlayerById = async (id) => {
    try {
        const response = await api.get(`/players/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener jugador por id:", error);
    }
};

// Buscar jugadores por nombre
export const searchPlayersByName = async (name) => {
    try {
        const response = await api.get("/players/name/", { params: { search: name } });
        return response.data;
    } catch (error) {
        console.error("Error al buscar jugadores por nombre:", error);
    }    
};

// Buscar jugadores por rol
export const searchPlayersByRol = async (rol) => {
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
    try {
        const response = await api.get(`/players/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error al buscar jugadores por email:", error);
    }
};

export const getMatchesWonByPlayer = async (playerId) => {
    try {
        const response = await api.get(`/players/${playerId}/matches/won`);
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener partidas ganadas por jugador:", error);
    }
};

export const getPlayersByGame = async (gameId) => {
    try {
        const response = await api.get(`/players/games/${gameId}`);
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener jugadores por juego:", error);
    }
}


export const createPlayer = (playerData) => api.post("/players/", playerData);
export const updatePlayer = (id, playerData) => api.put(`/players/${id}`, playerData);
export const deletePlayer = (id) => api.del(`/players/${id}`);


