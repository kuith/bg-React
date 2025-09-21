// Procesa los jugadores para el dashboard
const processPlayers = (players) => {
    if (!Array.isArray(players)) return [];
    return players.map((player, index) => ({
        id: player.id || index,
        nombre: player.nombre,
        correo: player.correo || 'No disponible',
        rol: player.rol || 'No disponible',
        fechaRegistro: player.fecha_registro || player.fechaRegistro || 'No disponible',
    }));
};
// Procesa los autores para el dashboard
const processAuthors = (authors) => {
    if (!Array.isArray(authors)) return [];
    return authors.map((author, index) => ({
        id: author.id || index,
        nombre: author.nombre,
        nacionalidad: author.nacionalidad || 'No disponible',
        fechaRegistro: author.fechaRegistro || 'No disponible',
        juegos: Array.isArray(author.juegos)
            ? author.juegos.map(j => j.nombre).join(", ")
            : (author.juegos || 'No disponible')
    }));
};
import { formatDate } from "./validations";
// Procesa las partidas para la tabla de partidas
const processMatches = (matches) => {
    if (!Array.isArray(matches)) return [];
    return matches.map((match) => ({
        id: match.id,
        fecha: formatDate(match.fecha),
        juego: match.juego?.nombre || "Sin juego",
        jugadores: Array.isArray(match.jugadores) ? match.jugadores.map(j => j.nombre).join(", ") : "Sin jugadores",
        ganadores: Array.isArray(match.ganadores) ? match.ganadores.map(g => g.nombre).join(", ") : "Sin ganadores",
    }));
};
// Procesa los juegos para la tabla de juegos de autor
const processGames = (games) => {
    if (!Array.isArray(games)) return [];
    return games.map((game) => ({
        id: game.id,
        nombre: game.nombre,
        tipo: game.tipo || game.type || "",
        descripcion: game.descripcion || game.description || "",
    anio_publicacion: game.anioPublicacion || 'No disponible',
    }));
};


// Para la tabla de partidas
const matchColumns = ["Juego", "Participantes", "Ganadores", "Fecha"];

export {
    processMatches,
    processGames,
    processAuthors,
    processPlayers,
}