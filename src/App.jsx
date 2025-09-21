import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Container, Typography } from "@mui/material";
import Header from "./views/header/header";
import Footer from "./views/footer/footer";
import Login from "./views/login/login";

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
              <Login onLogin={setUser} />
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
