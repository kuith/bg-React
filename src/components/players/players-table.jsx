import React from "react";
import TableCreator from "../../utils/table-creator";
import PlayerMatchesTable from "./players-matches-table";

const PlayersTable = ({ players, onClick }) => {
    return (
        <>
            <TableCreator
                data={players}
                hiddenColumns={[
                    "id",
                    "fechaRegistro",
                    "partidasGanadas",
                    "partidas",
                ]}
            />
            <PlayerMatchesTable matches={players.partidas} onClick={onClick} />
        </>
    );
};

export default PlayersTable;
