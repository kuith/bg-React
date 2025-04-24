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
                    flexDirection={{ xs: "column", md: "row" }} // Cambia a columna en pantallas <= 600px
                    justifyContent="space-evenly" // Distribuye los elementos uniformemente
                    alignItems="center" // Alinea verticalmente
                    sx={{
                        padding: 1, // Reduce el relleno interno
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        gap: { xs: 1, md: 0 }, // Espaciado entre elementos
                    }}
                >
                    {/* Caja para Nombre */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: "0", // Permite que el contenido se ajuste
                            marginBottom: { xs: 1, md: 0 },
                            textAlign: { xs: "center", md: "left" },
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
                            minWidth: "0", // Permite que el contenido se ajuste
                            marginBottom: { xs: 1, md: 0 },
                            textAlign: { xs: "center", md: "left" },
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
                            minWidth: "0", // Permite que el contenido se ajuste
                            marginBottom: { xs: 1, md: 0 },
                            textAlign: { xs: "center", md: "right" }, // Centrado en pantallas pequeñas, alineado a la derecha en grandes
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
                            minWidth: "0", // Permite que el contenido se ajuste
                            textAlign: { xs: "center", md: "right" },
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
                                }, // Tamaño de fuente reducido
                                padding: {
                                    xs: "2px 4px",
                                    sm: "3px 6px",
                                    md: "4px 8px",
                                }, // Relleno interno reducido
                                maxWidth: "100px", // Limita el ancho máximo del botón
                                width: "100%", // Asegura que el botón se ajuste al contenedor
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
