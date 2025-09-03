import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { AuthorsContext } from "../../context/AuthorsContext";
import { getGamesByAuthors } from "../../api/gamesService";
import { getAuthorById } from "../../api/authorsService";
import AuthorsTable from "../../components/authors/comp-authors-table";
//import PlayerMatchesTable from "./mainPlayers/view-table-players-matches";

const AuthorsContainer = () => {
    const { authors, loading } = useContext(AuthorsContext);
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [games, setGames] = useState([]);
    const [loadingGames, setLoadingGames] = useState(false);
    const [error, setError] = useState(null);

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
            const processedData = processGames(data);
            setGames(processedData);
            await reloadAuthor(authorId); // <-- Espera a que termine
        } catch (error) {
            setError("No se pudieron cargar los juegos.");
        } finally {
            setLoadingGames(false);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Autores
                </Typography>
                {/* Puedes reemplazar Authors por una tabla si la creas */}

                <AuthorsTable
                    data={authors}
                    onClick={onClickForGames}
                    buttonVisible
                    labelButton
                />
                {/*
                <Typography variant="h5" align="center" gutterBottom>
                    Detalles de {selectedAuthor?.nombre || "ningún autor seleccionado"}
                </Typography>
                <AuthorDetails author={selectedAuthor} />
                */}
            </Stack>
        </Box>
    );
};

export default AuthorsContainer;
