import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container } from "@mui/material";
import TablaBox from "../../utils/Pieces/tabla-box";
import TablaButton from "../../utils/Pieces/tabla-button";
import TablaRow from "../../utils/Pieces/tabla-row";

const PlayersTable = ({ data, onClick }) => {
    const columns = ["Nombre", "correo", "rol"];
    const labelButton = "Partidas";
    const rows = data.map((row, index) => (

        <TablaRow columns={columns} row={row} index={index} labelButon={labelButton} onClick={onClick} key={row.id || `row-${index}`} />
    ));

    const totalTable = (
        <Container>
            <TableContainer
                component={Paper}
                sx={{
                    overflowX: "auto",
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="Listado de jugadores">
                    <TableBody>{rows}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

    return <>{totalTable}</>;
};

export default PlayersTable;
