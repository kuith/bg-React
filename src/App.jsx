import "./App.css";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline, Container, Typography } from "@mui/material";
import Header from "./views/header/header";
import Footer from "./views/footer/footer";
import Login from "./views/login/login";
import LandingPage from "./views/landing/LandingPage";
import LoadingSpinner from "./components/common/LoadingSpinner";

import Players from "./views/mainContent/players-container";
import Authors from "./views/mainContent/authors-container";
import Games from "./views/mainContent/games-container";
import Matches from "./views/mainContent/matches-container";
import Dashboardcontainer from "./views/mainContent/dashboard-container";
import ProtectedRoute from "./components/protectedRoute";

import { PlayersProvider, PlayersContext } from "./context/PlayersContext";
import { AuthorsProvider, AuthorsContext } from "./context/AuthorsContext";
import { GamesProvider, GamesContext } from "./context/GamesContext";
import { MatchesProvider, MatchesContext } from "./context/MatchesContext";

// Componente que maneja el loading global de los contextos
const AppContent = ({ user, onLogout }) => {
  const { loading: playersLoading, players } = useContext(PlayersContext);
  const { loading: authorsLoading, authors } = useContext(AuthorsContext);
  const { loading: gamesLoading, games } = useContext(GamesContext);
  const { loading: matchesLoading, matches } = useContext(MatchesContext);
  
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

  // Mostrar loading mientras cualquier contexto esté cargando
  const isGlobalLoading = playersLoading || authorsLoading || gamesLoading || matchesLoading;

  useEffect(() => {
    // Cuando termine la carga inicial y no haya datos, forzar recarga
    if (!isGlobalLoading && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
      
      const hasData = (players?.length > 0) || (authors?.length > 0) || (games?.length > 0) || (matches?.length > 0);
      
      // Verificar si ya se hizo el force reload en esta sesión
      const alreadyReloaded = sessionStorage.getItem('bgAppReloaded');
      
      // Si no hay datos después de la carga inicial y no se ha hecho reload, forzar recarga
      if (!hasData && !alreadyReloaded) {
        // Marcar que ya se hizo el reload para evitar bucle infinito
        sessionStorage.setItem('bgAppReloaded', 'true');
        
        // Delay para asegurar que se complete todo
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }, [isGlobalLoading, hasInitiallyLoaded, players, authors, games, matches]);

  if (isGlobalLoading) {
    return (
      <LoadingSpinner 
        message="Cargando datos de la aplicación..." 
        size={80}
        fullScreen={true}
      />
    );
  }

  return (
    <>
      <CssBaseline />
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
      >
          <Header 
            user={user}
            onLogout={onLogout} 
          />
        <Container
            sx={{
              flexGrow: 1,
              padding: "12px",
              display: "flex",
              justifyContent: "center",
            }}
        >
          <Routes>
            {/* Ruta por defecto que redirige a players */}
            <Route path="/" element={<Navigate to="/players" replace />} />
            
            <Route
              path="/players"
              element={<Players />}
            />
            <Route
              path="/authors"
              element={<Authors />}
            />
            <Route
              path="/games"
              element={<Games />}
            />
            <Route
              path="/matches"
              element={<Matches />}
            />
           <Route
              path="/Dasboard"
              element={
                user?.rol === "admin" ? (
                  <Dashboardcontainer />
                ) : (
                  <Typography variant="h4" color="error" sx={{ mt: 4 }}>
                    No tienes acceso a esta sección.
                  </Typography>
                )
              }
            />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </>
  );
};


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Limpiar marcas de reload al inicio de cada sesión
    sessionStorage.removeItem('bgAppReloaded');
    sessionStorage.removeItem('bgLoginReloaded');
    
    //const storedUser = localStorage.getItem("user");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("bgAppReloaded");
    sessionStorage.removeItem("bgLoginReloaded");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <PlayersProvider>
        <AuthorsProvider>
          <GamesProvider>
            <MatchesProvider>
              {!user ? (
                <LandingPage onLogin={setUser} />
              ) : (
                <AppContent user={user} onLogout={handleLogout} />
              )}
            </MatchesProvider>
          </GamesProvider>
        </AuthorsProvider>
      </PlayersProvider>
    </BrowserRouter>
  );
}

export default App;
