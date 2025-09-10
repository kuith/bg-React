import { api } from "../api/api";

export const getAllAuthors = async () => {
    try {
        const response = await api.get("/authors/");
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener autores:", error);
    }
}

export const getAuthorById = async (id) => {
    try {
        const response = await api.get(`/authors/id/${id}`);
        // Si la API ya devuelve el objeto autor, simplemente retorna response
        return response;
    } catch (error) {
        console.error("Error al obtener autor por id:", error);
    }
};

export const searchAuthorsByName = async (name) => {
    try {
        const response = await api.get("/authors/name/", { params: { search: name } });
        return response.data;
    } catch (error) {
        console.error("Error al buscar autores por nombre:", error);
    }    
};

export const searchAuthorsByNationality = async (nacionalidad) => {
    try {
        const response = await api.get("/authors/nationality/", {
            params: { search: nacionalidad },
        });
        return response.data;
    } catch (error) {
        console.error("Error al buscar autores por nombre:", error);
    }
};

export const createAuthor = (authorData) => api.post("/authors/", authorData);
export const updateAuthor = (id, authorData) => api.patch(`/authors/${id}`, authorData);
export const deleteAuthor = (id) => api.del(`/authors/${id}`);