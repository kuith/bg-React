import { 
    getAllAuthors,
    getAuthorById,
    searchAuthorsByName,
    searchAuthorsByNationality,
    createAuthor, 
    updateAuthor, 
    deleteAuthor 
} from './authorsService';
import { api } from '../api/api';

// Mock de Axios
jest.mock('../api/api');

describe('authorsService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllAuthors debe devolver una lista de autores', async () => {
        const mockAuthors = [
            { id: 1, nombre: 'Sebastian Fisscher', nacionalidad: 'alemania' },
            { id: 2, nombre: 'Paula', correo: 'Argentina' }
        ];
        api.get.mockResolvedValue({ data: mockAuthors });

        const  authors = await getAllAuthors();
        expect(authors).toEqual(mockAuthors);
        expect(api.get).toHaveBeenCalledWith('/authors/');
    });

    test('getauthorById debe devolver un autor por ID', async () => {
        const mockauthor = { id: 1, nombre: 'Rafa', nacionalidad: 'alemania' };
        api.get.mockResolvedValue({ data: mockauthor });

        const author = await getAuthorById(1);
        expect(author).toEqual(mockauthor);
        expect(api.get).toHaveBeenCalledWith('/authors/1');
    });

    test('searchAuthorsByName debe devolver autores filtrados por nombre', async () => {
        const mockAuthors = [
            { id: 1, nombre: 'Rafa' },
            { id: 2, nombre: 'Rafaela' }
        ];
        api.get.mockResolvedValue({ data: mockAuthors });

        const authors = await searchAuthorsByName("Rafa");
        expect(authors).toEqual(mockAuthors);
        expect(api.get).toHaveBeenCalledWith('/authors/name/', { params: { search: 'Rafa' } });
    });

    test("searchAuthorsByNationality ality debe devolver autores filtrados por nacionalidad", async () => {
        const mockAuthors = [
            { id: 1, nombre: "Rafa", nacionalidad: "Argentina" },
            { id: 2, nombre: "Rafaela", nacionalidad: "Espania" },
        ];
        api.get.mockResolvedValue({ data: mockAuthors });

        const authors = await searchAuthorsByNationality("Argentina");
        expect(authors).toEqual(mockAuthors);
        expect(api.get).toHaveBeenCalledWith("/authors/nationality/", {
            params: { search: "Argentina" },
        });
    });
    
    test('createAuthor debe enviar datos para crear autor', async () => {
        const mockAuthor = { id: 1, nombre: 'Rafa', nacionalidad: 'china' };
        api.post.mockResolvedValue({ data: mockAuthor });

        const author = await createAuthor(mockAuthor);
        expect(author).toEqual({ data: mockAuthor });
        expect(api.post).toHaveBeenCalledWith("/authors/", mockAuthor);
    });

    test('updateAuthor debe enviar datos para actualizar un autor', async () => {
        const mockAuthor = { id: 1, nombre: "Rafa actualizado" };
        api.put.mockResolvedValue({ data: mockAuthor });

        const author = await updateAuthor(1, mockAuthor);
        expect(author).toEqual({ data: mockAuthor });
        expect(api.put).toHaveBeenCalledWith("/authors/1", mockAuthor);
    });

    test('deleteAuthor debe eliminar un autor por ID', async () => {
        api.del.mockResolvedValue({});

        await deleteAuthor(1);
        expect(api.del).toHaveBeenCalledWith('/authors/1');
    });
});