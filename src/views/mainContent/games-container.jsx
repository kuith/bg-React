

import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { GamesContext } from "../../context/GamesContext";
import { processGames } from "../../utils/processors";
import GamesTable from "../../components/games/comp-games-table";
import GameDetailCard from "../../components/games/GameDetailCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getGamesById } from "../../api/gamesService";


const GamesContainer = () => {
    const { games, loading } = useContext(GamesContext);
    const [selectedGame, setSelectedGame] = useState(null);
    const [loadingGames, setLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    const gamesColumns = ["Nombre", "Tipo", "Descripcion"];
    const gamesEntity = "Juego";
    const gamesLabel = "Detalles";

    const reloadGame = async (gameId) => {
    const game = await getGamesById(gameId);
    setSelectedGame(game);
    };

    const onClickForDetails = async (gameId) => {
        setLoadingGames(true);
        setError(null);
        try {
            await reloadGame(gameId);
        } catch (error) {
            setError("No se pudieron cargar los detalles del juego.");
            console.error("Error en onClickForDetails:", error);
        } finally {
            setLoadingGames(false);
        }
    };

    const handleCloseDialog = () => {
        setSelectedGame(null);
    };


    if (loading) {
        return (
            <LoadingSpinner 
                message="Cargando juegos..." 
                size={70}
            />
        );
    }

    // Normalizar los datos para asegurar que 'descripcion' siempre está presente
    const processedGames = processGames(games);


    const gameDetailDialog = (
        <Dialog open={!!selectedGame || loadingGames} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
                Detalles del juego
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loadingGames ? (
                    <LoadingSpinner 
                        message="Cargando detalles del juego..." 
                        size={50}
                    />
                ) : (
                    <GameDetailCard game={selectedGame} />
                )}
            </DialogContent>
        </Dialog>
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Juegos
                </Typography>

                 <GamesTable
                    data={processedGames}
                    onClick={(id) => onClickForDetails(id)}
                    tableColumns={gamesColumns}
                    entityName={gamesEntity}
                    label={gamesLabel}
                />
                <Typography 
                    variant="h6" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                >
                    {selectedGame?.nombre 
                        ? `Información del juego: ${selectedGame.nombre}` 
                        : "Seleccione un juego para ver sus detalles"
                    }
                </Typography>

                {gameDetailDialog}
            </Stack>
        </Box>
    );
};

export default GamesContainer;
