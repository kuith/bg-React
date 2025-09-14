import React, { useState } from "react";
import { validateGame } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';
import GenericDetailModal from '../../../components/common/GenericDetailModal';
import Button from "@mui/material/Button";

const DashGames = ({
    data,
    originalGame,
    authors = [],
    onClickDeleteGame,
    onClickUpdateGame,
    handleSaveGame,
    errorMsg,
    selectedGame
}) => {
    // Definir columnas y campos para juegos
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'anio_publicacion', label: 'Año' },
        { key: 'detalles', label: 'Detalles' }
    ];
    const gameFields = [
        { name: "nombre", label: "Nombre", required: true },
        { name: "descripcion", label: "Descripción", required: true },
        { name: "anioPublicacion", label: "Año", required: true, type: "number" },
        { name: "baseExpansion", label: "JuegoBase/Expansión" },
        { name: "juegoBase", label: "Juego Base" },
        { name: "tipo", label: "Tipo" },
        { name: "minJugadores", label: "Mínimo de Jugadores", type: "number" },
        { name: "maxJugadores", label: "Máximo de Jugadores", type: "number" },
        { name: "precio", label: "Precio", type: "number" },
        { name: "dispAutoma", label: "¿Tiene Automa?", type: "boolean" },
        {
            name: "autores",
            label: "Autores",
            type: "select",
            multiple: true,
            options: authors.map(a => ({ value: a.id, label: a.nombre }))
        },
        { name: "editorialMadre", label: "Editorial Madre" },
        { name: "editorialLocal", label: "Editorial Local" },
    ];

            // Estado para el modal de detalles
    const [openDetail, setOpenDetail] = useState(false);
    const [gameDetail, setGameDetail] = useState(null);

    const handleShowDetail = (gameId) => {
        // Buscar el juego original por id
        const original = originalGame?.find(g => g.id === gameId);
        setGameDetail(original || null);
        setOpenDetail(true);
    };

    // Data con botón Detalles
    const dataWithDetails = data.map(game => ({
        ...game,
        detalles: (
            <Button
                size="small"
                variant="outlined"
                onClick={() => handleShowDetail(game.id)}
            >
                Detalles
            </Button>
        )
    }));

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setGameDetail(null);
    };


    // Opcional: traducir claves a labels legibles
     const labelMap = {
    nombre: "Nombre",
    descripcion: "Descripción",
    anioPublicacion: "Año",
    baseExpansion: "JuegoBase/Expansión",
    juegoBase: "Juego Base",
    tipo: "Tipo",
    minJugadores: "Mínimo de Jugadores",
    maxJugadores: "Máximo de Jugadores",
    precio: "Precio",
    dispAutoma: "¿Tiene Automa?",
    autores: "Autores",
    editorialMadre: "Editorial Madre",
    editorialLocal: "Editorial Local"
  };

    // selectedEntity debe tener autores como array de ids para el formulario
    const getSelectedGameForForm = () => {
        if (!selectedGame) return null;
        return {
            ...selectedGame,
            autores: Array.isArray(selectedGame.autores)
                ? selectedGame.autores.map(a => a.id ?? a)
                : []
        };
    };
    return (
        <>
            <DashEntity
                data={dataWithDetails}
                columns={columns}
                fields={gameFields}
                title="Juegos"
                onDelete={onClickDeleteGame}
                onSave={handleSaveGame}
                errorMsg={errorMsg}
                selectedEntity={getSelectedGameForForm()}
                validateFn={validateGame}
                entityLabel="Juego"
            />
            <GenericDetailModal
                open={openDetail}
                onClose={handleCloseDetail}
                entity={gameDetail}
                entityLabel="Juego"
                labelMap={labelMap}
                onEdit={gameDetail ? () => { setOpenDetail(false); onClickUpdateGame(gameDetail.id); } : undefined}
                onDelete={gameDetail ? () => { setOpenDetail(false); onClickDeleteGame(gameDetail.id); } : undefined}
            />
        </>
    );
};

export default DashGames;