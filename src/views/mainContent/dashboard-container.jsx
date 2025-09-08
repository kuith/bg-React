import React, { useContext, useState, useEffect } from "react";
//import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import DashAuthors from "../dashboard/dash-authors/dash-authors";
import DashGames from "../dashboard/dash-games/dash-games";
import DashMatches from "../dashboard/dash-matches/dash-matches";
import DashPlayers from "../dashboard/dash-players/dash-players";
import DashboardPlayersSection from "./dashSections/dashboard-players-section";
import DashboardAuthorsSection from "./dashSections/dashboard-authors-section";
import DashboardGamesSection from "./dashSections/dashboard-games-section";
//import DashboardMatchesSection from "./dashSections/dashboard-matches-section";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DashboardContainer = () => {

    return (
        <>
            <CssBaseline />
            <Box sx={{ width: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid size={12}>
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            Administración
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Jugadores</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <DashboardPlayersSection />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid size={12}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Autores</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <DashboardAuthorsSection />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid size={12}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Juegos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <DashboardGamesSection />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid size={12}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Partidas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Paper sx={{ p: 2 }}>
                                    <DashMatches />
                                </Paper>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default DashboardContainer;