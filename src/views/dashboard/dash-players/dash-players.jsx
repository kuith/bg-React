import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import NewPlayerForm from './new-player-form';
import {formatDate} from '../../../utils/validations';

import NewEntityButton from "../../../components/dash/dash-new-entity-button";

const DashPlayers = ({ 
        data,
        onClickDeletePlayer,
        onClickUpdatePlayer,
        handleSavePlayer,
        errorMsg,
        selectedPlayer
     }) => {
    const [open, setOpen] = useState(false);

    // Cuando cambia selectedPlayer, abre el formulario para editar
    useEffect(() => {
        if (selectedPlayer) setOpen(true);
    }, [selectedPlayer]);

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
            fechaRegistro: formatDate(row.fechaRegistro) || 'No disponible',
        }
    ));

/*     const NewPlayerButton = () => {
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
  }; */

const NewPlayerFormTag = () => {
    return(
        <NewPlayerForm
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSavePlayer}
            playerToEdit={selectedPlayer}
            errorMsg={errorMsg}
        />);
  };


    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;

    return (
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Administración de Jugadores</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                    <NewEntityButton labelNew="Nuevo Jugador" onClick={() => setOpen(true)} />
                </Paper>
                <NewPlayerFormTag />
            </AccordionDetails>
        </Accordion>
    );
    
}

export default DashPlayers;