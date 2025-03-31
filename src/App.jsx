
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Container } from "@mui/material";
import Header from "./views/header/header";
import Footer from "./views/footer/footer";
import Home from "./components/home";

import Players from "./views/mainContent/players-container";
import Authors from "./components/authors/authors";
import Games from "./components/games/games";
import Matches from "./components/matches/matches";
import Dashboardcontainer from "./views/mainContent/dashboard-container";

import { PlayersProvider } from "./context/PlayersContext";
import { AuthorsProvider } from "./context/AuthorsContext";
import { GamesProvider } from "./context/GamesContext";

function App() {
    return (
        <PlayersProvider>
            <AuthorsProvider>
                <GamesProvider>
                    <BrowserRouter>
                        <CssBaseline />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "100vh",
                            }}
                        >
                            <Header />
                            <Container
                                sx={{
                                    flexGrow: 1,
                                    padding: "12px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {/* Ajusta este valor según la altura del header */}
                                <Routes>
                                    <Route exact path="/" element={<Home />} />
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
                                    <Route exact path="/games" element={<Games />} />
                                    <Route
                                        exact
                                        path="/matches"
                                        element={<Matches />}
                                    />
                                    <Route
                                        exact
                                        path="/Dasboard"
                                        element={<Dashboardcontainer />}
                                    />
                                    {/* <Route exact path="/grupo/nuevoGrupo" component={NuevoGrupo} /> */}
                                    {/* <Route
                                    path="/grupos/:grupoId"
                                    render={({ match }) => (
                                        <GrupoContainer id={match.params.grupoId} />
                                    )}
                                /> */}
                                </Routes>
                            </Container>
                            <Footer />
                        </Box>
                    </BrowserRouter>
                </GamesProvider>
            </AuthorsProvider>
        </PlayersProvider>
    );
}

export default App;
