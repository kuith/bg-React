import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { MatchesContext } from "../../context/MatchesContext";
import MatchesTable from "../../components/matches/comp-matches-table";
import MatchDetailCard from "../../components/matches/MatchDetailCard";
import { processMatches } from "../../utils/processors";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getMatchesById } from "../../api/matchesService";

const MatchesContainer = () => {
    const { matches, loading } = useContext(MatchesContext);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [loadingMatch, setLoadingMatch] = useState(false);
    const [error, setError] = useState(null);

    const matchesColumns =  ["fecha", "juego", "ganadores"];
    const matchesEntity = "Partida";
    const matchesLabel = "Detalles";

    const reloadMatch = async (matchId) => {
        let match = await getMatchesById(matchId);
        if (!match) {
            // Fallback: buscar en el array local
            match = matches.find(m => m.id === matchId || m.id === Number(matchId));
        }
        setSelectedMatch(match);
    };

    const onClickForDetails = async (matchId) => {
        setLoadingMatch(true);
        setError(null);
        try {
            await reloadMatch(matchId);
        } catch (error) {
            setError("No se pudieron cargar los detalles de la partida.");
            console.error("Error en onClickForDetails:", error);
        } finally {
            setLoadingMatch(false);
        }
    };

    const handleCloseDialog = () => {
        setSelectedMatch(null);
    };

    if (loading) {
        return (
            <LoadingSpinner 
                message="Cargando partidas..." 
                size={70}
            />
        );
    }

    // Procesar los datos de partidas para aplanar objetos anidados
    // Asegurarse de que cada partida tiene un id válido
    const processedMatches = processMatches(matches).map((m, idx) => ({
        ...m,
        id: m.id ?? matches[idx]?.id ?? idx
    }));

    const matchesDetailDialog = (
        <Dialog open={!!selectedMatch || loadingMatch} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
                Detalles de la partida
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loadingMatch ? (
                    <LoadingSpinner 
                        message="Cargando detalles de la partida..." 
                        size={50}
                    />
                ) : (
                    <MatchDetailCard match={selectedMatch} />
                )}
            </DialogContent>
        </Dialog>
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5" align="center" gutterBottom>
                    Partidas
                </Typography>

               <MatchesTable
                   data={processedMatches}
                   onClick={(id) => onClickForDetails(id)}
                   tableColumns={matchesColumns}
                   entityName={matchesEntity}
                   label={matchesLabel}
               />
               
               <Typography variant="h6" align="center" gutterBottom sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    Seleccione una partida para ver sus detalles
               </Typography>
               
               {matchesDetailDialog}
            </Stack>
        </Box>
    );
};

export default MatchesContainer;
