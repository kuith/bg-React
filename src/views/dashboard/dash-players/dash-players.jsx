import React, { useState } from "react";
import { Box, CssBaseline, Container, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import NewPlayerForm from './new-player-form';

const DashPlayers = ({ data, onClickDeletePlayer, onClickUpdatePlayer, handleNewPlayer }) => {
    const [open, setOpen] = useState(false);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 130 },
        { field: 'correo', headerName: 'Correo', width: 200 },
        { field: 'rol', headerName: 'Rol', width: 130 },
        { field: 'fechaRegistro', headerName: 'Fecha Registro', width: 180 },
        {
            field: 'eliminar',
            headerName: '',
            width: 15,
            renderCell: (params) => (
                <DeleteOutlinedIcon onClick={() => onClickDeletePlayer(params.row.id)} />
            ),
        },
        {
            field: 'actualizar',
            headerName: '',
            width: 15,
            renderCell: (params) => (
                <SyncAltOutlinedIcon onClick={() => onClickUpdatePlayer(params.row.id)} />
            )
        },
    ];

    const rows = data.map((row, index) => (
        {
            id: row.id || index,
            nombre: row.nombre,
            correo: row.correo || 'No disponible',
            rol: row.rol || 'Jugador',
            fechaRegistro: row.fechaRegistro || 'No disponible',
        }
    ));

    const NewPlayerButton = () => {
    return(
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginLeft: "auto" }}
      >
        Nuevo Jugador
      </Button>
    );
  };

const NewPlayerFormTag = () => {
    return(
        <NewPlayerForm
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleNewPlayer}
        />);
  };

    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;
    
    return (
        <>
            <Typography variant="h6" sx={{ mt: 4 }}>Administración de Jugadores</Typography>
            <Paper sx={{ height: 400, 
                width: '100%',
                '& .MuiDataGrid-columnSeparator': { display: 'none'},
             }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
            <Paper sx={{ mt: 2, padding: 2 }}>
                <NewPlayerButton />
            </Paper>
            <NewPlayerFormTag />

        </>
    );
}

export default DashPlayers;