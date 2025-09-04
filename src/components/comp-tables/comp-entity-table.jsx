import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";
import TablaRow from "../../utils/Pieces/tabla-row";

const CompEntityTable = ({ data, onClick, tableColumns, entityName, label }) => {
    const rows = data.map((row, index) => (

        <TablaRow 
            columns={tableColumns} 
            row={row} 
            index={index} 
            labelButon={label} 
            onClick={onClick} 
            key={row.id || `row-${index}`} 
        />
    ));

    const totalTable = (
        <Container>
            <TableContainer
                component={Paper}
                sx={{
                    overflowX: "auto",
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label={`Listado de ${entityName}`}>
                    <TableBody>{rows}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

    return <>{totalTable}</>;
};

export default CompEntityTable;
