import React from "react";
import CompPlayersTable from "../../../components/players/comp-players-table";

const ViewTablePlayers = ({ data, onClick }) => {
    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;
    return <CompPlayersTable
        data={data}
        onClick={onClick}
    />;
}

export default ViewTablePlayers;