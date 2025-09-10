import React, { useState } from "react";
import { formatDate, validateAuthor } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';
import GenericDetailModal from '../../../components/common/GenericDetailModal';
import Button from "@mui/material/Button";

const DashAuthors = ({
    data,
    onClickDeleteAuthor,
    onClickUpdateAuthor,
    handleSaveAuthor,
    errorMsg,
    selectedAuthor
}) => {
    // Definir columnas y campos para autores
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'nacionalidad', label: 'Nacionalidad' },
        { key: 'detalles', label: 'Detalles' }
    ];
    const authorFields = [
        { name: "nombre", label: "Nombre", required: true },
        { name: "nacionalidad", label: "Nacionalidad", required: true },
    ];

        // Estado para el modal de detalles
    const [openDetail, setOpenDetail] = useState(false);
    const [authorDetail, setAuthorDetail] = useState(null);

    // Data con botón Detalles
    const dataWithDetails = data.map(author => ({
        ...author,
        detalles: (
            <Button
                size="small"
                variant="outlined"
                onClick={() => {
                    setAuthorDetail(author);
                    setOpenDetail(true);
                }}
            >
                Detalles
            </Button>
        )
    }));

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setAuthorDetail(null);
    };


    // Opcional: traducir claves a labels legibles
    const labelMap = {
        nombre: "Nombre",
        nacionalidad: "Nacionalidad",
        detalles: "Detalles"
    };

    return (
        <>
            <DashEntity
                data={dataWithDetails}
                columns={columns}
                fields={authorFields}
                title="Autores"
                onDelete={onClickDeleteAuthor}
                onSave={handleSaveAuthor}
                errorMsg={errorMsg}
                selectedEntity={selectedAuthor}
                validateFn={validateAuthor}
                entityLabel="Autor"
            />
            <GenericDetailModal
                open={openDetail}
                onClose={handleCloseDetail}
                entity={authorDetail}
                entityLabel="Autor"
                labelMap={labelMap}
                onEdit={authorDetail ? () => { setOpenDetail(false); onClickUpdateAuthor(authorDetail.id); } : undefined}
                onDelete={authorDetail ? () => { setOpenDetail(false); onClickDeleteAuthor(authorDetail.id); } : undefined}
            />
        </>
    );
};


export default DashAuthors;