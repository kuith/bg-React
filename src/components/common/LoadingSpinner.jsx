import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

// Animación de pulso para el fondo
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

// Animación de aparición gradual del texto
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoadingSpinner = ({ 
  message = "Cargando...", 
  size = 60, 
  fullScreen = false,
  color = "#0d47a1", // Azul navy consistente con la aplicación
  accentColor = "#1976d2" // Azul más claro para contraste
}) => {
  const containerStyles = fullScreen 
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 9999,
        backdropFilter: 'blur(5px)'
      }
    : {
        width: '100%',
        minHeight: '200px'
      };

  return (
    <Fade in={true} timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...containerStyles
        }}
      >
        {/* Círculo de fondo con animación de pulso */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Círculo de fondo animado */}
          <Box
            sx={{
              position: 'absolute',
              width: size * 1.8,
              height: size * 1.8,
              borderRadius: '50%',
              backgroundColor: accentColor,
              animation: `${pulseAnimation} 2s ease-in-out infinite`,
              zIndex: 1
            }}
          />
          
          {/* Spinner principal */}
          <CircularProgress
            size={size}
            thickness={4}
            sx={{
              color: color,
              zIndex: 2,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }}
          />
        </Box>

        {/* Texto de carga */}
        <Typography
          variant="body1"
          sx={{
            mt: 3,
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '1.1rem',
            fontFamily: '"Lato", sans-serif',
            animation: `${fadeInUp} 0.6s ease-out 0.3s both`
          }}
        >
          {message}
        </Typography>

        {/* Puntos animados */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            mt: 1
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: accentColor,
                animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;