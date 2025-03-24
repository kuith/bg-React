import UseData from "./useData.js";

const initialPlayers = () => {
    const { data: players, loading, error } = UseData("/players/");

    return { players, loading, error };
};

const initialAuthors = () => {
    const { data: authors, loading, error } = UseData("/authors/");

    return { authors, loading, error };
};

const initialGames = () => {
    const { data: games, loading, error } = UseData("/games/");

    return { games, loading, error };
};

const initialMatches = () => {
    const { data: matches, loading, error } = UseData("/matches/");

    return { matches, loading, error };
};

export { initialPlayers, initialAuthors, initialGames, initialMatches };
