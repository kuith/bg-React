// filepath: [home.jsx](http://_vscodecontentref_/2)
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import Typography from '@mui/material/Typography';
import { PlayersContext } from "../../context/PlayersContext";

const Login = ({ onLogin, isModal = false }) => {
  const { players } = useContext(PlayersContext);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = players.find(
      (p) => p.nombre === nombre && p.correo === correo
    );
    if (usuario) {
      sessionStorage.setItem("user", JSON.stringify(usuario));
      onLogin(usuario);
      if (!isModal) {
        navigate("/players");
      }
    } else {
      setError("Usuario no encontrado");
    }
  };

  const baseUrl = import.meta.env.VITE_BASE_URL || "/images/";
  const src = `${baseUrl}portada01.jpg`;
  
  const formContent = (
    <FormControl
      sx={{
        width: "100%",
        padding: isModal ? 0 : 4,
        backgroundColor: isModal ? "transparent" : "#fff",
        borderRadius: isModal ? 0 : 2,
        boxShadow: isModal ? 0 : 3,
        display: "flex",
        gap: isModal ? 1.5 : 2,
      }}
    >
      <Typography 
        variant={isModal ? "h5" : "h4"} 
        align="center" 
        gutterBottom
        sx={{ mb: isModal ? 2 : 3 }}
      >
        Iniciar Sesión 
      </Typography>
      <TextField
        required
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        size={isModal ? "small" : "medium"}
        fullWidth
      />
      <TextField
        required
        label="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        size={isModal ? "small" : "medium"}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        sx={{
          mt: 1,
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#1565c0"
          }
        }}
      >
        Entrar
      </Button>
      {error && (
        <Typography 
          variant="body2" 
          color="error" 
          align="center"
          sx={{ mt: 1 }}
        >
          {error}
        </Typography>
      )}
      
      {/* Botón de acceso de invitado */}
      <Button
        variant="outlined"
        onClick={() => {
          setNombre("invitado");
          setCorreo("invitado@correo.com");
        }}
        sx={{
          mt: 1,
          color: "#6c757d",
          borderColor: "#6c757d",
          "&:hover": {
            backgroundColor: "#f8f9fa",
            borderColor: "#5a6268"
          }
        }}
      >
        Usar credenciales de invitado
      </Button>
    </FormControl>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      {formContent}
    </Box>
  );
};

export default Login;
