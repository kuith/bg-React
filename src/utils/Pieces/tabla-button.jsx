import { Box } from "@mui/material";
const TablaButton = (label, value) => {
    return (
        <Box
            sx={{
                flex: 1,
                minWidth: "0",
                textAlign: { xs: "center", md: "center" },
            }}
        >
            <Button
                variant="outlined"
                onClick={() => onClick(value)}
                sx={{
                    fontSize: {
                        xs: "0.6rem",
                        sm: "0.7rem",
                        md: "0.7rem",
                    },
                    padding: {
                        xs: "2px 4px",
                        sm: "3px 6px",
                        md: "4px 8px",
                    },
                    maxWidth: "100px",
                    width: "100%",
                }}
            >
                {label}
            </Button>
        </Box>
    );
};

export default TablaButton;