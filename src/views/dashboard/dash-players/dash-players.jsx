import React from "react";

import { Button } from "@mui/material";
const rol = "admin";

const DashPlayers = () => {
    return (
        <>
            <h1>Jugadores</h1>
            <Button variant="contained" disabled={rol !== "admin"}>
                Acción
            </Button>
        </>
    );
}

export default DashPlayers;