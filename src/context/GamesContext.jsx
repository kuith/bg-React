import React, { createContext, useState, useEffect } from "react";
import { getAllGames } from "../api/gamesService";

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    const fetchGames = async () => {
        try {
            const data = await getAllGames();
            console.log("Juegos obtenidos en el contexto:", data);
            setGames(data);
        } catch (error) {
            console.error("Error al cargar juegos en el contexto:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <GamesContext.Provider value={{ games, loading, fetchGames }}>
            {children}
        </GamesContext.Provider>
    );
};
