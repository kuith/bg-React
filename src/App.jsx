import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Container } from "@mui/material";
import Header from "./components/header/header"
import Footer from "./components/footer/footer";
import Home from "./components/mainContent/home";

import Players from "./components/mainContent/players";
import Authors from "./components/mainContent/authors";
import Games from "./components/mainContent/games";
import Matches from "./components/mainContent/matches";
import Log from "./components/mainContent/log";


function App() {
    return (
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
                        <Route exact path="/players" element={<Players />} />
                        <Route exact path="/authors" element={<Authors />} />
                        <Route exact path="/games" element={<Games />} />
                        <Route exact path="/matches" element={<Matches />} />
                        <Route exact path="/log" element={<Log />} />
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
    );

}

export default App
