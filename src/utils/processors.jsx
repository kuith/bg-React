const processMatches = (matches) => {
    return matches.map((match) => ({
        juego: match.juego.nombre,
        ganadores: match.ganadores.map((g) => g.nombre).join(", "),
        participantes: match.jugadores.map((j) => j.nombre).join(", "),
    }));
};

export {
    processMatches,
}