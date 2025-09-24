import React, { createContext, useState, useEffect } from "react";
import { getAllAuthors } from "../api/authorsService";

export const AuthorsContext = createContext();

export const AuthorsProvider = ({ children }) => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const data = await getAllAuthors();
            setAuthors(data || []);
        } catch (error) {
            console.error(
                "Error al cargar autores en el contexto:",
                error
            );
            setAuthors([]);
        } finally {
            setLoading(false);
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
