import useData from "./useData";

/* |`POST`  |`/api/players/`        |Create a player                                 |#
|`DELETE`|`/api/players/{id}`       |Delete a player by id                           |`{id}`
|`PATCH` |`/api/players/{id}`       |Update a player by id                           |`{id, data to update}` */

// Función para obtener todos los jugadores
const usePlayersList = () => {
    const { data: players, loading, error } = useData("/players/");

    return { players, loading, error };
};

// Función para obtener un jugador por ID
const usePlayerById = (id) => {
    const { data: player, loading, error } = useData(`/players/${id}`);

    return { player, loading, error };
};

// Función para obtener jugadores por rol
const usePlayersByRol = (rol) => {
    const { data: players, loading, error } = useData(`/players/rol/${rol}`);

    return { players, loading, error };
};

const usePlayerByName = (name) => {
    const { data: player, loading, error } = useData(`/players/name/${name}`);
    return { player, loading, error };
};

export { usePlayersList, usePlayerById, usePlayersByRol, usePlayerByName };
