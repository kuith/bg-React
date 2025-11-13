// filepath: [home.jsx](http://_vscodecontentref_/2)
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import Typography from '@mui/material/Typography';

import { loginPlayer } from "../../api/playersService";

const Login = ({ onLogin, isModal = false }) => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!correo || !password) {
      setError("Email y contraseña son requeridos");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const usuario = await loginPlayer(correo, password);
      
      sessionStorage.setItem("user", JSON.stringify(usuario));
      onLogin(usuario);
      
      if (!isModal) {
        navigate("/players");
      }
    } catch (error) {
      if (error.message.includes('401')) {
        setError("Email o contraseña incorrectos");
      } else if (error.message.includes('400')) {
        setError("Datos inválidos");
      } else {
        setError("Error de conexión. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
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
        label="Email"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        size={isModal ? "small" : "medium"}
        fullWidth
      />
      <TextField
        required
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size={isModal ? "small" : "medium"}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          mt: 1,
          backgroundColor: "#0d47a1", // Azul marino elegante
          "&:hover": {
            backgroundColor: "#1565c0"
          }
        }}
      >
        {loading ? "Cargando..." : "Entrar"}
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
          setCorreo("invitado@correo.com");
          setPassword("invitado123");
        }}
        sx={{
          mt: 1,
          color: "#f39c12",
          borderColor: "#f39c12",
          "&:hover": {
            backgroundColor: "rgba(243, 156, 18, 0.08)",
            borderColor: "#e67e22"
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
