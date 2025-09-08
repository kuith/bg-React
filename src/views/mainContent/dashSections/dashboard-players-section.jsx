import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { PlayersContext } from "../../../context/PlayersContext";
import { getPlayerById, createPlayer, deletePlayer, updatePlayer } from "../../../api/playersService";
import { ActualDate } from "../../../utils/validations";
import DashPlayers from "../../dashboard/dash-players/dash-players";

const DashboardPlayersSection = () => {
    const { players, fetchPlayers } = useContext(PlayersContext);
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
        } catch (error) {
            alert(error.message || "Error al actualizar jugador");
        }
    };

    const handleSavePlayer = async (dataPlayer) => {
        try {
            // Si es alta, añade fecha_registro si no existe
            if (!dataPlayer.id && !dataPlayer.fecha_registro) {
                dataPlayer.fecha_registro = ActualDate();
            }
            // Si es edición, conserva la fecha_registro original si existe
            if (dataPlayer.id && !dataPlayer.fecha_registro && selectedPlayer?.fecha_registro) {
                dataPlayer.fecha_registro = selectedPlayer.fecha_registro;
            }
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

    return (
        <Paper>
            <DashPlayers
                data={players}
                onClickDeletePlayer={onClickDeletePlayer}
                onClickUpdatePlayer={onClickUpdatePlayer}
                handleSavePlayer={handleSavePlayer}
                errorMsg={errorMsg}
                selectedPlayer={selectedPlayer}
            />
        </Paper>
    );
};

export default DashboardPlayersSection;
