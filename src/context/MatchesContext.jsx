import React, { createContext, useState, useEffect } from "react";
import { getAllMatches } from "../api/matchesService";

export const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
    const [matches, setMatches] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await getAllMatches(); // Llama al servicio
                console.log("Partidas obtenidos en el contexto:", data); // Verifica los datos
                setMatches(data); // Actualiza el estado con los datos obtenidos
            } catch (error) {
                console.error("Error al cargar partidas en el contexto:", error);
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchMatches();
    }, []);

    return (
        <MatchesContext.Provider value={{ matches, loading }}>
            {children}
        </MatchesContext.Provider>
    );
};
