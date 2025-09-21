import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#0d47a1", // Azul marino elegante
                color: "white",
                py: 1.5,
                mt: "auto",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)"
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        fontSize: { xs: "0.8rem", md: "0.85rem" }
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
            </Container>
        </Box>
    );
};

export default Footer;
