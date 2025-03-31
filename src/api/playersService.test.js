import { 
    getAllPlayers, 
    getPlayerById, 
    searchPlayersByName, 
    searchPlayersByRol, 
    searchPlayersByEmail, 
    getMatchesWonByPlayer, 
    getPlayersByGame, 
    createPlayer, 
    updatePlayer, 
    deletePlayer 
} from './playersService';
import { api } from '../api/api';

// Mock de Axios
jest.mock('../api/api');

describe('playersService', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    test('getAllPlayers debe devolver una lista de jugadores', async () => {
        const mockPlayers = [
            { id: 1, nombre: 'Rafa', correo: 'rafa@correo.com' },
            { id: 2, nombre: 'Paula', correo: 'paula@correo.com' }
        ];
        api.get.mockResolvedValue({ data: mockPlayers });

        const players = await getAllPlayers();
        expect(players).toEqual(mockPlayers);
        expect(api.get).toHaveBeenCalledWith('/players/');
    });

    test('getPlayerById debe devolver un jugador por ID', async () => {
        const mockPlayer = { id: 1, nombre: 'Rafa', correo: 'rafa@correo.com' };
        api.get.mockResolvedValue({ data: mockPlayer });

        const player = await getPlayerById(1);
        expect(player).toEqual(mockPlayer);
        expect(api.get).toHaveBeenCalledWith('/players/1');
    });

    test('searchPlayersByName debe devolver jugadores filtrados por nombre', async () => {
        const mockPlayers = [
            { id: 1, nombre: 'Rafa' },
            { id: 2, nombre: 'Rafael' }
        ];
        api.get.mockResolvedValue({ data: mockPlayers });

        const players = await searchPlayersByName('Rafa');
        expect(players).toEqual(mockPlayers);
        expect(api.get).toHaveBeenCalledWith('/players/name/', { params: { search: 'Rafa' } });
    });

    test('searchPlayersByRol debe devolver jugadores filtrados por rol', async () => {
        const mockPlayers = [
            { id: 1, nombre: 'Rafa', rol: 'admin' },
            { id: 2, nombre: 'Paula', rol: 'admin' }
        ];
        api.get.mockResolvedValue({ data: mockPlayers });

        const players = await searchPlayersByRol('admin');
        expect(players).toEqual(mockPlayers);
        expect(api.get).toHaveBeenCalledWith('/players/role/admin');
    });

    test('searchPlayersByEmail debe devolver un jugador por email', async () => {
        const mockPlayer = { id: 1, nombre: 'Rafa', correo: 'rafa@correo.com' };
        api.get.mockResolvedValue({ data: mockPlayer });

        const player = await searchPlayersByEmail('rafa@correo.com');
        expect(player).toEqual(mockPlayer);
        expect(api.get).toHaveBeenCalledWith('/players/email/rafa@correo.com');
    });

    test('getMatchesWonByPlayer debe devolver partidas ganadas por un jugador', async () => {
        const mockMatches = [
            { id: 1, nombre: 'Partida 1' },
            { id: 2, nombre: 'Partida 2' }
        ];
        api.get.mockResolvedValue({ data: mockMatches });

        const matches = await getMatchesWonByPlayer(1);
        expect(matches).toEqual(mockMatches);
        expect(api.get).toHaveBeenCalledWith('/players/1/matches/won');
    });

    test('getPlayersByGame debe devolver jugadores por juego', async () => {
        const mockPlayers = [
            { id: 1, nombre: 'Rafa' },
            { id: 2, nombre: 'Paula' }
        ];
        api.get.mockResolvedValue({ data: mockPlayers });

        const players = await getPlayersByGame(1);
        expect(players).toEqual(mockPlayers);
        expect(api.get).toHaveBeenCalledWith('/players/games/1');
    });

    test('createPlayer debe enviar datos para crear un jugador', async () => {
        const mockPlayer = { id: 1, nombre: 'Rafa', correo: 'rafa@correo.com' };
        api.post.mockResolvedValue({ data: mockPlayer });

        const player = await createPlayer(mockPlayer);
        expect(player).toEqual({ data: mockPlayer });
        expect(api.post).toHaveBeenCalledWith('/players/', mockPlayer);
    });

    test('updatePlayer debe enviar datos para actualizar un jugador', async () => {
        const mockPlayer = { id: 1, nombre: 'Rafa actualizado' };
        api.put.mockResolvedValue({ data: mockPlayer });

        const player = await updatePlayer(1, mockPlayer);
        expect(player).toEqual({ data: mockPlayer });
        expect(api.put).toHaveBeenCalledWith('/players/1', mockPlayer);
    });

    test('deletePlayer debe eliminar un jugador por ID', async () => {
        api.del.mockResolvedValue({});

        await deletePlayer(1);
        expect(api.del).toHaveBeenCalledWith('/players/1');
    });
});