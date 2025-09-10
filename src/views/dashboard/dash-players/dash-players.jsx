import React, { useState } from "react";
import { formatDate, validatePlayer } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';
import Button from "@mui/material/Button";
import GenericDetailModal from '../../../components/common/GenericDetailModal';

const DashPlayers = ({
    data,
    onClickDeletePlayer,
    onClickUpdatePlayer,
    handleSavePlayer,
    errorMsg,
    selectedPlayer
}) => {
    // Definir columnas y campos para jugadores
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'correo', label: 'Correo' },
        { key: 'rol', label: 'Rol' },
        { key: 'detalles', label: 'Detalles' }
    ];
    const playerFields = [
        { name: "nombre", label: "Nombre", required: true },
        { name: "correo", label: "Correo", required: true, type: "email" },
        { name: "rol", label: "Rol", required: true },
        { name: "password", label: "Password", type: "password" },

    ];

    // Estado para el modal de detalles
    const [openDetail, setOpenDetail] = useState(false);
    const [playerDetail, setPlayerDetail] = useState(null);

    // Data con botón Detalles
    const dataWithDetails = data.map(player => ({
        ...player,
        detalles: (
            <Button
                size="small"
                variant="outlined"
                onClick={() => {
                    setPlayerDetail(player);
                    setOpenDetail(true);
                }}
            >
                Detalles
            </Button>
        )
    }));

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setPlayerDetail(null);
    };

    // Opcional: traducir claves a labels legibles
    const labelMap = {
        nombre: "Nombre",
        correo: "Correo",
        rol: "Rol",
        fechaRegistro: "Fecha de Registro"
    };

    return (
        <>
            <DashEntity
                data={dataWithDetails}
                columns={columns}
                fields={playerFields}
                title="Jugadores"
                onSave={handleSavePlayer}
                errorMsg={errorMsg}
                selectedEntity={selectedPlayer}
                validateFn={validatePlayer}
                entityLabel="Jugador"
            />
            <GenericDetailModal
                open={openDetail}
                onClose={handleCloseDetail}
                entity={playerDetail}
                entityLabel="Jugador"
                labelMap={labelMap}
                onEdit={playerDetail ? () => { setOpenDetail(false); onClickUpdatePlayer(playerDetail.id); } : undefined}
                onDelete={playerDetail ? () => { setOpenDetail(false); onClickDeletePlayer(playerDetail.id); } : undefined}
            />
        </>
    );
};

export default DashPlayers;