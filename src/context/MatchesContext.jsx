import React, { createContext, useState, useEffect } from "react";
import { getAllMatches } from "../api/matchesService";

export const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
    const [matches, setMatches] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    const fetchMatches = async () => {
        try {
            const data = await getAllMatches();
            console.log("Partidas obtenidas en el contexto:", data);
            setMatches(data);
        } catch (error) {
            console.error("Error al cargar partidas en el contexto:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <MatchesContext.Provider value={{ matches, loading, fetchMatches }}>
            {children}
        </MatchesContext.Provider>
    );
};
