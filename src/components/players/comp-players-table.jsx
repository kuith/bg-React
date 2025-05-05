import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography, Box, Container } from "@mui/material";

const PlayersTable = ({ data, onClick }) => {
    
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

                    {/* Caja para Nombre */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: "0",
                            marginBottom: { xs: 1, md: 0 },
                            textAlign: { xs: "center", md: "center" },
                        }}
                    >
                        <Typography variant="body1">
                            <strong>Nombre:</strong> {row.nombre}
                        </Typography>
                    </Box>

                    {/* Caja para Correo */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: "0",
                            marginBottom: { xs: 1, md: 0 },
                            textAlign: { xs: "center", md: "center" },
                        }}
                    >
                        <Typography variant="body1">
                            <strong>Correo:</strong> {row.correo}
                        </Typography>
                    </Box>

                    {/* Caja para Rol */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: "0",
                            marginBottom: { xs: 1, md: 0 },
                            textAlign: { xs: "center", md: "center" },
                        }}
                    >
                        <Typography variant="body1">
                            <strong>Rol:</strong> {row.rol}
                        </Typography>
                    </Box>

                    {/* Caja para el Botón */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: "0",
                            textAlign: { xs: "center", md: "center" },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => onClick(row.id)}
                            sx={{
                                fontSize: {
                                    xs: "0.6rem",
                                    sm: "0.7rem",
                                    md: "0.7rem",
                                },
                                padding: {
                                    xs: "2px 4px",
                                    sm: "3px 6px",
                                    md: "4px 8px",
                                },
                                maxWidth: "100px",
                                width: "100%",
                            }}
                        >
                            Partidas
                        </Button>
                    </Box>
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
