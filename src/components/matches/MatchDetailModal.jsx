import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../../utils/validations';

const MatchDetailModal = ({
  open,
  onClose,
  match,
  onEdit,
  onDelete,
  onGameDetail, // Nueva función para ver detalles del juego
  onPlayerDetail // Nueva función para ver detalles de jugador
}) => {
  if (!match) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Detalles de la Partida
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Fecha */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Fecha:
            </Typography>
            <Typography variant="body1">
              {formatDate(match.fecha)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Juego */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Juego:
            </Typography>
            <Typography variant="body1">
              {match.juego?.nombre || 'No especificado'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Jugadores */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Jugadores:
            </Typography>
            {Array.isArray(match.jugadores) && match.jugadores.length > 0 ? (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {match.jugadores.map(j => j.nombre).join(', ')}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No hay jugadores registrados
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Ganadores */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Ganadores:
            </Typography>
            {Array.isArray(match.ganadores) && match.ganadores.length > 0 ? (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {match.ganadores.map(g => g.nombre).join(', ')}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                No hay ganadores registrados
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box display="flex" gap={1}>
          {onEdit && (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                onClose();
                onEdit(match.id);
              }}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                onClose();
                onDelete(match.id);
              }}
            >
              Eliminar
            </Button>
          )}
          <Button onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default MatchDetailModal;