import { Box, Typography } from "@mui/material";
const TablaBox = ({ label, value } ) => {
    return (
        <Box
            sx={{
                flex: { xs: 'none', md: 1 },
                width: { xs: '100%', md: 'auto' },
                minWidth: "0",
                marginBottom: { xs: 0.5, md: 0 },
                textAlign: { xs: "left", md: "center" },
                px: { xs: 1, md: 0 },
            }}
        >
            <Typography 
                variant="body2" 
                sx={{ 
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    wordBreak: 'break-word'
                }}
            >
                <strong>{label}:</strong> {value}
            </Typography>
        </Box>
    );
};

export default TablaBox;
