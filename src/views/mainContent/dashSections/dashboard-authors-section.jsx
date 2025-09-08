import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { AuthorsContext } from "../../../context/AuthorsContext";
import { getAuthorById, createAuthor, deleteAuthor, updateAuthor } from "../../../api/authorsService";
import { ActualDate } from "../../../utils/validations";
import DashAuthors from "../../dashboard/dash-authors/dash-authors";
import { processAuthors } from '../../../utils/processors';

const DashboardAuthorsSection = () => {
    const { authors, fetchAuthors } = useContext(AuthorsContext);
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    const reload = async (authorId) => {
        const author = await getAuthorById(authorId);
        setSelectedAuthor(author);
    };

    const onClickDeleteAuthor = async (authorId) => {
        console.log("Eliminar autor con ID:", authorId);
        try {
            await deleteAuthor(authorId);
            alert("Autor eliminado con éxito");
            await fetchAuthors();
        } catch (error) {
            alert(error.message || "Error al eliminar autor");
        }
    };

    const onClickUpdateAuthor = async (authorId) => {
        console.log("Actualizar autor con ID:", authorId);
        try {
            const author = await getAuthorById(authorId);
            setSelectedAuthor(author);
        } catch (error) {
            alert(error.message || "Error al actualizar autor");
        }
    };

    const handleSaveAuthor = async (dataAuthor) => {
        try {
            // Si es alta, añade fecha_registro si no existe
            if (!dataAuthor.id && !dataAuthor.fecha_registro) {
                dataAuthor.fecha_registro = ActualDate();
            }
            // Si es edición, conserva la fecha_registro original si existe
            if (dataAuthor.id && !dataAuthor.fecha_registro && selectedAuthor?.fecha_registro) {
                dataAuthor.fecha_registro = selectedAuthor.fecha_registro;
            }
            if (dataAuthor.id) {
                await updateAuthor(dataAuthor.id, dataAuthor);
                alert("Autor actualizado con éxito");
            } else {
                await createAuthor(dataAuthor);
                alert("Autor creado con éxito");
            }
            setErrorMsg("");
            setSelectedAuthor(null);
            await fetchAuthors();
        } catch (error) {
            setErrorMsg(error.message || "Error al guardar autor");
        }
    };

    // Log para depuración: ver cómo llegan los autores desde el backend
    console.log('Autores en dashboard-authors-section:', authors);
    return (
        <Paper>
            <DashAuthors
                data={processAuthors(authors)}
                onClickDeleteAuthor={onClickDeleteAuthor}
                onClickUpdateAuthor={onClickUpdateAuthor}
                handleSaveAuthor={handleSaveAuthor}
                errorMsg={errorMsg}
                selectedAuthor={selectedAuthor}
            />
        </Paper>
    );
};

export default DashboardAuthorsSection;
