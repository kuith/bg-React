import React from "react";
import TablePlayerMatches from "../../../components/players/table-player-matches";

const PlayersMatchesTable = ({ matches, loading, error }) => {
    if (loading) return <p>Cargando partidas...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!matches || matches.length === 0)
        return <p>No hay partidas disponibles.</p>;

    return <TablePlayerMatches data={matches} />;
};

export default PlayersMatchesTable;
