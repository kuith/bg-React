import React from "react";
import { formatDate, validateGame } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';

const DashGames = ({
    data,
    onClickDeleteGame,
    handleSaveGame,
    errorMsg,
    selectedGame
}) => {
    // Definir columnas y campos para juegos
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'anio_publicacion', label: 'Año' },
    ];
    const gameFields = [
        { name: "nombre", label: "Nombre", required: true },
        { name: "descripcion", label: "Descripción", required: true },
        { name: "anioPublicacion", label: "Año", required: true, type: "number" },
    ];

    return (
        <DashEntity
            data={data}
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
    );
};

export default DashGames;