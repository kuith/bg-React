import React, { useState } from "react";
import { validateGame } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';
import GenericDetailModal from '../../../components/common/GenericDetailModal';
import Button from "@mui/material/Button";

const DashGames = ({
    data,
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
    ];

            // Estado para el modal de detalles
    const [openDetail, setOpenDetail] = useState(false);
    const [gameDetail, setGameDetail] = useState(null);

    // Data con botón Detalles
    const dataWithDetails = data.map(game => ({
        ...game,
        detalles: (
            <Button
                size="small"
                variant="outlined"
                onClick={() => {
                    setGameDetail(game);
                    setOpenDetail(true);
                }}
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
        anio_publicacion: "Año de Publicación"
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
                selectedEntity={selectedGame}
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