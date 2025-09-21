import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { GamesContext } from "../../../context/GamesContext";
import { PlayersContext } from "../../../context/PlayersContext";
import { MatchesContext } from "../../../context/MatchesContext";
import { getMatchesById, createMatch, deleteMatch, updateMatch } from "../../../api/matchesService";
import { ActualDate } from "../../../utils/validations";
import DashMatches from "../../dashboard/dash-matches/dash-matches";
import { processMatches } from "../../../utils/processors";

const DashboardMatchesSection = () => {
    const { matches, fetchMatches } = useContext(MatchesContext);
    const { players } = useContext(PlayersContext);
    const { games } = useContext(GamesContext);
    const [selectedMatch, setSelectedMatch] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    const reload = async (matchId) => {
        const match = await getMatchesById(matchId);
        setSelectedMatch(match);
    };

    const onClickDeleteMatch = async (matchId) => {
        console.log("Eliminar partida con ID:", matchId);
        try {
            await deleteMatch(matchId);
            alert("Partida eliminada con éxito");
            await fetchMatches();
        } catch (error) {
            alert(error.message || "Error al eliminar partida");
        }
    };

    const onClickUpdateMatch = async (matchId) => {
        console.log("Actualizar partida con ID:", matchId);
        try {
            const match = await getMatchesById(matchId);
            setSelectedMatch(match);
        } catch (error) {
            alert(error.message || "Error al actualizar partida");
        }
    };

    const handleSaveMatch = async (dataMatch) => {
        try {
            // Si es alta, añade fecha_registro si no existe
            if (!dataMatch.id && !dataMatch.fecha_registro) {
                dataMatch.fecha_registro = ActualDate();
            }
            // Si es edición, conserva la fecha_registro original si existe
            if (dataMatch.id && !dataMatch.fecha_registro && selectedMatch?.fecha_registro) {
                dataMatch.fecha_registro = selectedMatch.fecha_registro;
            }

            // Asegurar que la API reciba arrays
            // juego_id puede venir como número u objeto: envolver en array y mapear a id
            if (Array.isArray(dataMatch.juego_id)) {
                dataMatch.juego_id = dataMatch.juego_id.map(j => (j && typeof j === 'object') ? j.id : j).filter(v => v != null);
            } else if (dataMatch.juego_id != null) {
                const jId = (typeof dataMatch.juego_id === 'object') ? dataMatch.juego_id.id : dataMatch.juego_id;
                dataMatch.juego_id = jId != null ? [jId] : [];
            } else {
                dataMatch.juego_id = [];
            }

            // Transformar arrays de jugadores y ganadores a ids si es necesario
            if (Array.isArray(dataMatch.jugadores_ids)) {
                dataMatch.jugadores_ids = dataMatch.jugadores_ids.map(j => j.id ?? j);
            }
            if (Array.isArray(dataMatch.ganadores_ids)) {
                dataMatch.ganadores_ids = dataMatch.ganadores_ids.map(g => g.id ?? g);
            }
            console.log('DATA MATCH AL GUARDAR:', dataMatch);
            if (dataMatch.id) {
                const updateResponse = await updateMatch(dataMatch.id, dataMatch);
                console.log('RESPUESTA DEL UPDATE:', updateResponse);
                alert("Partida actualizada con éxito");
                await fetchMatches(); // Recargar inmediatamente después de actualizar
            } else {
                await createMatch(dataMatch);
                alert("Partida creada con éxito");
                await fetchMatches(); // Recargar inmediatamente después de crear
            }

            setErrorMsg("");
            setSelectedMatch(null);
        } catch (error) {
            setErrorMsg(error.message || "Error al guardar partida");
        }
    };

    // Log para depuración: ver cómo llegan las partidas desde el backend
    console.log('Partidas en dashboard-matches-section:', matches);
    return (
        <Paper>
            <DashMatches
                data={processMatches(matches)}
                originalMatches={matches}
                players={players}
                games={games}
                onClickDeleteMatch={onClickDeleteMatch}
                onClickUpdateMatch={onClickUpdateMatch}
                handleSaveMatch={handleSaveMatch}
                errorMsg={errorMsg}
                selectedMatch={selectedMatch}
            />
        </Paper>
    );
};

export default DashboardMatchesSection;
