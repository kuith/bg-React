import React from "react";
import TableCreator from "../../utils/table-creator";

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
                buttonVisible
                labelButton={"Ver Partidas"}
            />

        </>
    );
};

export default PlayersTable;
