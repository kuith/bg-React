import React from "react";
import TableCreator from "../../utils/table-creator";
import PlayerMatchesTable from "./players-matches-table";

const PlayersTable = ({ players, onClick }) => {
    return (
        <>
            <TableCreator
                data={players}
                onClick={onClick} 
                hiddenColumns={[
                    "id",
                    "fechaRegistro",
                    "partidasGanadas",
                    "partidas",
                ]}
            />
            <PlayerMatchesTable matches={players.partidas}/>
        </>
    );
};

export default PlayersTable;
