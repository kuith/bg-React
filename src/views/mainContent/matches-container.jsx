import React, { useContext } from "react";
import { MatchesContext } from "../../context/MatchesContext";
import GenericContainer from "../../components/common/GenericContainer";
import MatchDetailCard from "../../components/matches/MatchDetailCard";
import { processMatches } from "../../utils/processors";
import { getMatchesById } from "../../api/matchesService";

const MatchesContainer = () => {
    const { matches, loading } = useContext(MatchesContext);

    // Configuración para GenericContainer con modal
    const containerConfig = {
        main: {
            title: "Partidas",
            entityName: "Partida",
            label: "Detalles",
            columns: ["fecha", "juego", "ganadores"],
            onClick: async (matchId) => {
                // Intentar obtener de API, si falla buscar en array local
                let match = await getMatchesById(matchId);
                if (!match) {
                    match = matches.find(m => m.id === matchId || m.id === Number(matchId));
                }
                return match;
            }
        },
        secondary: {
            type: "modal"
        },
        modal: {
            title: "Detalles de la partida",
            Component: MatchDetailCard,
            entityProp: "match"
        }
    };

    // Procesar los datos de partidas para aplanar objetos anidados
    const processedMatches = processMatches(matches).map((m, idx) => ({
        ...m,
        id: m.id ?? matches[idx]?.id ?? idx
    }));

    return (
        <GenericContainer 
            mainData={processedMatches}
            mainLoading={loading}
            config={containerConfig}
        />
    );
};

export default MatchesContainer;
