import { api } from "../api/api";
import { isLocalMode } from "../config/appConfig";
import * as localService from "../services/authorsLocalService";

export const getAllAuthors = async () => {
    if (isLocalMode()) {
        return await localService.getAllAuthors();
    }
    
    try {
        const response = await api.get("/authors/");
        const data = Array.isArray(response.data) ? response.data : response;
        return data;
    } catch (error) {
        console.error("Error al obtener autores:", error);
    }
}

export const getAuthorById = async (id) => {
    if (isLocalMode()) {
        return await localService.getAuthorById(id);
    }
    
    try {
        const response = await api.get(`/authors/id/${id}`);
        // Si la API ya devuelve el objeto autor, simplemente retorna response
        return response;
    } catch (error) {
        console.error("Error al obtener autor por id:", error);
    }
};

export const searchAuthorsByName = async (name) => {
    if (isLocalMode()) {
        const authors = await localService.getAllAuthors();
        return authors.filter(author => 
            author.nombre.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    try {
        const response = await api.get("/authors/name/", { params: { search: name } });
        return response.data;
    } catch (error) {
        console.error("Error al buscar autores por nombre:", error);
    }    
};

export const searchAuthorsByNationality = async (nacionalidad) => {
    if (isLocalMode()) {
        const authors = await localService.getAllAuthors();
        return authors.filter(author => 
            author.nacionalidad.toLowerCase().includes(nacionalidad.toLowerCase())
        );
    }
    
    try {
        const response = await api.get("/authors/nationality/", {
            params: { search: nacionalidad },
        });
        return response.data;
    } catch (error) {
        console.error("Error al buscar autores por nacionalidad:", error);
    }
};

export const createAuthor = async (authorData) => {
    if (isLocalMode()) {
        return await localService.createAuthor(authorData);
    }
    return api.post("/authors/", authorData);
};

export const updateAuthor = async (id, authorData) => {
    if (isLocalMode()) {
        return await localService.updateAuthor(id, authorData);
    }
    return api.patch(`/authors/${id}`, authorData);
};

export const deleteAuthor = async (id) => {
    if (isLocalMode()) {
        return await localService.deleteAuthor(id);
    }
    return api.del(`/authors/${id}`);
};