import * as React from "react";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import packageInfo from "../../../package.json";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#0d47a1", // Azul marino elegante
                color: "white",
                py: 1, // Reducido de 2 a 1
                mt: "auto",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)"
            }}
        >
            <Container maxWidth="lg">
                <Stack 
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={{ xs: 0.5, md: 1 }} // Reducido el spacing
                >
                    {/* Información del desarrollador */}
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: { xs: "0.8rem", md: "0.85rem" },
                            textAlign: { xs: "center", md: "left" }
                        }}
                    >
                        Desarrollado por{" "}
                        <Box
                            component="span"
                            sx={{
                                fontWeight: "bold",
                                color: "#f39c12" // Dorado elegante
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
                                    color: "#f39c12", // Dorado en hover
                                    textDecoration: "underline"
                                },
                                transition: "all 0.2s ease"
                            }}
                        >
                            kuithsteam@gmail.com
                        </Box>
                        {" "}• © {new Date().getFullYear()}
                    </Typography>

                    {/* Versión de la aplicación */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8, // Reducido de 1 a 0.8
                            fontSize: { xs: "0.7rem", md: "0.75rem" } // Reducido el tamaño de fuente
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "inherit"
                            }}
                        >
                            Board Games Manager
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                px: 0.8, // Reducido de 1 a 0.8
                                py: 0.2, // Reducido de 0.3 a 0.2
                                borderRadius: 1,
                                border: "1px solid rgba(255, 255, 255, 0.2)"
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#f39c12",
                                    fontWeight: "bold",
                                    fontSize: "inherit",
                                    fontFamily: "monospace"
                                }}
                            >
                                v{packageInfo.version}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
