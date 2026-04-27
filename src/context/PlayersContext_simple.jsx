import React, { createContext, useState, useEffect } from "react";
import { getAllPlayers } from "../api/playersService_simple";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPlayers = async () => {
        console.log("📊 Iniciando carga de jugadores...");
        setLoading(true);
        try {
            const data = await getAllPlayers();
            console.log("✅ Jugadores cargados:", data);
            setPlayers(data || []);
        } catch (error) {
            console.error("❌ Error al cargar jugadores:", error);
            setPlayers([]);
        } finally {
            setLoading(false);
            console.log("🏁 Carga de jugadores finalizada");
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    console.log("🔄 PlayersProvider renderizado. Loading:", loading, "Players:", players.length);

    return (
        <PlayersContext.Provider value={{ players, loading, fetchPlayers }}>
            {children}
        </PlayersContext.Provider>
    );
};