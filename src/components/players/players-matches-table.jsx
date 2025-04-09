import React from "react";
import TableCreator from "../../utils/table-creator";

const PlayersMatchesTable = ({ matches}) => {
    return (
        <TableCreator data={matches} hiddenColumns={['id']} />
    );
};

export default PlayersMatchesTable;