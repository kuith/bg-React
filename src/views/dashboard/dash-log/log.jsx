import React from 'react';

import Grid from "@mui/material/Grid2";
import { TextField, Button } from "@mui/material";

const Log = () => {
    return (
        <form
            style={{ marginTop: "15px" }}
            onSubmit={(e) => {
                e.preventDefault();
                alert("Formulario enviado");
            }}
        >
            <Grid sx={{ backgroundColor: "lightblue", padding: 2 }}>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        required
                        id="form-nombre"
                        label="Required"
                        defaultValue="Nombre"
                    />
                    <TextField
                        required
                        id="form-password"
                        label="Required"
                        defaultValue="Contraseña"
                    />
                </Grid>
                {/* Botones */}
                <Grid container spacing={2} xs={12} marginTop={3}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Enviar
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            type="reset"
                        >
                            Resetear
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};
export default Log;
