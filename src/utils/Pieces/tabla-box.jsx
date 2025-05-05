import { Box, Typography } from "@mui/material";
const TablaBox = ({ label, value } ) => {
    return (
        <Box
            sx={{
                flex: 1,
                minWidth: "0",
                marginBottom: { xs: 1, md: 0 },
                textAlign: { xs: "center", md: "left" },
            }}
        >
            <Typography variant="body1">
                <strong>{label}:</strong> {value}
            </Typography>
        </Box>
    );
};

export default TablaBox;
