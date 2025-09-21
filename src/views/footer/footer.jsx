import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#1976d2",
                color: "white",
                py: 1.5, // Reducido de 3 a 1.5
                mt: "auto",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)"
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="body2" // Cambiado de body1 a body2
                    align="center"
                    sx={{
                        fontSize: { xs: "0.8rem", md: "0.85rem" } // Reducido el tamaño
                    }}
                >
                    Desarrollado por{" "}
                    <Box
                        component="span"
                        sx={{
                            fontWeight: "bold",
                            color: "#ffeb3b"
                        }}
                    >
                        Rafael Santamaría
                    </Box>
                    {" "}•{" "}
                    <Box
                        component="a"
                        href="mailto:kuithsteam@gmail.com"
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            "&:hover": {
                                color: "#ffeb3b",
                                textDecoration: "underline"
                            },
                            transition: "all 0.2s ease"
                        }}
                    >
                        kuithsteam@gmail.com
                    </Box>
                    {" "}• © {new Date().getFullYear()} {/* Movido a la misma línea */}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
