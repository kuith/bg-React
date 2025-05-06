import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";

//import { getAllPlayers } from "../../hooks/use-players.jsx";
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
    const [selectedPlayer, setSelectedPlayer] = useState([]);

    /* const reloadParciales = () => {
        const parciales = dataStorage.getParciales();
        setParciales(parciales);
    }; */
    const reloadJugador = (jugadorId) => {
        const player = getPlayerById(jugadorId);
        setSelectedPlayer(player);
        console.log("desde container", selectedPlayer);
    };

    const onClickForMatches = async (jugadorId) => {
        console.log("ID del jugador seleccionado:", jugadorId);
        setLoadingMatches(true);
        setError(null);

        try {
            const data = await getMatchesByPlayer(jugadorId);
            const processedData = processMatches(data);
            setMatches(processedData);
            reloadJugador(jugadorId);


        } catch (error) {
            setError("No se pudieron cargar las partidas.");
        } finally {
            setLoadingMatches(false);
        }

        /* try {
            // Obtener los datos del jugador
            const player = await getPlayerById(jugadorId);
            if (player) {
                console.log("Datos del jugador obtenidos:", player);
                setSelectedPlayer(player);
            } else {
                console.error("Jugador no encontrado");
                setError("Jugador no encontrado");
            }
            } catch (error) {
                console.error("Error al obtener el jugador:", error);
                setError("No se pudo cargar el jugador.");
            }*/
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
                    {selectedPlayer?.name || "ningún jugador seleccionado"}
                </Typography>
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
