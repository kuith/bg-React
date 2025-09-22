import React, { createContext, useState, useEffect } from "react";
import { getAllGames } from "../api/gamesService";

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    const fetchGames = async () => {
        setLoading(true);
        try {
            const data = await getAllGames();
            setGames(data || []);
        } catch (error) {
            console.error("Error al cargar juegos en el contexto:", error);
            setGames([]);
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
