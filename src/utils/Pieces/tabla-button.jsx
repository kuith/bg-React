import { Box } from "@mui/material";
import Button from "@mui/material/Button";
const TablaButton = ({ label, value, onClick }) => {
    return (
        <Box
            sx={{
                flex: { xs: 'none', md: 1 },
                width: { xs: '100%', md: 'auto' },
                minWidth: "0",
                textAlign: "center",
                mt: { xs: 1, md: 0 },
            }}
        >
            <Button
                variant="outlined"
                onClick={() => onClick(value)}
                size="small"
                sx={{
                    fontSize: {
                        xs: "0.75rem",
                        sm: "0.875rem",
                        md: "0.875rem",
                    },
                    padding: {
                        xs: "8px 16px",
                        sm: "10px 20px",
                        md: "6px 16px",
                    },
                    width: { xs: '100%', md: 'auto' },
                    minWidth: { xs: 'auto', md: '80px' },
                    maxWidth: { xs: 'none', md: '120px' },
                }}
            >
                {label}
            </Button>
        </Box>
    );
};

export default TablaButton;
