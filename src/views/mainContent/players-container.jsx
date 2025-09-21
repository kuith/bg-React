import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import { PlayersContext } from "../../context/PlayersContext";
import PlayersTable from "../../components/players/comp-players-table";
import PlayerMatchesTable from "./mainPlayers/view-table-players-matches";
import { getMatchesByPlayer } from "../../api/matchesService";
import { processMatches } from "../../utils/processors";
import { getPlayerById } from "../../api/playersService";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const PlayersContainer = () => {
    const { players, loading } = useContext(PlayersContext);
    const [matches, setMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState();

    const playerColumns = ["Nombre", "Correo", "Rol"];
    const playerEntity = "Jugador";
    const playerLabel = "Partidas";
    const matchesColumns =  ["Juego", "Jugadores", "Ganadores"];
    const matchesEntity = "Partida";
    const matchesLabel = "Detalles";

    const reloadJugador = async (jugadorId) => {
        const player = await getPlayerById(jugadorId);
        setSelectedPlayer(player);
    };

    const onClickForMatches = async (jugadorId) => {
        setLoadingMatches(true);
        setError(null);

        try {
            const data = await getMatchesByPlayer(jugadorId);
            const processedData = processMatches(data);
            setMatches(processedData);
            await reloadJugador(jugadorId); // <-- Espera a que termine
        } catch (error) {
            setError("No se pudieron cargar las partidas.");
        } finally {
            setLoadingMatches(false);
        }
    };

    // (revert) Sin auto-carga desde navegación

    if (loading) return <p>Cargando...</p>;

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Jugadores
                </Typography>
                <PlayersTable
                    data={players}
                    onClick={(id) => onClickForMatches(id)}
                    tableColumns={playerColumns}
                    entityName={playerEntity}
                    label={playerLabel}
                />
                <Typography variant="h5" align="center" gutterBottom>
                    Partidas de{" "}
                    {selectedPlayer?.nombre || "ningún jugador seleccionado"}
                </Typography>
                <PlayerMatchesTable
                    matches={matches}
                    loading={loadingMatches}
                    error={error}
                    idJugador ={selectedPlayer?.id || null}
                    tableColumns={matchesColumns}
                    entityName={matchesEntity}
                    label={matchesLabel}
                />
            </Stack>
        </Box>
    );
};

export default PlayersContainer;
