import useData from "./useData";

/* **Partidas - matches**
|`POST`  |`/api/matches/`            |Create a match                                 |#
|`PATCH` |`/api/matches/{id}`        |Update an match by id                          |`{id}`
|`DELETE`|`/api/matches/{id}`        |Delete a match by id                           |`{id}` */

// Función para obtener todas las partidas
const useMatchesList = () => {
    const { data: matches, loading, error } = useData("/matches/");

    return { matches, loading, error };
};

// Función para obtener una partida por ID
const useMatchById = (id) => {
    const { data: match, loading, error } = useData(`/matches/id/${id}`);

    return { match, loading, error };
};

// Función para obtener partidas por fecha
const useMatchesByDate = (fecha) => {
    const { data: matches, loading, error } = useData(`/matches/date/${fecha}`);

    return { matches, loading, error };
};

// Función para obtener un ranking de ganadores
const useWinnersRanking = () => {
    const { data: winnersRanking, loading, error } = useData("/matches/winnersRanking");

    return { winnersRanking, loading, error };
};

// Función para obtener partidas por jugador
const useMatchesByPlayer = (jugadorId) => {
    const { data: matches, loading, error } = useData(`/matches/player/${jugadorId}`);

    return { matches, loading, error };
};

// Función para obtener jugadores de un juego  
const usePlayersByGame = (juegoId) => {
    const { data: players, loading, error } = useData(`/matches/playersByGame/${juegoId}`);

    return { players, loading, error };
};

//Funcion  obtener los juegos jugados por un jugador
const useGamesByPlayer = (jugadorId) => {
    const { data: games, loading, error } = useData(`/matches/gamesByPlayer/${jugadorId}`);

    return { games, loading, error };
};

//Funcion obtener los ganadores de un juego
const useWinnersByGame = (juegoId) => {
    const { data: winners, loading, error } = useData(`/matches/winnersByGame/${juegoId}`);

    return { winners, loading, error };
};


export { 
    useMatchesList,
    useMatchById,
    useMatchesByDate,
    useWinnersRanking,
    useMatchesByPlayer,
    usePlayersByGame,
    useGamesByPlayer,
    useWinnersByGame 
};

