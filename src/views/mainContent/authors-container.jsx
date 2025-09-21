import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { AuthorsContext } from "../../context/AuthorsContext";
import { getGamesByAuthors } from "../../api/gamesService";
import { getAuthorById } from "../../api/authorsService";
import { processGames } from "../../utils/processors";
import AuthorsTable from "../../components/authors/comp-authors-table";
import AuthorsGamesTable from "./mainAuthors/view-table-authors-games";

const AuthorsContainer = () => {
    const { authors, loading } = useContext(AuthorsContext);
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [games, setGames] = useState([]);
    const [loadingGames, setLoadingGames] = useState(false);
    const [error, setError] = useState(null);

    const authorsColumns = ["Nombre", "Nacionalidad"];
    const authorEntity = "Autor";
    const authorLabel = "Juegos";
    const gamesColumns =  ["nombre", "tipo", "descripcion"];
    const gamesEntity = "Juego";
    const gamesLabel = "Detalles";

    const reloadAuthor = async (authorId) => {
        const author = await getAuthorById(authorId);
        setSelectedAuthor(author);
    };

    const onClickForGames = async (authorId) => {
        setLoadingGames(true);
        setError(null);
        console.log("Author ID clicked:", authorId);
        try {
            const data = await getGamesByAuthors(authorId);
            console.log("Respuesta de la API getGamesByAuthors:", data);
            const processedData = processGames(data);
            console.log("Datos procesados para la tabla:", processedData);
            setGames(processedData);
            await reloadAuthor(authorId); 
        } catch (error) {
            setError("No se pudieron cargar los juegos.");
            console.error("Error en onClickForGames:", error);
        } finally {
            setLoadingGames(false);
        }
    };

    if (loading) return <p>Cargando...</p>;
    const processedGames = processGames(games);
    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Autores
                </Typography>

                <AuthorsTable
                    data={authors}
                    onClick={(id) => onClickForGames(id)}
                    tableColumns={authorsColumns}
                    entityName={authorEntity}
                    label={authorLabel}
                />
                <Typography 
                    variant="h6" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                >
                    {selectedAuthor?.nombre 
                        ? `Juegos de ${selectedAuthor.nombre}` 
                        : "Seleccione un autor para ver sus juegos"
                    }
                </Typography>
                <AuthorsGamesTable
                    games={processedGames}
                    loading={loadingGames}
                    error={error}
                    idAutor={selectedAuthor?.id || null}
                    tableColumns={gamesColumns}
                    entityName={gamesEntity}
                    label={gamesLabel}
                />
            </Stack>
        </Box>
    );
};

export default AuthorsContainer;
