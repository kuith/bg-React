import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";

//import { getAllPlayers } from "../../hooks/use-players.jsx";
import { PlayersContext } from "../../context/PlayersContext";
import PlayersTable from "../../components/players/players-table";
import PlayerMatchesTable from "./mainPlayers/players-matches-table";
import { getMatchesByPlayer } from "../../api/matchesService";
import { processMatches } from "../../utils/processors";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const PlayersContainer = () => {
    const { players, loading } = useContext(PlayersContext);
    const [matches, setMatches] = useState([]); // Estado para las partidas
    const [loadingMatches, setLoadingMatches] = useState(false); // Estado de carga de partidas
    const [error, setError] = useState(null); // Estado de error

    const onClickForMatches = async (jugadorId) => {
        console.log("ID del jugador seleccionado:", jugadorId);
        setLoadingMatches(true);
        setError(null);

        try {
            const data = await getMatchesByPlayer(jugadorId);
            const processedData = processMatches(data);
            setMatches(processedData);
        } catch (error) {
            setError("No se pudieron cargar las partidas.");
        } finally {
            setLoadingMatches(false);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Jugadores
                </Typography>
                <PlayersTable
                    players={players}
                    onClick={(id) => onClickForMatches(id)}
                    buttonVisible
                    labelButton
                />
                <PlayerMatchesTable
                    matches={matches}
                    loading={loadingMatches}
                    error={error}
                />
            </Stack>
        </Box>
    );
};

export default PlayersContainer;
