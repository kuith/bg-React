import { useState, useEffect } from "react";
import { api } from "../api/api"; // Asegúrate de que esta ruta sea correcta

const UseData = (endpoint, params = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get(endpoint, { params });
                setData(result.data); // Suponiendo que el resultado tiene un `.data`
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, JSON.stringify(params)]); // JSON.stringify asegura que los objetos se comparen correctamente

    return { data, loading, error };
};

export default UseData;

/*
/////////////////////para usarlo sin parámetros:
const usePlayers = () => {
    const { data: players, loading, error } = UseData("/players");
    return { players, loading, error };
};
//////////////////////para usarlo con parámetros:
const usePlayers = (searchTerm = "") => {
    const { data: players, loading, error } = UseData("/players", searchTerm ? { search: searchTerm } : {});
    return { players, loading, error };
};
//////////////////////////////uso en un compnente:
import React, { useState } from "react";
import usePlayers from "../hooks/usePlayers";

const Players = () => {
    const [search, setSearch] = useState("");
    const { players, loading, error } = usePlayers(search);

    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar jugador..." 
                onChange={(e) => setSearch(e.target.value)} 
            />
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul>
                {players?.map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Players;

*/
 