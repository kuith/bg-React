import React from "react";
import { usePlayersList } from "../../hooks/players-data";
import PlayersTable from "../../components/players/players-table";

const PlayersContainer = () => {
    const { players, loading, error } = usePlayersList(); // Usamos el hook aquí

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <PlayersTable players={players} />; // Pasamos los jugadores a Players como props
};

export default PlayersContainer;
