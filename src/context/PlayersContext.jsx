import React, { createContext, useState, useEffect } from "react";
import { getAllPlayers } from "../api/playersService";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlayers = async () => {
        setLoading(true);
        try {
            const data = await getAllPlayers();
            setPlayers(data || []);
        } catch (error) {
            console.error("Error al cargar jugadores:", error);
            setPlayers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <PlayersContext.Provider value={{ players, loading, fetchPlayers }}>
            {children}
        </PlayersContext.Provider>
    );
};
