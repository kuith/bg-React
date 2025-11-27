import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
 *       processor: función para procesar datos antes de mostrar (opcional),
 *       type: "table" | "modal" - tipo de vista secundaria (opcional, default: "table"),
 *       onClick: función async para clicks en tabla secundaria (opcional)
 *     },
 *     modal: {
 *       title: "Titulo del Modal",
 *       Component: ComponenteModal - componente a renderizar en el modal
 *     },
 *     secondaryModal: {
 *       title: "Titulo del Modal Secundario",
 *       Component: ComponenteModal - componente para modal de tabla secundaria,
 *       entityProp: "nombre_prop" - nombre de la prop a pasar al componente
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
    const [modalOpen, setModalOpen] = useState(false);
    const [secondaryModalOpen, setSecondaryModalOpen] = useState(false);
    const [selectedSecondaryEntity, setSelectedSecondaryEntity] = useState(null);

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
            const processedData = config.secondary?.processor 
                ? config.secondary.processor(data) 
                : data;
            
            setSecondaryData(processedData);
            
            // Recargar la entidad seleccionada si está configurado
            if (config.main.getEntityById) {
                await reloadSelectedEntity(entityId);
            }

            // Si es tipo modal, abrir el modal
            if (config.secondary?.type === "modal" || config.modal) {
                setModalOpen(true);
            }
        } catch (error) {
            setError(`No se pudieron cargar los datos: ${error.message}`);
            console.error("Error en handleMainClick:", error);
        } finally {
            setSecondaryLoading(false);
        }
    };

    // Handler para clicks en la tabla secundaria (opcional)
    const handleSecondaryClick = config.secondary?.onClick 
        ? async (entityId) => {
            try {
                const data = await config.secondary.onClick(entityId, selectedEntity, secondaryData);
                setSelectedSecondaryEntity(data);
                setSecondaryModalOpen(true);
            } catch (error) {
                console.error("Error en handleSecondaryClick:", error);
            }
        }
        : undefined;

    // Función para generar el título secundario
    const getSecondaryTitle = () => {
        if (config.secondary && typeof config.secondary.title === 'function') {
            return config.secondary.title(selectedEntity);
        }
        return config.secondary?.title || "";
    };

    // Función para cerrar modal principal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEntity(null);
    };

    // Función para cerrar modal secundario
    const handleCloseSecondaryModal = () => {
        setSecondaryModalOpen(false);
        setSelectedSecondaryEntity(null);
    };

    if (mainLoading) return <p>Cargando...</p>;

    return (
        <Box sx={{ 
            width: "100%", 
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, sm: 2 }
        }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
                {/* Tabla Principal */}
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom
                    sx={{ 
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                        mb: { xs: 1, md: 2 }
                    }}
                >
                    {config.main.title}
                </Typography>
                
                <CompEntityTable
                    data={mainData}
                    onClick={handleMainClick}
                    tableColumns={config.main.columns}
                    entityName={config.main.entityName}
                    label={config.main.label}
                />

                {/* Tabla Secundaria o Modal */}
                {config.secondary && config.secondary.type !== "modal" && (
                    <>
                        <Typography 
                            variant="h6" 
                            align="center" 
                            gutterBottom
                            sx={{ 
                                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                                mb: { xs: 1, md: 2 },
                                px: { xs: 1, md: 0 }
                            }}
                        >
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
                    </>
                )}

                {/* Modal Principal */}
                {(config.secondary?.type === "modal" || config.modal) && (
                    <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            {config.modal?.title || "Detalles"}
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseModal}
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {config.modal?.Component && (
                                <config.modal.Component 
                                    {...(secondaryData && { [config.modal.entityProp || 'entity']: secondaryData })}
                                />
                            )}
                        </DialogContent>
                    </Dialog>
                )}

                {/* Modal Secundario (para clicks en tabla secundaria) */}
                {config.secondaryModal && (
                    <Dialog open={secondaryModalOpen} onClose={handleCloseSecondaryModal} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            {config.secondaryModal.title || "Detalles"}
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseSecondaryModal}
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {config.secondaryModal.Component && (
                                <config.secondaryModal.Component 
                                    {...(selectedSecondaryEntity && { [config.secondaryModal.entityProp || 'entity']: selectedSecondaryEntity })}
                                />
                            )}
                        </DialogContent>
                    </Dialog>
                )}
            </Stack>
        </Box>
    );
};

export default GenericContainer;
