// filepath: [home.jsx](http://_vscodecontentref_/2)
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import Typography from '@mui/material/Typography';
import { PlayersContext } from "../../context/PlayersContext";

const Login = ({ onLogin }) => {
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
      //localStorage.setItem("user", JSON.stringify(usuario)); // Guarda el usuario en localStorage
      sessionStorage.setItem("user", JSON.stringify(usuario));
      onLogin(usuario); // Guarda el usuario en el estado de App.jsx
      navigate("/players"); // Redirige a /players
    } else {
      setError("Usuario no encontrado");
    }
  };

  const baseUrl = import.meta.env.VITE_BASE_URL || "/images/";
  const src = `${baseUrl}portada01.jpg`;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Opcional: color de fondo suave
      }}
    >
      <FormControl
        sx={{
          width: 350,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión 
        </Typography>
        <TextField
          required
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          required
          label="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit}
        >
          Entrar
        </Button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        
        {/* Botón de acceso de invitado */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setNombre("invitado");
            setCorreo("invitado@correo.com");
          }}
          sx={{
            marginTop: 2,
            backgroundColor: "#6c757d",
            "&:hover": {
              backgroundColor: "#5a6268"
            }
          }}
        >
          Usar credenciales de invitado
        </Button>
      </FormControl>
    </Box>
  );
};

export default Login;
