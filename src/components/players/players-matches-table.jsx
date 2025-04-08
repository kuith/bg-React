import React from "react";
import TableCreator from "../../utils/table-creator";

const PlayersMatchesTable = ({ matches, onClick }) => {
    return (
        <TableCreator data={matches} hiddenColumns={['id']} onClick={onClick} />
    );
};

export default PlayersMatchesTable;