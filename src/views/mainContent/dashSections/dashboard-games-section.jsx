import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { GamesContext } from "../../../context/GamesContext";
import { AuthorsContext } from "../../../context/AuthorsContext";
import { getGamesById, createGame, deleteGames, updateGame } from "../../../api/gamesService";
import { ActualDate } from "../../../utils/validations";
import DashGames from "../../dashboard/dash-games/dash-games";
import { processGames } from "../../../utils/processors";

const DashboardGamesSection = () => {
    const { games, fetchGames } = useContext(GamesContext);
    const { authors } = useContext(AuthorsContext);
    const [selectedGame, setSelectedGame] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    const reload = async (gameId) => {
        const game = await getGamesById(gameId);
        setSelectedGame(game);
    };

    const onClickDeleteGame = async (gameId) => {
        console.log("Eliminar juego con ID:", gameId);
        try {
            await deleteGames(gameId);
            alert("Juego eliminado con éxito");
            await fetchGames();
        } catch (error) {
            alert(error.message || "Error al eliminar juego");
        }
    };

    const onClickUpdateGame = async (gameId) => {
        console.log("Actualizar juego con ID:", gameId);
        try {
            const game = await getGamesById(gameId);
            setSelectedGame(game);
        } catch (error) {
            alert(error.message || "Error al actualizar juego");
        }
    };

    const handleSaveGame = async (dataGame) => {
        try {
            // Si es alta, añade fecha_registro si no existe
            if (!dataGame.id && !dataGame.fecha_registro) {
                dataGame.fecha_registro = ActualDate();
            }
            // Si es edición, conserva la fecha_registro original si existe
            if (dataGame.id && !dataGame.fecha_registro && selectedGame?.fecha_registro) {
                dataGame.fecha_registro = selectedGame.fecha_registro;
            }

            if (Array.isArray(dataGame.autores)) {
                dataGame.autores = dataGame.autores.map(a => a.id ?? a);
            }
            console.log('DATA GAME AL GUARDAR:', dataGame);
            if (dataGame.id) {
                await updateGame(dataGame.id, dataGame);
                alert("Juego actualizado con éxito");
            } else {
                await createGame(dataGame);
                alert("Juego creado con éxito");
            }

            setErrorMsg("");
            setSelectedGame(null);
            await fetchGames();
        } catch (error) {
            setErrorMsg(error.message || "Error al guardar juego");
        }
    };

    // Log para depuración: ver cómo llegan los juegos desde el backend
    console.log('Juegos en dashboard-games-section:', games);
    return (
        <Paper>
            <DashGames
                data={processGames(games)}
                originalGame={games}
                authors={authors}
                onClickDeleteGame={onClickDeleteGame}
                onClickUpdateGame={onClickUpdateGame}
                handleSaveGame={handleSaveGame}
                errorMsg={errorMsg}
                selectedGame={selectedGame}
            />
        </Paper>
    );
};

export default DashboardGamesSection;
