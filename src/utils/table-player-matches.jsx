import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TablePlayerMatches = ({data}) => {

    const rows = data.map((row, index) => (
        <TableRow key={row.id || `row-${index}`}>
            <TableCell>{row.juego}</TableCell>
            <TableCell>{row.participantes}</TableCell>
            <TableCell>{row.ganadores}</TableCell>
        </TableRow>
    ));

    return (
        <TableContainer component={Paper}>  
            <Table sx={{ minWidth: 650 }} aria-label="PArtidas del jugador">
                <TableHead>
                    <TableRow>
                        <TableCell>Juego</TableCell>
                        <TableCell>Participantes</TableCell>
                        <TableCell>Ganadores</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TablePlayerMatches;
