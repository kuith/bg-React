// Ejemplo de uso para un formulario de Jugador:
//
// import EntityForm from './EntityForm';
//
// const playerFields = [
//   { name: "nombre", label: "Nombre", required: true },
//   { name: "correo", label: "Correo", required: true, type: "email" },
//   { name: "rol", label: "Rol", required: true },
// ];
//
// <EntityForm
//   fields={playerFields}
//   initialValues={playerToEdit || {}}
//   onSubmit={handleSavePlayer}
//   submitLabel={playerToEdit ? "Actualizar" : "Crear"}
//   onClose={handleClose}
// />
import React, { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";

const EntityForm = ({ fields, initialValues = {}, onSubmit, submitLabel = "Guardar", onClose }) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (onClose) onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type || "text"}
            value={form[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            fullWidth
          />
        ))}
        <Button type="submit" variant="contained">{submitLabel}</Button>
        {onClose && (
          <Button onClick={onClose} variant="outlined" color="secondary">Cancelar</Button>
        )}
      </Stack>
    </Box>
  );
};

export default EntityForm;
