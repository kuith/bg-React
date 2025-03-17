import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableCreator = ({ data, hiddenColumns = [] }) => {
    if (!data || data.length === 0) return <p>No hay datos disponibles.</p>;
    const headers = Object.keys(data[0]).filter(
        (header) => !hiddenColumns.includes(header)
    );
    //const rows = data.map((item) => Object.values(item));

    const headersTable = () => {
        return (
            <TableHead>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableCell  key={index}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const rowsTable = () => {
        return (
            <TableBody>
                {data.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <TableCell key={colIndex}>{item[header]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        );
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                {headersTable()}
                {rowsTable()}
            </Table>
        </TableContainer>
    );
};

export default TableCreator;