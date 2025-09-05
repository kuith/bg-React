import React from "react";
import CompTableAuthorsGames from "../../../components/authors/comp-table-author-games";


const AuthorsGamesTable = ({ games, loading, error, tableColumns }) => {
    if (loading) return <p>Cargando Juegos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!games || games.length === 0)
        return <p>No hay juegos disponibles.</p>;

    return <CompTableAuthorsGames data={games} tableColumns={tableColumns} />;
};

export default AuthorsGamesTable;
