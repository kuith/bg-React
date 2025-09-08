
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

// fields: array de objetos { name, label, type, required }
// initialValues: objeto con valores iniciales (vacío para alta, con datos para editar)
// open, onClose, onSubmit, errorMsg, submitLabel
const EntityDialogForm = ({
  open,
  onClose,
  onSubmit,
  errorMsg,
  fields,
  initialValues = {},
  submitLabel = "Guardar",
  validateFn
}) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(initialValues || {});
  }, [initialValues, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validateFn) {
      const error = validateFn(form, !!initialValues.id);
      if (error) {
        alert(error);
        return;
      }
    }
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{submitLabel}</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <TextField
            key={field.name}
            margin="dense"
            name={field.name}
            label={field.label}
            type={field.type || "text"}
            fullWidth
            value={form[field.name] || ""}
            onChange={handleChange}
            required={field.required}
          />
        ))}
      </DialogContent>
      {errorMsg && (
        <Typography color="error" sx={{ mt: 1 }}>
          {errorMsg}
        </Typography>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntityDialogForm;
