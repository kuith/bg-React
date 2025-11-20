import React, { useContext } from "react";
import { AuthorsContext } from "../../context/AuthorsContext";
import GenericContainer from "../../components/common/GenericContainer";
import { getGamesByAuthors } from "../../api/gamesService";
import { getAuthorById } from "../../api/authorsService";
import { processGames } from "../../utils/processors";

const AuthorsContainer = () => {
    const { authors, loading } = useContext(AuthorsContext);

    // Configuración SIMPLIFICADA - Una sola tabla genérica para todo
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
            processor: processGames
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
