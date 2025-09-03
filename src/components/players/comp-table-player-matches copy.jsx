import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablaBox from "../../utils/Pieces/tabla-box";
import TablaRow from "../../utils/Pieces/tabla-row";
import { Box, Container } from "@mui/material";


const TablePlayerMatches = ({ data }) => {
    const columns = ["Juego", "Participantes", "Ganadores"];

    const rows = data.map((row, index) => (
        <TablaRow columns = {columns} row={row} index = {index} key={row.id || `row-${index}`} />
    ));

    const totalTable = (
        <Container>
            <TableContainer
                component={Paper}
                sx={{
                    overflowX: "auto",
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="Listado de partidas">
                    <TableBody>{rows}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

    return <>{totalTable}</>;
};

export default TablePlayerMatches;
