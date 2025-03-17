import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const TitleMain = ({title}) => {

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
        </Box>
    );

};

export default TitleMain;