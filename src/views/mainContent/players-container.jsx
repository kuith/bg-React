import React, { useContext } from "react";
import { PlayersContext } from "../../context/PlayersContext";
import GenericContainer from "../../components/common/GenericContainer";
import MatchDetailCard from "../../components/matches/MatchDetailCard";
import { getMatchesByPlayer } from "../../api/matchesService";
import { getMatchesById } from "../../api/matchesService";
import { processMatches } from "../../utils/processors";
import { getPlayerById } from "../../api/playersService";

const PlayersContainer = () => {
    const { players, loading } = useContext(PlayersContext);

    // Configuración con modal secundario para detalles de partidas
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
            processor: processMatches,
            onClick: async (matchId, selectedPlayer, allSecondaryData) => {
                // En lugar de hacer llamada API, buscar en los datos que ya tenemos
                const matchData = allSecondaryData.find(m => m.id === matchId);
                
                if (matchData && matchData.originalMatch) {
                    // Usar los datos originales que ya tenemos
                    return matchData.originalMatch;
                }
                
                return null;
            }
        },
        secondaryModal: {
            title: "Detalles de la partida",
            Component: MatchDetailCard,
            entityProp: "match"
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
