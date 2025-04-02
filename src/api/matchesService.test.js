import {
    getAllMatches,
    getMatchesById,
    getMatchesByDate,
    getMatchesWinnersRanking,
    getMatchesByPlayer,
    getGamesByPlayer,
    getPlayersByGame,
    getWinnersByGame,
    createMatch,
    updateMatch,
    deleteMatch
} from './matchesService';
import { api } from "../api/api";

jest.mock('../api/api');

describe("matchesService", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks después de cada prueba
    });

    test('getAllMatches debe devolver una lista de partidas', async () => {
        const mockMatches = [
            {
                id: 1,
                fecha: "2024-10-10T00:00:00+00:00",
                juego: {
                    id: 1,
                    nombre: "Azul",
                },
                id: 2,
                fecha: "2024-10-10T00:00:00+00:00",
                juego: {
                    id: 1,
                    nombre: "Azul",
                },
            }
        ]
        api.get.mockResolvedValue({ data: mockMatches });

        const matches = await getAllMatches();
        expect(matches).toEqual(mockMatches);
        expect(api.get).toHaveBeenCalledWith('/matches/');
    });
});