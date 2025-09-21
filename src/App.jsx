import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Container, Typography } from "@mui/material";
import Header from "./views/header/header";
import Footer from "./views/footer/footer";
import Login from "./views/login/login";
import LandingPage from "./views/landing/LandingPage";

import Players from "./views/mainContent/players-container";
import Authors from "./views/mainContent/authors-container";
import Games from "./views/mainContent/games-container";
import Matches from "./views/mainContent/matches-container";
import Dashboardcontainer from "./views/mainContent/dashboard-container";
import ProtectedRoute from "./components/protectedRoute";

import { PlayersProvider } from "./context/PlayersContext";
import { AuthorsProvider } from "./context/AuthorsContext";
import { GamesProvider } from "./context/GamesContext";
import { MatchesProvider } from "./context/MatchesContext";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //const storedUser = localStorage.getItem("user");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



  return (
    <BrowserRouter>
      <PlayersProvider>
          {!user ? (
              <LandingPage onLogin={setUser} />
          ) : (
      <AuthorsProvider>
        <GamesProvider>
          <MatchesProvider>
            <CssBaseline />
            <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  // Fondo sutil y elegante
                  background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                }}
            >
                <Header 
                  user={user}
                  onLogout={() => {
                    sessionStorage.removeItem("user");
                    console.log("User logged out");
                    setUser(null);
                  }} 
                />
              <Container
                  sx={{
                    flexGrow: 1,
                    padding: "12px",
                    display: "flex",
                    justifyContent: "center",
                    // Fondo blanco para el contenido
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: { xs: 0, md: "8px 8px 0 0" },
                    margin: { xs: 0, md: "0 auto" },
                    maxWidth: { xs: "100%", md: "lg" },
                    boxShadow: { xs: "none", md: "0 -2px 10px rgba(0,0,0,0.1)" }
                  }}
              >
                <Routes>
                  <Route
                    exact
                    path="/players"
                    element={<Players />}
                  />
                  <Route
                    exact
                    path="/authors"
                    element={<Authors />}
                  />
                  <Route
                    exact
                    path="/games"
                    element={<Games />}
                  />
                  <Route
                    exact
                    path="/matches"
                    element={<Matches />}
                  />
                 <Route
                    exact
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
          </MatchesProvider>
        </GamesProvider>
      </AuthorsProvider>
          )}
      </PlayersProvider>
    </BrowserRouter>
  );
}

export default App;
