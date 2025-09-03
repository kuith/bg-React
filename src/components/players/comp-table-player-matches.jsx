import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TablaRow from "../../utils/Pieces/tabla-row";
import CompEntityTable from "../comp-tables/comp-entity-table";



const TablePlayerMatches = ({ data, onClick, tableColumns, entityName, label }) => {
    return <CompEntityTable 
        data={data} 
        onClick={onClick} 
        tableColumns={tableColumns} 
        entityName={entityName} 
        label={label}
        
    />;
};

export default TablePlayerMatches;
