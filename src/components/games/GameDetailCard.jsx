import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const labelMap = {
    nombre: "Nombre",
    baseExpansion: "Base/Expansión",
    juegoBase: "Juego Base",
    tipo: "Tipo",
    anioPublicacion: "Año de Publicación",
    descripcion: "Descripción",
    minJugadores: "Mín. Jugadores",
    maxJugadores: "Máx. Jugadores",
    precio: "Precio",
    dispAutoma: "Disp. Automa",
    autores: "Autores",
    editorialMadre: "Editorial Madre",
    editorialLocal: "Editorial Local"
};

const GameDetailCard = ({ game }) => {
    if (!game || Object.keys(game).length === 0) {
        return <Typography variant="body1">No hay detalles para mostrar.</Typography>;
    }
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Detalles del juego
            </Typography>
            <Stack spacing={1}>
                {Object.entries(labelMap).map(([key, label]) =>
                    game[key] !== undefined && game[key] !== null ? (
                        <Box key={key} display="flex" gap={2}>
                            <Typography variant="subtitle2" sx={{ minWidth: 160 }}>
                                {label}:
                            </Typography>
                            <Typography variant="body1">
                                {key === "autores"
                                    ? Array.isArray(game[key])
                                        ? game[key].map(a => a.nombre).join(", ")
                                        : String(game[key])
                                    : key === "dispAutoma"
                                        ? game[key] === true
                                            ? "Sí"
                                            : game[key] === false
                                                ? "No"
                                                : ""
                                        : String(game[key])}
                            </Typography>
                        </Box>
                    ) : null
                )}
            </Stack>
        </Paper>
    );
};

export default GameDetailCard;
