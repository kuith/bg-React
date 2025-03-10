import React from "react";
import {
    Stack,
    Link,
    Toolbar,
    Typography,
    Container,
    AppBar,
} from "@mui/material";

const pages = [
    { name: "Jugadores", id: "Jugadores" },
    { name: "Autores", id: "Autores" },
    { name: "Juegos", id: "Juegos" },
    { name: "Partidas", id: "Partidas" },
];



const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Container>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6">Gestión Juegos</Typography>
                        {pages.map(page => (
                            <Link
                            key={page.id}
                            sx={{
                                color: { xs: "primary", sm: "white" },
                            }}
                            >
                            {page.name}
                            </Link>
                        ))}
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;