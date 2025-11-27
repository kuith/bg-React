
import React, { useContext } from "react";
import { GamesContext } from "../../context/GamesContext";
import GenericContainer from "../../components/common/GenericContainer";
import GameDetailCard from "../../components/games/GameDetailCard";
import { processGames } from "../../utils/processors";
import { getGamesById } from "../../api/gamesService";

const GamesContainer = () => {
    const { games, loading } = useContext(GamesContext);

    // Configuración para GenericContainer con modal
    const containerConfig = {
        main: {
            title: "Juegos",
            entityName: "Juego",
            label: "Detalles",
            columns: ["Nombre", "Tipo", "Descripcion"],
            onClick: async (gameId) => {
                const game = await getGamesById(gameId);
                return game;
            }
        },
        secondary: {
            type: "modal"
        },
        modal: {
            title: "Detalles del juego",
            Component: GameDetailCard,
            entityProp: "game"
        }
    };

    return (
        <GenericContainer 
            mainData={processGames(games)}
            mainLoading={loading}
            config={containerConfig}
        />
    );
};

export default GamesContainer;
