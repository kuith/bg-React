import { api } from "../api/api";

// Obtener el listado completo de jugadores
export const getAllPlayers = async () => {
    const response = await api.get("/players");
    return response.data; // Suponiendo que los datos están en `response.data`
};

// Buscar un jugador por ID
export const getPlayerById = async (id) => {
    const response = await api.get(`/players/${id}`);
    return response.data;
};

// Buscar jugadores por nombre
export const searchPlayersByName = async (name) => {
    const response = await api.get("/players", { params: { search: name } });
    return response.data;
};

// Buscar jugadores por rol
export const searchPlayersByRol = async (rol) => {
    const response = await api.get(`/players/role/${rol}`);
    return response.data;
};

// Buscar jugadores por email
export const searchPlayersByEmail = async (email) => {
    const response = await api.get(`/players/email/${email}`);
    return response.data;
};

export const getMatchesWonByPlayer = async (playerId) => {
    const response = await api.get(`/players/${playerId}/matches/won`);
    return response.data;
};

export const getPlayersByGame = async (gameId) => {
    const response = await api.get(`/players/games/${gameId}/players`);
    return response.data;
}


export const createPlayer = (playerData) => api.post("/players", playerData);
export const updatePlayer = (id, playerData) => api.put(`/players/${id}`, playerData);
export const deletePlayer = (id) => api.del(`/players/${id}`);



 /* uso en un componente
import { useEffect, useState } from "react";
import { getPlayers } from "../api/playersService";

const PlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPlayers()
            .then(setPlayers)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando jugadores...</p>;

    return (
        <ul>
            {players.map((player) => (
                <li key={player.id}>{player.nombre}</li>
            ))}
        </ul>
    );
};

export default PlayersList;
*/
/* CON USEDATA
import useData from "../hooks/useData";

const PlayersList = () => {
    const { data: players, loading, error } = useData("/players/");

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {players.map((player) => (
                <li key={player.id}>{player.nombre}</li>
            ))}
        </ul>
    );
};*/

