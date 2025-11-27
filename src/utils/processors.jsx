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
    return matches.map((match, index) => {
        // Crear un ID único basado en los datos de la partida + índice para evitar duplicados
        const uniqueId = `${match.juego?.nombre || 'unknown'}_${match.jugadores?.map(j => j.nombre).join('')}_${match.ganadores?.map(g => g.nombre).join('')}_${index}`.replace(/\s/g, '');
        
        return {
            id: match.id || match.match_id || match.partidaId || uniqueId, 
            fecha: formatDate(match.fecha),
            juego: match.juego?.nombre || "Sin juego",
            jugadores: Array.isArray(match.jugadores) ? match.jugadores.map(j => j.nombre).join(", ") : "Sin jugadores",
            ganadores: Array.isArray(match.ganadores) ? match.ganadores.map(g => g.nombre).join(", ") : "Sin ganadores",
            // Guardamos los datos originales para usar en el modal
            originalMatch: match
        };
    });
};
// Procesa los juegos para la tabla de juegos de autor
const processGames = (games) => {
    if (!Array.isArray(games)) return [];
    return games.map((game, index) => {
        // Si no hay ID, crear uno único basado en los datos del juego
        const uniqueId = game.id || `${game.nombre || 'unknown'}_${game.tipo || 'tipo'}_${index}`.replace(/\s/g, '');
        
        return {
            id: uniqueId,
            nombre: game.nombre,
            tipo: game.tipo || game.type || "",
            descripcion: game.descripcion || game.description || "",
            anio_publicacion: game.anioPublicacion || 'No disponible',
            // Guardamos los datos originales para usar en el modal
            originalGame: game
        };
    });
};


// Para la tabla de partidas
const matchColumns = ["Juego", "Participantes", "Ganadores", "Fecha"];

export {
    processMatches,
    processGames,
    processAuthors,
    processPlayers,
}