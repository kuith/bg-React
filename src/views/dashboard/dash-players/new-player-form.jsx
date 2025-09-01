import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from "@mui/material";

const NewPlayerForm = ({ open, onClose, onSubmit, errorMsg, playerToEdit }) => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    rol: "",
    password: "",
    fecha_registro: ""
  });

  // Este useEffect actualiza el formulario cuando playerToEdit cambia
  useEffect(() => {
    if (playerToEdit) {
      setForm({
        nombre: playerToEdit.nombre || "",
        correo: playerToEdit.correo || "",
        rol: playerToEdit.rol || "",
        password: playerToEdit.password || "",
        fecha_registro: playerToEdit.fecha_registro || ""
      });
    } else {
      setForm({
        nombre: "",
        correo: "",
        rol: "",
        password: "",
        fecha_registro: ""
      });
    }
  }, [playerToEdit, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const anio = now.getFullYear();
    const fecha = `${dia}/${mes}/${anio}`; // Siempre dos dígitos

    const formWithDate = {
      ...form,
      fecha_registro: fecha,
      ...(playerToEdit?.id ? { id: playerToEdit.id } : {})
    };
    onSubmit(formWithDate);
    setForm({ nombre: "", correo: "", rol: "", password: "", fecha_registro: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{playerToEdit ? "Editar Jugador" : "Nuevo Jugador"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="nombre"
          label="Nombre"
          fullWidth
          value={form.nombre}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="correo"
          label="Correo"
          fullWidth
          value={form.correo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="rol"
          label="Rol"
          fullWidth
          value={form.rol}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
      </DialogContent>
      {errorMsg && (
        <Typography color="error" sx={{ mt: 1 }}>
          {errorMsg}
        </Typography>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {playerToEdit ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPlayerForm;