import React, { createContext, useState, useEffect } from "react";
import { getAllPlayers } from "../api/playersService";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers(); // Llama al servicio
                console.log("Jugadores obtenidos en el contexto:", data); // Verifica los datos
                setPlayers(data); // Actualiza el estado con los datos obtenidos
            } catch (error) {
                console.error(
                    "Error al cargar jugadores en el contexto:",
                    error
                );
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchPlayers();
    }, []);

    return (
        <PlayersContext.Provider value={{ players, loading }}>
            {children}
        </PlayersContext.Provider>
    );
};
