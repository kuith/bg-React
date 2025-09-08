import React, { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import NewEntityButton from "./dash-new-entity-button";
import EntityDialogForm from "./EntityDialogForm";

const DashEntity = ({
  data = [],
  columns = [],
  fields = [],
  title = "Entidad",
  onDelete,
  onEdit,
  onSave,
  errorMsg,
  selectedEntity,
  validateFn,
  formatRow = (row) => row,
  entityLabel = "Entidad"
}) => {
  const [open, setOpen] = useState(false);
  const [editEntity, setEditEntity] = useState(null);

  useEffect(() => {
    if (selectedEntity) {
      setEditEntity(selectedEntity);
      setOpen(true);
    }
  }, [selectedEntity]);

  const handleFormSubmit = (form) => {
    // Si es edición, añade el id
    if (editEntity && editEntity.id) {
      form.id = editEntity.id;
    }
    onSave(form);
    setEditEntity(null);
  };

  const handleEdit = (id) => {
    const entity = data.find((item) => item.id === id);
    setEditEntity(entity);
    setOpen(true);
    if (onEdit) onEdit(id);
  };

  const handleNew = () => {
    setEditEntity(null);
    setOpen(true);
  };

  if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;

  const rows = data.map(formatRow);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Administración de {title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col} style={{ borderBottom: '1px solid #ccc', padding: 8 }}>{col}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map(col => (
                    <td key={col} style={{ padding: 8 }}>{row[col.toLowerCase()]}</td>
                  ))}
                  <td>
                    <IconButton size="small" onClick={() => handleEdit(row.id)} aria-label="Editar">
                      <SyncAltOutlinedIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => onDelete(row.id)} aria-label="Borrar">
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
        <Paper sx={{ mt: 2, padding: 2 }}>
          <NewEntityButton labelNew={`Nuevo ${entityLabel}`} onClick={handleNew} />
        </Paper>
        <EntityDialogForm
          open={open}
          onClose={() => { setOpen(false); setEditEntity(null); }}
          onSubmit={handleFormSubmit}
          errorMsg={errorMsg}
          fields={fields}
          initialValues={editEntity || {}}
          submitLabel={editEntity ? "Actualizar" : "Crear"}
          validateFn={validateFn}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default DashEntity;
