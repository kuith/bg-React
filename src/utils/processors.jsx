import { formatDate } from "./validations";
// Procesa las partidas para la tabla de partidas
const processMatches = (matches) => {
    return matches.map((match) => ({
        id: match.id,
        fecha: formatDate(match.fecha),
        juego: match.juego?.nombre || "",
        jugadores: Array.isArray(match.jugadores) ? match.jugadores.map(j => j.nombre).join(", ") : "",
        ganadores: Array.isArray(match.ganadores) ? match.ganadores.map(g => g.nombre).join(", ") : "",
        // Agrega aquí otros campos procesados si los necesitas
    }));
};
// Procesa los juegos para la tabla de juegos de autor
const processGames = (games) => {
    if (!Array.isArray(games)) return [];
    return games.map((game) => ({
        nombre: game.nombre,
        tipo: game.tipo || game.type || "",
        descripcion: game.descripcion || game.description || ""
    }));
};


// Para la tabla de jugadores
const playerColumns = ["Nombre", "Edad", "Puntos"];

// Para la tabla de partidas
const matchColumns = ["Juego", "Participantes", "Ganadores", "Fecha"];

export {
    processMatches,
    processGames,
}