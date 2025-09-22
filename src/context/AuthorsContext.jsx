import React, { createContext, useState, useEffect } from "react";
import { getAllAuthors } from "../api/authorsService";

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [authors, setAuthors] = useState([]); // Estado inicial vacío
    const [loading, setLoading] = useState(true); // Estado de carga

    // Definir fetchAuthors fuera del useEffect para exponerlo
    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const data = await getAllAuthors(); // Llama al servicio
            setAuthors(data || []); // Actualiza el estado con los datos obtenidos
        } catch (error) {
            console.error(
                "Error al cargar autores en el contexto:",
                error
            );
            setAuthors([]);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <AuthorsContext.Provider value={{ authors, loading, fetchAuthors }}>
            {children}
        </AuthorsContext.Provider>
    );
};
