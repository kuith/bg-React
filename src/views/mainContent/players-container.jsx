import React from "react";

//import { getAllPlayers } from "../../hooks/use-players.jsx";
import PlayersTable from "../../components/players/players-table";
import {getPlayers} from "../../api/playersService";

const PlayersContainer = () => {
    const players = getPlayers();
    console.log(players);

    //if (loading) return <p>Cargando...</p>;
    //if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {/* <PlayersTable players={players} /> */}
            <h1>Players</h1>
        </>
    );
};

export default PlayersContainer;

