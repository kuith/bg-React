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
  const { loading: playersLoading } = useContext(PlayersContext);
  const { loading: authorsLoading } = useContext(AuthorsContext);
  const { loading: gamesLoading } = useContext(GamesContext);
  const { loading: matchesLoading } = useContext(MatchesContext);

  // Mostrar loading mientras cualquier contexto esté cargando
  const isGlobalLoading = playersLoading || authorsLoading || gamesLoading || matchesLoading;

  if (isGlobalLoading) {
    return (
      <LoadingSpinner 
        message="Preparando la aplicación..." 
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
    //const storedUser = localStorage.getItem("user");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    console.log("User logged out");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <PlayersProvider>
        {!user ? (
          <LandingPage onLogin={setUser} />
        ) : (
          <AuthorsProvider>
            <GamesProvider>
              <MatchesProvider>
                <AppContent user={user} onLogout={handleLogout} />
              </MatchesProvider>
            </GamesProvider>
          </AuthorsProvider>
        )}
      </PlayersProvider>
    </BrowserRouter>
  );
}

export default App;
