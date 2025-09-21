import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Container
} from "@mui/material";
import Login from "../login/login";

const LandingPage = ({ onLogin }) => {
  const [openLogin, setOpenLogin] = useState(false);
  
  // Base URL para las imágenes
  const baseUrl = import.meta.env.VITE_BASE_URL || "/images/";

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleLogin = (userData) => {
    setOpenLogin(false);
    onLogin(userData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 3,
        position: "relative",
        // Fondo con imagen y overlay
        background: `
          linear-gradient(
            135deg, 
            rgba(13, 71, 161, 0.85) 0%, 
            rgba(55, 71, 79, 0.75) 100%
          ),
          url(${baseUrl}portada01.jpg)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: { xs: "scroll", md: "fixed" }, // Fixed solo en desktop
        color: "white",
        // Responsive adjustments
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.2)", // Overlay adicional para mejor legibilidad
          zIndex: 1
        }
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{ 
          position: "relative", 
          zIndex: 2 // Asegurar que el contenido esté encima del overlay
        }}
      >
        {/* Título principal */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "white",
            marginBottom: 3,
            fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            lineHeight: { xs: 1.2, md: 1.1 }
          }}
        >
          Juegos de Mesa
        </Typography>

        {/* Subtítulo */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: 4,
            fontSize: { xs: "1.1rem", md: "1.5rem", lg: "1.8rem" },
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            maxWidth: { xs: "100%", md: "80%" },
            mx: "auto",
            lineHeight: 1.4
          }}
        >
          Gestiona tu colección y organiza partidas épicas
        </Typography>

        {/* Botón de acceso */}
        <Button
          variant="contained"
          size="large"
          onClick={handleOpenLogin}
          sx={{
            backgroundColor: "#1976d2", // Azul principal consistente
            color: "#fff",
            fontWeight: "bold",
            px: { xs: 4, md: 6 },
            py: { xs: 1.5, md: 2 },
            fontSize: { xs: "1rem", md: "1.2rem" },
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              backgroundColor: "#0d47a1", // Azul navy más oscuro en hover
              transform: "translateY(-3px)",
              boxShadow: "0 8px 30px rgba(13, 71, 161, 0.4)"
            },
            transition: "all 0.3s ease"
          }}
        >
          🎮 Acceder
        </Button>
      </Container>

      {/* Modal flotante del login */}
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 1,
            maxWidth: 400
          }
        }}
      >
        <DialogContent sx={{ padding: 2 }}>
          <Login onLogin={handleLogin} isModal={true} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LandingPage;