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
import { validatePlayer } from "../../../utils/validations";
import { ActualDate } from "../../../utils/validations";

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
    const error = validatePlayer(form, !!playerToEdit);
    if (error) {
      alert(error); // O setErrorMsg(error)
      return;
    }
    
    const fecha = ActualDate();
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