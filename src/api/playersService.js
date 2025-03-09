import { api } from "../api/api";

const getPlayers = () => api.get("/players/");
const getPlayerById = (id) => api.get(`/players/${id}`);
const createPlayer = (playerData) => api.post("/players", playerData);
const updatePlayer = (id, playerData) => api.put(`/players/${id}`, playerData);
const deletePlayer = (id) => api.del(`/players/${id}`);
const getPlayerByName = (name) => api.get(`/players/name/${name}`);
const getPlayerByMail = (mail) => api.get(`/players/mail/${mail}`);
const getPlayerByRol = (rol) => api.get(`/players/rol/${rol}`);
const getPlayersByGame = (gameId) => api.get(`/players/games/${gameId}/players`);
const getMatchesWonByPlayer = (playerId) => api.get(`/players/${playerId}/matches/won`);

export {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    getPlayerByName,
    getPlayerByMail,
    getPlayerByRol,
    getPlayersByGame,
    getMatchesWonByPlayer,
}

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
