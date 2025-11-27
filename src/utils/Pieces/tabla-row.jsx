import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, Container } from "@mui/material";
import TablaBox from "./tabla-box";
import TablaButton from "./tabla-button";

const TablaRow = ({ columns, row, index, labelButon, onClick} ) => {
    return (
        <TableRow>
            <TableCell colSpan={4} sx={{ padding: 0 }}>
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent={{ xs: "flex-start", md: "space-evenly" }}
                    alignItems={{ xs: "stretch", md: "center" }}
                    sx={{
                        padding: { xs: 2, md: 1 },
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        gap: { xs: 1, md: 0 },
                        minHeight: { xs: 'auto', md: '60px' },
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