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

const PlayersTable = ({ data, onClick }) => {
    const columns = ["Nombre", "correo", "rol"];
    const rows = data.map((row, index) => (
        <TableRow key={row.id || `row-${index}`}>
            <TableCell colSpan={4} sx={{ padding: 0 }}>
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{
                        padding: 1,
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        gap: { xs: 1, md: 0 },
                    }}
                >
                    {columns.map((item, index) => (
                        <TablaBox
                            key={index}
                            label={item}
                            value={row[item.toLowerCase()]}
                        />
                    ))}

                    <TablaButton
                        label="Partidas"
                        value={row.id}
                        onClick={onClick}
                    />
                </Box>
            </TableCell>
        </TableRow>
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
