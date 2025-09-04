import React, { useContext, useState, useEffect } from "react";
//import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import DashAuthors from "../dashboard/dash-authors/dash-authors";
import DashGames from "../dashboard/dash-games/dash-games";
import DashMatches from "../dashboard/dash-matches/dash-matches";
import DashPlayers from "../dashboard/dash-players/dash-players";


import { getPlayerById } from "../../api/playersService";
import { PlayersContext } from "../../context/PlayersContext";
import { createPlayer } from "../../api/playersService";
import { deletePlayer } from "../../api/playersService";
import { updatePlayer } from "../../api/playersService";

const DashboardContainer = () => {
    const { players, fetchPlayers } = useContext(PlayersContext);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [errorMsg, setErrorMsg] = useState("");


    const reloadJugador = async (jugadorId) => {
        const player = await getPlayerById(jugadorId);
        setSelectedPlayer(player);
    };

    const onClickDeletePlayer = async (jugadorId) => {
        console.log("Eliminar jugador con ID:", jugadorId);
        try {
            await deletePlayer(jugadorId);
            alert("Jugador eliminado con éxito");
            await fetchPlayers();
        } catch (error) {
            alert(error.message || "Error al eliminar jugador");
        }
    };

    const onClickUpdatePlayer = async (jugadorId) => {
        console.log("Actualizar jugador con ID:", jugadorId);
        try {
            const player = await getPlayerById(jugadorId);
            setSelectedPlayer(player);
            //console.log("SelectedPlayer:", player);
        } catch (error) {
            alert(error.message || "Error al actualizar jugador");
        }
    };

/*     const handleNewPlayer = async (dataPlayer) => {
        console.log("Crear nuevo jugador", dataPlayer);
        try {
            await createPlayer(dataPlayer);
            console.log("Creado con exito");
            await fetchPlayers();
        } catch (error) {
            alert(error.message || "Error al crear jugador");
        }
    }; */

    const handleSavePlayer = async (dataPlayer) => {
        try {
            if (dataPlayer.id) {
                await updatePlayer(dataPlayer.id, dataPlayer);
                alert("Jugador actualizado con éxito");
            } else {
                await createPlayer(dataPlayer);
                alert("Jugador creado con éxito");
            }
            setErrorMsg("");
            setSelectedPlayer(null);
            await fetchPlayers();
        } catch (error) {
            setErrorMsg(error.message || "Error al guardar jugador");
        }
    };

    const dashPlayersTag = (
        <DashPlayers 
            data={players}
            onClickDeletePlayer={onClickDeletePlayer}
            onClickUpdatePlayer={onClickUpdatePlayer}
            handleSavePlayer={handleSavePlayer}
            errorMsg={errorMsg}
            selectedPlayer={selectedPlayer}
        />
    );

    return (
        <>
            <CssBaseline />
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid size={12}>
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Administración
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Paper>
                            {dashPlayersTag}
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper>
                            <DashAuthors />
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper>
                            <DashGames />
                        </Paper>
                    </Grid>
                    <Grid size={12}>
                        <Paper>
                            <DashMatches />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default DashboardContainer;