
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
        {fields.map((field) => {
          if (field.type === "select" && field.multiple) {
            return (
              <FormControl key={field.name} fullWidth margin="dense">
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  name={field.name}
                  multiple
                  value={form[field.name] || []}
                  onChange={handleChange}
                  renderValue={(selected) =>
                    Array.isArray(selected)
                      ? selected
                          .map(
                            (val) =>
                              field.options.find((opt) => opt.value === val)?.label || val
                          )
                          .join(", ")
                      : ""
                  }
                >
                  {field.options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          // Campo select simple
          if (field.type === "select") {
            return (
              <FormControl key={field.name} fullWidth margin="dense">
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                >
                  {field.options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          // Campo normal
          return (
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
          );
        })}
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
