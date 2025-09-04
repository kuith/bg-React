// Procesa los juegos para la tabla de juegos de autor
const processGames = (games) => {
    if (!Array.isArray(games)) return [];
    return games.map((game) => ({
        nombre: game.nombre,
        tipo: game.tipo || game.type || "",
        descripcion: game.descripcion || game.description || ""
    }));
};
const processMatches = (matches) => {
    return matches.map((match) => ({
        juego: match.juego.nombre,
        ganadores: match.ganadores.map((g) => g.nombre).join(", "),
        participantes: match.jugadores.map((j) => j.nombre).join(", "),
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