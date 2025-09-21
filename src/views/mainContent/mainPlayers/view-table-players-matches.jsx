import React from "react";
import CompTablePlayerMatches from "../../../components/players/comp-table-player-matches";
import LoadingSpinner from "../../../components/common/LoadingSpinner";


const PlayersMatchesTable = ({ matches, loading, error, tableColumns }) => {
    if (loading) {
        return (
            <LoadingSpinner 
                message="Cargando partidas del jugador..." 
                size={50}
            />
        );
    }
    
    if (error) return <p>Error: {error}</p>;
    if (!matches || matches.length === 0)
        return <p>No hay partidas disponibles.</p>;

    return <CompTablePlayerMatches data={matches} tableColumns={tableColumns} />;
};

export default PlayersMatchesTable;
