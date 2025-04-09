import React, { useContext } from "react";

//import { getAllPlayers } from "../../hooks/use-players.jsx";
import { PlayersContext } from "../../context/PlayersContext";
import PlayersTable from "../../components/players/players-table";


const PlayersContainer = () => {
    const { players, loading, onClick } = useContext(PlayersContext);
    console.log(players);

    function onClickForMatches() {
        console.log("Por aqui");
    }

    if (loading) return <p>Cargando...</p>;
    //if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {<PlayersTable players={players} onClick={() => onClickForMatches()}/>}
        </>
    );
};

export default PlayersContainer;
