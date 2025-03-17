import React from "react";
import TableCreator from "../../utils/table-creator";

const PlayersTable = ({ players }) => {
    return (
        <TableCreator data={players} hiddenColumns={['id', 'fechaRegistro', 'partidasGanadas', 'partidas']} />
    );
};

export default PlayersTable;
