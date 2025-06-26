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

    const reloadJugador = async (jugadorId) => {
    const player = await getPlayerById(jugadorId);
    setSelectedPlayer(player);
    //console.log("desde container", player);
};

/* useEffect(() => {
        if (selectedPlayer) {
            console.log("Ahora sí, jugador seleccionado:", selectedPlayer);
        }
    }, [selectedPlayer]); */

    const onClickForMatches = async (jugadorId) => {
    //console.log("ID del jugador seleccionado:", jugadorId);
    setLoadingMatches(true);
    setError(null);

    try {
        const data = await getMatchesByPlayer(jugadorId);
        const processedData = processMatches(data);
        setMatches(processedData);
        await reloadJugador(jugadorId); // <-- Espera a que termine
        //console.log("ID del jugador recargado:", jugadorId);
        //console.log("jugador seleccionado:", selectedPlayer); // OJO: aquí selectedPlayer aún no está actualizado
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
                    data={players}
                    onClick={(id) => onClickForMatches(id)}
                    buttonVisible
                    labelButton
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
                />
            </Stack>
        </Box>
    );
};

export default PlayersContainer;
