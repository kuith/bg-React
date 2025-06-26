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
}