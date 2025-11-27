import React, { useContext } from "react";
import { AuthorsContext } from "../../context/AuthorsContext";
import GenericContainer from "../../components/common/GenericContainer";
import GameDetailCard from "../../components/games/GameDetailCard";
import { getGamesByAuthors } from "../../api/gamesService";
import { getAuthorById } from "../../api/authorsService";
import { processGames } from "../../utils/processors";

const AuthorsContainer = () => {
    const { authors, loading } = useContext(AuthorsContext);

    // Configuración con modal secundario para detalles de juegos
    const containerConfig = {
        main: {
            title: "Autores",
            entityName: "Autor", 
            label: "Juegos",
            columns: ["Nombre", "Nacionalidad"],
            onClick: async (authorId) => {
                const data = await getGamesByAuthors(authorId);
                return data;
            },
            getEntityById: getAuthorById
        },
        secondary: {
            title: (selectedAuthor) => 
                `Juegos de ${selectedAuthor?.nombre || "ningún autor seleccionado"}`,
            entityName: "Juego",
            label: "Detalles", 
            columns: ["nombre", "tipo", "descripcion"],
            processor: processGames,
            onClick: async (gameId, selectedAuthor, allSecondaryData) => {
                // Buscar en los datos que ya tenemos en lugar de hacer API call
                const gameData = allSecondaryData.find(g => g.id === gameId);
                
                if (gameData && gameData.originalGame) {
                    // Usar los datos originales que ya tenemos
                    return gameData.originalGame;
                }
                
                return null;
            }
        },
        secondaryModal: {
            title: "Detalles del juego",
            Component: GameDetailCard,
            entityProp: "game"
        }
    };

    return (
        <GenericContainer 
            mainData={authors}
            mainLoading={loading}
            config={containerConfig}
        />
    );
};

export default AuthorsContainer;
