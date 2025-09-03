import React from "react";
import CompPlayersTable from "../../../components/players/comp-players-table";

const ViewTableEntity = ({ data, onClick, columns, entity }) => {
    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;
    return <CompAuthorsTable
        data={data}
        onClick={onClick}
        columns={columns}
        entity={entity}
    />;
}

export default ViewTableEntity;