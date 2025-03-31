import React, { createContext, useState, useEffect } from "react";
import { getAllGames } from "../api/gamesService";

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getAllGames(); // Llama al servicio
                console.log("Juegos obtenidos en el contexto:", data); // Verifica los datos
                setGames(data); // Actualiza el estado con los datos obtenidos
            } catch (error) {
                console.error(
                    "Error al cargar juegos en el contexto:",
                    error
                );
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchGames();
    }, []);

    return (
        <GamesContext.Provider value={{ games, loading }}>
            {children}
        </GamesContext.Provider>
    );
};
