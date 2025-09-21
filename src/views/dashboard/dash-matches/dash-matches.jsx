import React, { useState } from "react";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { validateMatch } from '../../../utils/validations';
import MatchDetailModal from '../../../components/matches/MatchDetailModal';
import GenericDetailModal from '../../../components/common/GenericDetailModal';
import DashEntity from '../../../components/dash/DashEntity';
import CreateMatchModal from '../../../components/matches/CreateMatchModal';

const DashMatches = ({
    data,
    originalMatches,
    players = [],
    games = [],
    onClickDeleteMatch,
    onClickUpdateMatch,
    handleSaveMatch,
    errorMsg,
    selectedMatch
}) => {
    // Estados para los diferentes modales
    const [openDetail, setOpenDetail] = useState(false);
    const [matchDetail, setMatchDetail] = useState(null);
    const [openGameDetail, setOpenGameDetail] = useState(false);
    const [gameDetail, setGameDetail] = useState(null);
    const [openPlayerDetail, setOpenPlayerDetail] = useState(false);
    const [playerDetail, setPlayerDetail] = useState(null);
    const [openMatchForm, setOpenMatchForm] = useState(false);
    const [editingMatch, setEditingMatch] = useState(null);

    const handleShowDetail = (matchId) => {
        // Buscar la partida original por id
        const original = originalMatches?.find(m => m.id === matchId);
        setMatchDetail(original || null);
        setOpenDetail(true);
    };

    const handleShowGameDetail = (game) => {
        setGameDetail(game);
        setOpenGameDetail(true);
    };

    const handleShowPlayerDetail = (player) => {
        setPlayerDetail(player);
        setOpenPlayerDetail(true);
    };

    const handleOpenMatchForm = () => {
        setOpenMatchForm(true);
    };

    const handleCloseMatchForm = () => {
        setOpenMatchForm(false);
    };

    // Data con botón Detalles
    const dataWithDetails = data.map(match => ({
        ...match,
        detalles: (
            <Button
                size="small"
                variant="outlined"
                onClick={() => handleShowDetail(match.id)}
            >
                Detalles
            </Button>
        )
    }));

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setMatchDetail(null);
    };

    const handleCloseGameDetail = () => {
        setOpenGameDetail(false);
        setGameDetail(null);
    };

    const handleClosePlayerDetail = () => {
        setOpenPlayerDetail(false);
        setPlayerDetail(null);
    };

    const onClickViewDetail = (matchId) => {
        const match = originalMatches.find(m => m.id === matchId);
        setMatchDetail(match);
        setOpenDetail(true);
    };

    const columns = [
        { key: 'juego', label: 'Juego' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'ganadores', label: 'Ganadores' },
        { key: 'detalles', label: 'Detalles' }
    ];

    const matchFields = [
        { 
            name: "juego_id", 
            label: "Juego", 
            type: "select",
            required: true,
            options: games.map(g => ({ value: g.id, label: g.nombre }))
        },
        { 
            name: "fecha", 
            label: "Fecha", 
            type: "date", 
            required: true 
        },
        {
            name: "jugadores_ids",
            label: "Jugadores",
            type: "select",
            multiple: true,
            required: true,
            options: players.map(p => ({ value: p.id, label: p.nombre }))
        },
        {
            name: "ganadores_ids",
            label: "Ganadores",
            type: "select",
            multiple: true,
            required: true,
            options: players.map(p => ({ value: p.id, label: p.nombre }))
        },
    ];

    // Label maps para los diferentes modales
    const matchLabelMap = {
        juego_id: 'Juego',
        fecha: 'Fecha',
        jugadores_ids: 'Jugadores',
        ganadores_ids: 'Ganadores'
    };

    const gameLabelMap = {
        nombre: "Nombre",
        descripcion: "Descripción",
        anioPublicacion: "Año",
        tipo: "Tipo",
        autores: "Autores"
    };

    const playerLabelMap = {
        nombre: "Nombre",
        correo: "Email",
        rol: "Rol",
        fecha_registro: "Fecha de registro"
    };

    // selectedMatch debe tener jugadores y ganadores como array de ids para el formulario
    const getSelectedMatchForForm = () => {
        if (!selectedMatch) return null;
        return {
            ...selectedMatch,
            jugadores_ids: Array.isArray(selectedMatch.jugadores_ids)
                ? selectedMatch.jugadores_ids.map(j => j.id ?? j)
                : [],
            ganadores_ids: Array.isArray(selectedMatch.ganadores_ids)
                ? selectedMatch.ganadores_ids.map(g => g.id ?? g)
                : []
        };
    };

    return (
        <>
            
            <DashEntity
                data={dataWithDetails}
                columns={columns}
                fields={matchFields}
                title="Partidas"
                onDelete={onClickDeleteMatch}
                onSave={handleSaveMatch}
                errorMsg={errorMsg}
                selectedEntity={getSelectedMatchForForm()}
                validateFn={validateMatch}
                entityLabel="Partida"
            />
            
            {/* Modal específico para detalles de partidas */}
            <MatchDetailModal
                open={openDetail}
                onClose={handleCloseDetail}
                match={matchDetail}
                onEdit={onClickUpdateMatch}
                onDelete={onClickDeleteMatch}
                onGameDetail={handleShowGameDetail}
                onPlayerDetail={handleShowPlayerDetail}
            />

            {/* Modal genérico para detalles de juegos */}
            <GenericDetailModal
                open={openGameDetail}
                onClose={handleCloseGameDetail}
                entity={gameDetail}
                entityLabel="Juego"
                labelMap={gameLabelMap}
            />

            {/* Modal genérico para detalles de jugadores */}
            <GenericDetailModal
                open={openPlayerDetail}
                onClose={handleClosePlayerDetail}
                entity={playerDetail}
                entityLabel="Jugador"
                labelMap={playerLabelMap}
            />

            {/* Modal para crear partidas */}
            <CreateMatchModal
                open={openMatchForm}
                onClose={handleCloseMatchForm}
                onSave={handleSaveMatch}
                players={players}
                games={games}
            />
        </>
    );
};

export default DashMatches;
