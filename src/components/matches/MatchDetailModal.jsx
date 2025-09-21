import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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

          {/* Juego (clickeable) */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Juego:
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">
                {match.juego?.nombre || 'No especificado'}
              </Typography>
              {match.juego && onGameDetail && (
                <IconButton 
                  size="small" 
                  onClick={() => onGameDetail(match.juego)}
                  title="Ver detalles del juego"
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Jugadores (clickeables) */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Jugadores:
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Array.isArray(match.jugadores) && match.jugadores.length > 0 ? (
                match.jugadores.map((jugador) => (
                  <Chip
                    key={jugador.id}
                    label={jugador.nombre}
                    variant="outlined"
                    onClick={onPlayerDetail ? () => onPlayerDetail(jugador) : undefined}
                    clickable={!!onPlayerDetail}
                    icon={onPlayerDetail ? <InfoIcon fontSize="small" /> : undefined}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay jugadores registrados
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Ganadores (clickeables) */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="primary">
              Ganadores:
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Array.isArray(match.ganadores) && match.ganadores.length > 0 ? (
                match.ganadores.map((ganador) => (
                  <Chip
                    key={ganador.id}
                    label={ganador.nombre}
                    color="success"
                    onClick={onPlayerDetail ? () => onPlayerDetail(ganador) : undefined}
                    clickable={!!onPlayerDetail}
                    icon={onPlayerDetail ? <InfoIcon fontSize="small" /> : undefined}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay ganadores registrados
                </Typography>
              )}
            </Box>
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