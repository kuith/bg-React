import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

// labelMap opcional para traducir claves a labels legibles
const GenericDetailModal = ({
  open,
  onClose,
  entity = {},
  entityLabel = "Entidad",
  labelMap = {},
  onEdit,
  onDelete
}) => {
  if (!entity) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Detalles de {entityLabel}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {Object.keys(entity).length === 0 ? (
          <Typography>No hay detalles para mostrar.</Typography>
        ) : (
          Object.entries(entity).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Typography variant="subtitle2" sx={{ minWidth: 140 }}>
                {labelMap[key] || key}:
              </Typography>
              <Typography variant="body1">
                {Array.isArray(value)
                  ? value.map(v => v.nombre || v).join(", ")
                  : typeof value === "boolean"
                    ? value ? "Sí" : "No"
                    : String(value)}
              </Typography>
            </div>
          ))
        )}
      </DialogContent>
      <DialogActions>
        {onEdit && (
          <Button variant="contained" color="primary" onClick={onEdit}>
            Editar
          </Button>
        )}
        {onDelete && (
          <Button variant="contained" color="error" onClick={onDelete}>
            Borrar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericDetailModal;
