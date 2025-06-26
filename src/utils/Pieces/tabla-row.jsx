import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, Container } from "@mui/material";
import TablaBox from "./tabla-box";
import TablaButton from "./tabla-button";

const TablaRow = ({ columns, row, index, labelButon, onClick} ) => {

    const tablaBox = () =>{
        return (
            <TablaBox
                key={item}
                label={item}
                value={row[item.toLowerCase()]}
            />
        );
    }
    const tablaButton = () => {
        return (
            <TablaButton
                label={labelButon}
                value={row.id}
                onClick={onClick}
            />
        );
    }
    return (
        <TableRow>
            <TableCell colSpan={4} sx={{ padding: 0 }}>
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{
                        padding: 1,
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        gap: { xs: 1, md: 0 },
                    }}
                >
                    {columns.map((item) => (
                        <TablaBox
                            key={item}
                            label={item}
                            value={row[item.toLowerCase()]}
                        />
                        //{tablaBox}
                    ))}

                {labelButon && (
                    <TablaButton
                        label={labelButon}
                        value={row.id}
                        onClick={onClick}
                    />
                )}
                
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default TablaRow;