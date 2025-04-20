import UseData from "./useData.old"; // Importa el hook UseData

// Función para obtener todos los jugadores
const getAllPlayers = () => {
    const { data, loading, error } = UseData("/players");
    return { data, loading, error };
};

// Función para buscar jugadores por nombre
const searchPlayersByName = (searchTerm) => {
    const { data, loading, error } = UseData("/players", {
        search: searchTerm,
    });
    return { data, loading, error };
};

// Función para buscar un jugador por ID
const getPlayerById = (id) => {
    const { data, loading, error } = UseData(`/players/${id}`);
    return { data, loading, error };
};

export { getAllPlayers, searchPlayersByName, getPlayerById };

//en componente:  const { players, loading, error } = usePlayers(search, searchById);
