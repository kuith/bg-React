import React, { useContext } from "react";

//import { getAllPlayers } from "../../hooks/use-players.jsx";
import { PlayersContext } from "../../context/PlayersContext";
import PlayersTable from "../../components/players/players-table";


const PlayersContainer = () => {
    const { players, loading } = useContext(PlayersContext);
    console.log(players);

    if (loading) return <p>Cargando...</p>;
    //if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {<PlayersTable players={players} />}
        </>
    );
};

export default PlayersContainer;
