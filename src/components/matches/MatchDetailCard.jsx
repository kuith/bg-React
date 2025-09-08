import React from "react";
import { Card, CardContent, Typography, Divider, Stack } from "@mui/material";
import { formatDate } from "../../utils/validations";

const MatchDetailCard = ({ match }) => {
    if (!match) return null;

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Detalles de la partida
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                    <Typography><b>Juego:</b> {match.juego?.nombre || match.juego || "-"}</Typography>
                    <Typography><b>Fecha:</b> {formatDate(match.fecha) || "-"}</Typography>
                    <Typography><b>Participantes:</b> {Array.isArray(match.jugadores) ? match.jugadores.map(j => j.nombre).join(", ") : match.jugadores || "-"}</Typography>
                    <Typography><b>Ganadores:</b> {Array.isArray(match.ganadores) ? match.ganadores.map(g => g.nombre).join(", ") : match.ganadores || "-"}</Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default MatchDetailCard;
