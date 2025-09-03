import React from "react";
import CompTablePlayerMatches from "../../../components/players/comp-table-player-matches";


const PlayersMatchesTable = ({ matches, loading, error, tableColumns }) => {
    if (loading) return <p>Cargando partidas...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!matches || matches.length === 0)
        return <p>No hay partidas disponibles.</p>;

    return <CompTablePlayerMatches data={matches} tableColumns={tableColumns} />;
};

export default PlayersMatchesTable;
