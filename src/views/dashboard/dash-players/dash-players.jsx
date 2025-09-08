import React from "react";
import { formatDate, validatePlayer } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';

const DashPlayers = ({
    data,
    onClickDeletePlayer,
    handleSavePlayer,
    errorMsg,
    selectedPlayer
}) => {
    // Definir columnas y campos para jugadores
    const columns = ['ID', 'Nombre', 'Correo', 'Rol', 'FechaRegistro'];
    const playerFields = [
        { name: "nombre", label: "Nombre", required: true },
        { name: "correo", label: "Correo", required: true, type: "email" },
        { name: "rol", label: "Rol", required: true },
        { name: "password", label: "Password", type: "password" },
    ];
    // Formatear cada fila para la tabla
    const formatRow = (row, index) => ({
        id: row.id || index,
        nombre: row.nombre,
        correo: row.correo || 'No disponible',
        rol: row.rol || 'Jugador',
        fecharegistro: row.fechaRegistro ? formatDate(row.fechaRegistro) : 'No disponible',
    });

    return (
        <DashEntity
            data={data}
            columns={columns}
            fields={playerFields}
            title="Jugadores"
            onDelete={onClickDeletePlayer}
            onSave={handleSavePlayer}
            errorMsg={errorMsg}
            selectedEntity={selectedPlayer}
            validateFn={validatePlayer}
            formatRow={formatRow}
            entityLabel="Jugador"
        />
    );
};

export default DashPlayers;