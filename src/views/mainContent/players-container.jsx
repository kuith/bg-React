import React, { useContext } from "react";
import { PlayersContext } from "../../context/PlayersContext";
import GenericContainer from "../../components/common/GenericContainer";
import { getMatchesByPlayer } from "../../api/matchesService";
import { processMatches } from "../../utils/processors";
import { getPlayerById } from "../../api/playersService";

const PlayersContainer = () => {
    const { players, loading } = useContext(PlayersContext);

    // Configuración SIMPLIFICADA - Una sola tabla genérica para todo
    const containerConfig = {
        main: {
            title: "Jugadores",
            entityName: "Jugador",
            label: "Partidas",
            columns: ["Nombre", "Correo", "Rol"],
            onClick: async (jugadorId) => {
                const data = await getMatchesByPlayer(jugadorId);
                return data;
            },
            getEntityById: getPlayerById
        },
        secondary: {
            title: (selectedPlayer) => 
                `Partidas de ${selectedPlayer?.nombre || "ningún jugador seleccionado"}`,
            entityName: "Partida",
            label: "Detalles",
            columns: ["Juego", "Jugadores", "Ganadores"],
            processor: processMatches
        }
    };

    return (
        <GenericContainer 
            mainData={players}
            mainLoading={loading}
            config={containerConfig}
        />
    );
};

export default PlayersContainer;
