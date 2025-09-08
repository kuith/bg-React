import React from "react";
import { formatDate, validateAuthor } from '../../../utils/validations';
import DashEntity from '../../../components/dash/DashEntity';

const DashAuthors = ({
    data,
    onClickDeleteAuthor,
    handleSaveAuthor,
    errorMsg,
    selectedAuthor
}) => {
    // Definir columnas y campos para autores
    const columns = ['ID', 'Nombre', 'Nacionalidad'];
    const authorFields = [
        { name: "nombre", label: "Nombre", required: true },
        { name: "nacionalidad", label: "Nacionalidad", required: true },
    ];

    return (
        <DashEntity
            data={data}
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
    );
};

export default DashAuthors;