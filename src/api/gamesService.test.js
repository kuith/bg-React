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
    deleteGames,
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

    test("getGamesName debe devolver un juego por Nombre", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            tipo: "abstracto",
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByName("Azul");
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/name/Azul");
    });

    test("getGamesByYear debe devolver un juego por año de publicación", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            tipo: "abstracto",
            anioPublicacion: 2025,
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByYear(2005);
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/year/2005");
    });

    test("getGamesByLocalEditorial debe devolver un juego por editorial local", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            tipo: "abstracto",
            anioPublicacion: 2025,
            editorialMadre: "pipo",
            editorialLocal: "Tranjis"
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByLocalEditorial("Tranjis");
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/localEditorial/Tranjis");
    });

    test("getGamesByOriginEditorial debe devolver un juego por editorial local", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            tipo: "abstracto",
            anioPublicacion: 2025,
            editorialMadre: "pipo",
            editorialLocal: "Tranjis"
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByOriginEditorial("pipo");
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/originEditorial/pipo");
    });

    test("getGamesByPriceRange debe devolver juegos dentro de un rango de precios", async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                precio: "25",
            },
            {
                id: 2,
                nombre: "Terraforming",
                precio: "50",
            },
        ];
        api.get.mockResolvedValue({ data: mockGames });

        const games = await getGamesByPriceRange(20, 60);
        expect(games).toEqual(mockGames);
        expect(api.get).toHaveBeenCalledWith("/games/priceRange/20/60");
    });

    test("getGamesByUnderPrice debe devolver juegos por debajo de un precio", async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                precio: "25",
            },
            {
                id: 2,
                nombre: "Terraforming",
                precio: "50",
            },
        ];
        api.get.mockResolvedValue({ data: mockGames });

        const games = await getGamesByUnderPrice(60);
        expect(games).toEqual(mockGames);
        expect(api.get).toHaveBeenCalledWith("/games/underPrice/60");
    });
    
    test("getGamesByOverPrice debe devolver juegos por encima de un precio", async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                precio: "25",
            },
            {
                id: 2,
                nombre: "Terraforming",
                precio: "50",
            },
        ];
        api.get.mockResolvedValue({ data: mockGames });

        const games = await getGamesByOverPrice(20);
        expect(games).toEqual(mockGames);
        expect(api.get).toHaveBeenCalledWith("/games/overPrice/20");
    });

    test("getGamesByPlayersRange debe devolver juegos dentro de un rango de jugadores", async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                minPlayers: 2,
                maxPlayers: 4,
            },
            {
                id: 2,
                nombre: "Terraforming",
                minPlayers: 2,
                maxPlayers: 6,
            },
        ];
        api.get.mockResolvedValue({ data: mockGames });

        const games = await getGamesByPlayersRange(2, 6);
        expect(games).toEqual(mockGames);
        expect(api.get).toHaveBeenCalledWith("/games/playersRange/2/6");
    });

    test("getGamesByMinPlayers debe devolver juegos para un mínimo de jugadores", async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                minPlayers: 2,
                maxPlayers: 4,
            },
            {
                id: 2,
                nombre: "Terraforming",
                minPlayers: 2,
                maxPlayers: 6,
            },
        ];
        api.get.mockResolvedValue({ data: mockGames });

        const games = await getGamesByMinPlayers(2);
        expect(games).toEqual(mockGames);
        expect(api.get).toHaveBeenCalledWith("/games/minplayers/2");
    });

    test("getGamesByMaxPlayers debe devolver juegos para un máximo de jugadores", async () => {
        const mockGames = [
            {
                id: 1,
                nombre: "Azul",
                minPlayers: 2,
                maxPlayers: 4,
            },
            {
                id: 2,
                nombre: "Terraforming",
                minPlayers: 2,
                maxPlayers: 6,
            },
        ];
        api.get.mockResolvedValue({ data: mockGames });

        const games = await getGamesByMaxPlayers(6);
        expect(games).toEqual(mockGames);
        expect(api.get).toHaveBeenCalledWith("/games/maxPlayers/6");
    });

    test("getGamesByAuthors debe devolver un juego por autores", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            autores: [
                {
                    id: 1,
                    nombre: "Martin Friesse"
                },
                    {
                    id: 2,
                    nombre: "Michael Kiesling"
                }
            ],
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByAuthors(1);
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/gamesByAutors/1");
    });

    test("getGamesByYesAutoma debe devolver los juegos con automa", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            dispAutoma: true,
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByYesAutoma();
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/yesAutoma");
    });

    test("getGamesByNoAutoma debe devolver los juegos con automa", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            dispAutoma: false,
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByNoAutoma();
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/noAutoma");
    });

    test("getGamesByType debe devolver los juegos de un tipo", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            tipo: "Euro",
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getGamesByType("Euro");
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/type/Euro");
    });

    test("getExpansionsByJuego debe devolver las expansiones de un determinado juego", async () => {
        const mockGame = {
            id: 1,
            nombre: "Azul",
            tipo: "Euro",
        };
        api.get.mockResolvedValue({ data: mockGame });

        const game = await getExpansionsByJuego(1);
        expect(game).toEqual(mockGame);
        expect(api.get).toHaveBeenCalledWith("/games/expansionsByJuego/1");
    });

    test("getAllExpansions debe devolver todas las expansiones", async () => {
        const mockExpansions = [
            {
                id: 1,
                nombre: "Expansión Azul",
                tipo: "Expansión",
            },
            {
                id: 2,
                nombre: "Expansión Terraforming",
                tipo: "Expansión",
            },
        ];
        api.get.mockResolvedValue({ data: mockExpansions });

        const expansions = await getAllExpansions();
        expect(expansions).toEqual(mockExpansions);
        expect(api.get).toHaveBeenCalledWith("/games/expansions");
    });

    test("getExpansionsWithAutoma debe devolver todas las expansiones con automa", async () => {
        const mockExpansions = [
            {
                id: 1,
                nombre: "Expansión Azul",
                tipo: "Expansión",
                dispAutoma: false,
            },
            {
                id: 2,
                nombre: "Expansión Terraforming",
                tipo: "Expansión",
                dispAutoma: true,
            },
        ];
        api.get.mockResolvedValue({ data: mockExpansions });

        const expansions = await getExpansionsWithAutoma(true);
        expect(expansions).toEqual(mockExpansions);
        expect(api.get).toHaveBeenCalledWith("/games/expansionsWithAutoma");
    });

    test("getExpansionsWithoutAutoma debe devolver todas las expansiones con automa", async () => {
        const mockExpansions = [
            {
                id: 1,
                nombre: "Expansión Azul",
                tipo: "Expansión",
                dispAutoma: false,
            },
            {
                id: 2,
                nombre: "Expansión Terraforming",
                tipo: "Expansión",
                dispAutoma: true,
            },
        ];
        api.get.mockResolvedValue({ data: mockExpansions });

        const expansions = await getExpansionsWithoutAutoma(false);
        expect(expansions).toEqual(mockExpansions);
        expect(api.get).toHaveBeenCalledWith("/games/expansionsWithoutAutoma");
    });

    test('createGame debe enviar datos para crear un juego', async () => {
        const mockGame = { 
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
         };
        api.post.mockResolvedValue({ data: mockGame });

        const game = await createGame(mockGame);
        expect(game).toEqual({ data: mockGame });
        expect(api.post).toHaveBeenCalledWith('/games/', mockGame);
    });

    test('updateGames debe enviar datos para actualizar un juego', async () => {
        const mockGame = { 
            id: 1,
            nombre: "Azul",
            baseExpansion: "base",
            juegoBase: null,
            tipo: "cosa",
         };
        api.put.mockResolvedValue({ data: mockGame });

        const game = await updateGame(1, mockGame);
        expect(game).toEqual({ data: mockGame });
        expect(api.put).toHaveBeenCalledWith('/games/1', mockGame);
    });

    test('deleteGames debe eliminar un juego por ID', async () => {
        api.del.mockResolvedValue({});

        await deleteGames(1);
        expect(api.del).toHaveBeenCalledWith('/games/1');
    });

});


/*
    createGame,
    updateGame,
    deleteGame,

*/