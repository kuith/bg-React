import React from "react";
import CompTableAuthorsGames from "../../../components/authors/comp-table-author-games";
import LoadingSpinner from "../../../components/common/LoadingSpinner";


const AuthorsGamesTable = ({ games, loading, error, tableColumns }) => {
    if (loading) {
        return (
            <LoadingSpinner 
                message="Cargando juegos del autor..." 
                size={50}
            />
        );
    }
    
    if (error) return <p>Error: {error}</p>;
    if (!games || games.length === 0)
        return <p>No hay juegos disponibles.</p>;

    return <CompTableAuthorsGames data={games} tableColumns={tableColumns} />;
};

export default AuthorsGamesTable;
