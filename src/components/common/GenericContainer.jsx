import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CompEntityTable from "../comp-tables/comp-entity-table";

/**
 * GenericContainer - Componente genérico SIMPLIFICADO para contenedores de entidades
 * 
 * Props:
 * - mainData: Array de datos principales del contexto
 * - mainLoading: Boolean del estado de carga principal
 * - config: Objeto de configuración SIMPLIFICADO:
 *   {
 *     main: {
 *       title: "Titulo Principal",
 *       entityName: "Entidad",
 *       label: "Acción",
 *       columns: ["Col1", "Col2"],
 *       onClick: función async que recibe ID y retorna datos procesados,
 *       getEntityById: función para recargar entidad seleccionada (opcional)
 *     },
 *     secondary: {
 *       title: "Titulo Secundario" | función(selectedEntity),
 *       entityName: "EntidadSecundaria", 
 *       label: "Acción",
 *       columns: ["Col1", "Col2"],
 *       processor: función para procesar datos antes de mostrar (opcional)
 *     }
 *   }
 */
const GenericContainer = ({ 
    mainData, 
    mainLoading, 
    config 
}) => {
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [secondaryData, setSecondaryData] = useState([]);
    const [secondaryLoading, setSecondaryLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para recargar la entidad seleccionada
    const reloadSelectedEntity = async (entityId) => {
        if (config.main.getEntityById) {
            const entity = await config.main.getEntityById(entityId);
            setSelectedEntity(entity);
        }
    };

    // Handler para clicks en la tabla principal
    const handleMainClick = async (entityId) => {
        setSecondaryLoading(true);
        setError(null);

        try {
            // Ejecutar la función onClick configurada
            const data = await config.main.onClick(entityId);
            
            // Procesar los datos si hay processor configurado
            const processedData = config.secondary.processor 
                ? config.secondary.processor(data) 
                : data;
            
            setSecondaryData(processedData);
            
            // Recargar la entidad seleccionada si está configurado
            if (config.main.getEntityById) {
                await reloadSelectedEntity(entityId);
            }
        } catch (error) {
            setError(`No se pudieron cargar los datos: ${error.message}`);
            console.error("Error en handleMainClick:", error);
        } finally {
            setSecondaryLoading(false);
        }
    };

    // Handler para clicks en la tabla secundaria (opcional)
    const handleSecondaryClick = config.secondary.onClick 
        ? (entityId) => config.secondary.onClick(entityId, selectedEntity)
        : undefined;

    // Función para generar el título secundario
    const getSecondaryTitle = () => {
        if (typeof config.secondary.title === 'function') {
            return config.secondary.title(selectedEntity);
        }
        return config.secondary.title;
    };

    if (mainLoading) return <p>Cargando...</p>;

    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                {/* Tabla Principal */}
                <Typography variant="h5" align="center" gutterBottom>
                    {config.main.title}
                </Typography>
                
                <CompEntityTable
                    data={mainData}
                    onClick={handleMainClick}
                    tableColumns={config.main.columns}
                    entityName={config.main.entityName}
                    label={config.main.label}
                />

                {/* Tabla Secundaria */}
                <Typography variant="h5" align="center" gutterBottom>
                    {getSecondaryTitle()}
                </Typography>
                
                {secondaryLoading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <CompEntityTable
                        data={secondaryData}
                        onClick={handleSecondaryClick}
                        tableColumns={config.secondary.columns}
                        entityName={config.secondary.entityName}
                        label={config.secondary.label}
                    />
                )}
            </Stack>
        </Box>
    );
};

export default GenericContainer;
