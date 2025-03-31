import {
    getAllGames,
    getGamesById,
    getGamesByName,
    getGamesByYear,
    getGamesByLocalEditorial,
    getGamesByOriginEditorial,
    getGamesByPriceRange,
    getGamesByUnderPrice,
    getGamesByOverPrice,
    getGamesByPlayersRange,
    getGamesByMinPlayers,
    getGamesByMaxPlayers,
    getGamesByAuthors,
    getGamesByYesAutoma,
    getGamesByNoAutoma,
    getGamesByType,
    getExpansionsByJuego,
    getAllExpansions,
    getExpansionsWithAutoma,
    getExpansionsWithoutAutoma,
    createGame,
    updateGame,
    deleteGame,
} from "./gamesService";
import { api } from "../api/api";

// Mock de Axios
jest.mock('../api/api');

describe("gamesService", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    test('getAllGames debe devolver una lista de juegos', async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                baseExpansion: "base",
                juegoBase: null,
                tipo: "abstracto",
                anioPublicacion : 2025,
                descripcion: "de azulejos",
                minJugadores: 2,
                maxJugadores: 4,
                precio: "25",
                dispAutoma: false,
                autores: [
                    {
                        id: 1,
                        nombre: "Michael Kiesling"
                    }
                ],
                editorialMadre: "pipo",
                editorialLocal: "Tranjis"
            },
            {
                id: 2,
                nombre: "Terraforming",
                baseExpansion: "base",
                juegoBase: null,
                tipo: "Euro",
                anioPublicacion : 2025,
                descripcion: "de marte",
                minJugadores: 2,
                maxJugadores: 4,
                precio: "50",
                dispAutoma: false,
                autores: [
                    {
                        id: 1,
                        nombre: "Martin Friesse"
                    }
                ],
                editorialMadre: "pipo",
                editorialLocal: "Tranjis"
            },

            ];
            api.get.mockResolvedValue({ data: mockGames });
    
            const games = await getAllGames();
            expect(games).toEqual(mockGames);
            expect(api.get).toHaveBeenCalledWith('/games/');
    });
    
    test('getGamesById debe devolver un juego por ID', async () => {
            const mockGame = { id: 1,
                nombre: "Azul",
                baseExpansion: "base",
                juegoBase: null,
                tipo: "abstracto",};
            api.get.mockResolvedValue({ data: mockGame });
    
            const game = await getGamesById(1);
            expect(game).toEqual(mockGame);
            expect(api.get).toHaveBeenCalledWith('/games/id/1');
        });


});