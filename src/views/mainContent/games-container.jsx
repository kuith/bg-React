import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { GamesContext } from "../../context/GamesContext";
import GamesTable from "../../components/games/comp-games-table";
import GameDetailCard from "../../components/games/GameDetailCard";
import { getGamesById } from "../../api/gamesService";


const GamesContainer = () => {
    const { games, loading } = useContext(GamesContext);
    const [selectedGame, setSelectedGame] = useState();
    const [loadingGames, setLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    const gamesColumns = ["Nombre", "Tipo", "Descripción"];
    const gamesEntity = "Juego";
    const gamesLabel = "Detalles";
    const detallesColumns =  [
                            "nombre", 
                            "baseExpansion", 
                            "juegoBase", 
                            "tipo", 
                            "anioPublicacion", 
                            "descripcion", 
                            "minJugadores", 
                            "maxJugadores", 
                            "precio", 
                            "dispAutoma", 
                            "autores", 
                            "editorialMadre", 
                            "editorialLocal"
                        ];
    const detallesEntity = "Juego";
    const detallesLabel = "Detalles";


    const reloadGame = async (gameId) => {
        const game = await getGamesById(gameId);
        console.log("Valor retornado por getGamesById:", game);
        setSelectedGame(game);
    };

    const onClickForDetails = async (gameId) => {
        setLoadingGames(true);
        setError(null);
        console.log("Game ID clicked:", gameId);
        try {
            await reloadGame(gameId); 
        } catch (error) {
            setError("No se pudieron cargar los detalles del juego.");
            console.error("Error en onClickForDetails:", error);
        } finally {
            setLoadingGames(false);
        }

    };

    if (loading) return <p>Cargando...</p>;

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Juegos
                </Typography>

                 <GamesTable
                    data={games}
                    onClick={(id) => onClickForDetails(id)}
                    tableColumns={gamesColumns}
                    entityName={gamesEntity}
                    label={gamesLabel}
                />
                <Typography variant="h5" align="center" gutterBottom>
                    Juegos de {" "}
                    {selectedGame?.nombre || "ningún juego seleccionado"}
                </Typography>

                <GameDetailCard game={selectedGame} />
            </Stack>
        </Box>
    );
};

export default GamesContainer;
