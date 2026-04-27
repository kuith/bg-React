import { LocalStorageService, STORAGE_KEYS } from './localStorageService';
import { mockAuthors } from '../data/mockAuthors';

// Servicio local para authors
const authorsLocalService = new LocalStorageService(STORAGE_KEYS.AUTHORS, mockAuthors);

// Obtener todos los autores
export const getAllAuthors = async () => {
  try {
    const authors = await authorsLocalService.getAll();
    return authors;
  } catch (error) {
    console.error("Error al obtener autores:", error);
    return [];
  }
};

// Buscar un autor por ID
export const getAuthorById = async (id) => {
  try {
    const author = await authorsLocalService.getById(id);
    if (author) {
      return author;
    } else {
      throw new Error("Autor no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener autor por id:", error);
    return null;
  }
};

// Crear un nuevo autor
export const createAuthor = async (authorData) => {
  try {
    const newAuthor = await authorsLocalService.create(authorData);
    return newAuthor;
  } catch (error) {
    console.error("Error al crear autor:", error);
    throw error;
  }
};

// Actualizar un autor existente
export const updateAuthor = async (id, authorData) => {
  try {
    const updatedAuthor = await authorsLocalService.update(id, authorData);
    return updatedAuthor;
  } catch (error) {
    console.error("Error al actualizar autor:", error);
    throw error;
  }
};

// Eliminar un autor
export const deleteAuthor = async (id) => {
  try {
    const result = await authorsLocalService.delete(id);
    return result;
  } catch (error) {
    console.error("Error al eliminar autor:", error);
    throw error;
  }
};