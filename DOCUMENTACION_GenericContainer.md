# DOCUMENTACIÓN COMPLETA: GenericContainer

**Fecha:** 25 de Noviembre, 2025  
**Autor:** Refactorización de Arquitectura bg-React  
**Propósito:** Explicación detallada del componente GenericContainer para estudio e implementación

---

## ÍNDICE

1. [Visión General](#1-visión-general)
2. [Problema que Resuelve](#2-problema-que-resuelve)
3. [Arquitectura del Componente](#3-arquitectura-del-componente)
4. [Análisis Línea por Línea](#4-análisis-línea-por-línea)
5. [Flujos de Ejecución](#5-flujos-de-ejecución)
6. [Ejemplos Prácticos](#6-ejemplos-prácticos)
7. [Beneficios y Métricas](#7-beneficios-y-métricas)

---

## 1. VISIÓN GENERAL

### ¿Qué es GenericContainer?

GenericContainer es un **componente React reutilizable** que elimina la duplicación de código entre todos los contenedores de entidades de la aplicación (players, authors, matches, games).

### Patrón Arquitectónico

Implementa el patrón **"Configuración sobre Implementación"**:
- En lugar de escribir lógica repetitiva 4 veces
- Escribimos la lógica una sola vez
- Configuramos el comportamiento específico

### Estructura Visual

```
┌─────────────────────────────────────────┐
│            GenericContainer              │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │     TABLA PRINCIPAL             │    │
│  │  ┌─────┬─────────┬────────┐     │    │
│  │  │ Juan│juan@... │ Admin  │ ◄── │    │ Click
│  │  ├─────┼─────────┼────────┤     │    │
│  │  │ Ana │ ana@... │ User   │     │    │
│  │  └─────┴─────────┴────────┘     │    │
│  └─────────────────────────────────┘    │
│                   │                     │
│                   ▼ handleMainClick     │
│  ┌─────────────────────────────────┐    │
│  │   TABLA SECUNDARIA              │    │
│  │ "Partidas de Juan Pérez"        │    │
│  │  ┌─────────┬──────┬─────────┐    │    │
│  │  │ Catan   │  4   │ Juan    │    │    │
│  │  ├─────────┼──────┼─────────┤    │    │
│  │  │ Azul    │  2   │ Ana     │    │    │
│  │  └─────────┴──────┴─────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## 2. PROBLEMA QUE RESUELVE

### ANTES: Código Duplicado (340 líneas totales)

#### Players-container.jsx (85 líneas)
```javascript
const PlayersContainer = () => {
    // 🔴 Estados repetidos
    const [matches, setMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState();

    // 🔴 Función repetida
    const onClickForMatches = async (jugadorId) => {
        setLoadingMatches(true);
        setError(null);
        try {
            const data = await getMatchesByPlayer(jugadorId);
            const processedData = processMatches(data);
            setMatches(processedData);
            await reloadJugador(jugadorId);
        } catch (error) {
            setError("No se pudieron cargar las partidas.");
        } finally {
            setLoadingMatches(false);
        }
    };

    // 🔴 JSX repetido
    return (
        <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
                <Typography variant="h5">Jugadores</Typography>
                <PlayersTable onClick={onClickForMatches} />
                <Typography variant="h5">
                    Partidas de {selectedPlayer?.nombre || "ningún jugador"}
                </Typography>
                <PlayerMatchesTable matches={matches} loading={loadingMatches} />
            </Stack>
        </Box>
    );
};
```

#### Authors-container.jsx (80 líneas)
```javascript
const AuthorsContainer = () => {
    // 🔴 MISMOS estados con nombres diferentes
    const [games, setGames] = useState([]);
    const [loadingGames, setLoadingGames] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState();

    // 🔴 MISMA función con nombres diferentes
    const onClickForGames = async (authorId) => {
        setLoadingGames(true);
        setError(null);
        try {
            const data = await getGamesByAuthors(authorId);
            const processedData = processGames(data);
            setGames(processedData);
            await reloadAuthor(authorId);
        } catch (error) {
            setError("No se pudieron cargar los juegos.");
        } finally {
            setLoadingGames(false);
        }
    };

    // 🔴 MISMO JSX con nombres diferentes
    return (/* Estructura idéntica */);
};
```

### DESPUÉS: Configuración Simple (120 líneas totales)

#### Players-container.jsx (30 líneas)
```javascript
const PlayersContainer = () => {
    const { players, loading } = useContext(PlayersContext);
    
    const config = {
        main: {
            title: "Jugadores",
            onClick: async (id) => await getMatchesByPlayer(id)
        },
        secondary: {
            title: (player) => `Partidas de ${player?.nombre || "ningún jugador"}`,
            processor: processMatches
        }
    };

    return <GenericContainer mainData={players} mainLoading={loading} config={config} />;
};
```

---

## 3. ARQUITECTURA DEL COMPONENTE

### Props del Componente
```javascript
const GenericContainer = ({ 
    mainData,    // Array de datos del contexto (players, authors, etc.)
    mainLoading, // Boolean - estado de carga del contexto
    config       // Objeto de configuración completa
}) => {
```

### Objeto Config - La Clave del Sistema
```javascript
const config = {
    main: {
        title: "Jugadores",                    // Título de la tabla principal
        entityName: "Jugador",                 // Para labels y mensajes
        label: "Partidas",                     // Texto del botón de acción
        columns: ["Nombre", "Correo", "Rol"],  // Columnas a mostrar
        onClick: async (id) => { /* API call */ },  // Función al hacer click
        getEntityById: getPlayerById           // Función para recargar entidad (opcional)
    },
    secondary: {
        title: (selectedEntity) => `Partidas de ${selectedEntity?.nombre}`,  // Título dinámico
        entityName: "Partida",                 // Para labels
        label: "Detalles",                     // Texto del botón
        columns: ["Juego", "Jugadores", "Ganadores"],  // Columnas
        processor: processMatches              // Función para procesar datos (opcional)
    }
}
```

### Estados Internos
```javascript
const [selectedEntity, setSelectedEntity] = useState(null);     // Entidad seleccionada (jugador, autor)
const [secondaryData, setSecondaryData] = useState([]);         // Datos de tabla secundaria (partidas, juegos)
const [secondaryLoading, setSecondaryLoading] = useState(false); // Loading de tabla secundaria
const [error, setError] = useState(null);                       // Errores de API
```

---

## 4. ANÁLISIS LÍNEA POR LÍNEA

### IMPORTS Y DECLARACIÓN

```javascript
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CompEntityTable from "../comp-tables/comp-entity-table";
```
**¿Qué importa?**
- `useState`: Para manejar estados internos
- Componentes de Material-UI para el layout
- `CompEntityTable`: La tabla genérica que usaremos para TODO

---

### FUNCIÓN 1: reloadSelectedEntity

```javascript
const reloadSelectedEntity = async (entityId) => {
    if (config.main.getEntityById) {                    // ← ¿Está configurada la función?
        const entity = await config.main.getEntityById(entityId); // ← Llama getPlayerById, getAuthorById, etc.
        setSelectedEntity(entity);                      // ← Guarda la entidad completa
    }
};
```

**¿Para qué sirve?**
- **Propósito**: Obtener los datos completos de la entidad seleccionada
- **Cuándo se ejecuta**: Después de hacer click en una fila de la tabla principal
- **Por qué es necesaria**: Para mostrar títulos dinámicos como "Partidas de Juan Pérez"

**Flujo de datos:**
```
Click en fila "Juan" (ID: 123)
        ↓
reloadSelectedEntity(123)
        ↓
getPlayerById(123) → { id: 123, nombre: "Juan Pérez", correo: "juan@mail.com" }
        ↓
setSelectedEntity({ id: 123, nombre: "Juan Pérez", ... })
        ↓
Título cambia a "Partidas de Juan Pérez"
```

---

### FUNCIÓN 2: handleMainClick (LA MÁS IMPORTANTE)

```javascript
const handleMainClick = async (entityId) => {
    setSecondaryLoading(true);  // ← 1. Activar loading en tabla secundaria
    setError(null);             // ← 2. Limpiar errores previos
```

**Paso 1 - Preparación:**
- Muestra "Cargando..." en la tabla secundaria
- Limpia cualquier error anterior para empezar limpio

```javascript
    try {
        // Ejecutar la función onClick configurada
        const data = await config.main.onClick(entityId);
```

**Paso 2 - Ejecución de API:**
- Ejecuta la función configurada en cada container
- **En players**: `getMatchesByPlayer(entityId)`
- **En authors**: `getGamesByAuthors(entityId)`
- **Resultado**: `data` contiene respuesta cruda de la API

```javascript
        // Procesar los datos si hay processor configurado
        const processedData = config.secondary.processor 
            ? config.secondary.processor(data)  // ← Aplica processMatches, processGames, etc.
            : data;                            // ← O usa datos tal como vienen
```

**Paso 3 - Procesamiento:**
- Si hay processor configurado, transforma los datos
- Si no hay processor, usa los datos crudos

**Ejemplo de transformación:**
```javascript
// Datos crudos de API:
data = [
    { 
        id: 1, 
        game: { name: "Catan" }, 
        players: [
            { id: 1, name: "Juan" },
            { id: 2, name: "Ana" }
        ]
    }
];

// Después de processMatches:
processedData = [
    { 
        id: 1, 
        Juego: "Catan", 
        Jugadores: "Juan, Ana",
        Ganadores: "Juan"
    }
];
```

```javascript
        setSecondaryData(processedData); // ← 4. Guardar datos para la tabla
```

**Paso 4 - Actualización de datos:**
- Guarda los datos procesados
- La tabla secundaria se renderiza automáticamente

```javascript
        // Recargar la entidad seleccionada si está configurado
        if (config.main.getEntityById) {
            await reloadSelectedEntity(entityId); // ← 5. Para el título dinámico
        }
```

**Paso 5 - Recarga de entidad:**
- Solo si está configurado `getEntityById`
- Obtiene datos completos para mostrar en el título

```javascript
    } catch (error) {
        setError(`No se pudieron cargar los datos: ${error.message}`);
        console.error("Error en handleMainClick:", error);
    } finally {
        setSecondaryLoading(false); // ← 6. SIEMPRE quitar loading
    }
```

**Paso 6 - Manejo de errores y cleanup:**
- `catch`: Captura cualquier error (API caída, red, etc.)
- `finally`: SIEMPRE quita el loading, sin importar éxito o fallo

---

### FUNCIÓN 3: handleSecondaryClick

```javascript
const handleSecondaryClick = config.secondary.onClick 
    ? (entityId) => config.secondary.onClick(entityId, selectedEntity)
    : undefined;
```

**¿Qué hace?**
- **Si hay función configurada**: Prepara el handler para clicks en tabla secundaria
- **Si no hay función**: Queda como `undefined` (no clickeable)
- **Uso futuro**: Para modales de detalles, edición, etc.

---

### FUNCIÓN 4: getSecondaryTitle

```javascript
const getSecondaryTitle = () => {
    if (typeof config.secondary.title === 'function') {
        return config.secondary.title(selectedEntity); // ← Ejecuta función con entidad
    }
    return config.secondary.title;                     // ← Retorna string fijo
};
```

**¿Qué hace?**
- **Title es función**: `(player) => "Partidas de " + player.nombre`
- **Title es string**: `"Partidas"`
- **Resultado**: Títulos dinámicos vs estáticos

**Ejemplo práctico:**
```javascript
// Configuración con función:
config.secondary.title = (player) => `Partidas de ${player?.nombre || "ningún jugador"}`;

// Resultado dinámico:
// selectedEntity = null → "Partidas de ningún jugador"
// selectedEntity = {nombre: "Juan"} → "Partidas de Juan"
```

---

### EARLY RETURN

```javascript
if (mainLoading) return <p>Cargando...</p>;
```
**¿Qué hace?** Si el contexto está cargando, muestra loading y detiene el render completo.

---

### RENDER JSX - ESTRUCTURA PRINCIPAL

```javascript
return (
    <Box sx={{ width: "100%" }}>          // ← Container principal
        <Stack spacing={2}>                // ← Layout vertical con espaciado
```

**Layout base:** Box para ancho completo, Stack para layout vertical

#### TABLA PRINCIPAL

```javascript
            {/* Tabla Principal */}
            <Typography variant="h5" align="center" gutterBottom>
                {config.main.title}        // ← "Jugadores", "Autores", etc.
            </Typography>
            
            <CompEntityTable
                data={mainData}                    // ← players, authors del contexto
                onClick={handleMainClick}          // ← Nuestra función universal
                tableColumns={config.main.columns} // ← ["Nombre", "Correo", "Rol"]
                entityName={config.main.entityName} // ← "Jugador", "Autor"
                label={config.main.label}          // ← "Partidas", "Juegos"
            />
```

**¿Qué hace cada prop?**
- `data`: Los datos del contexto (viene de PlayersContext, AuthorsContext, etc.)
- `onClick`: Nuestra función que maneja todos los clicks
- `tableColumns`: Las columnas específicas de cada tabla
- `entityName`: Para labels internos de la tabla
- `label`: Texto que aparece en el botón de acción

#### TABLA SECUNDARIA CON CONDICIONALES

```javascript
            {/* Tabla Secundaria */}
            <Typography variant="h5" align="center" gutterBottom>
                {getSecondaryTitle()}      // ← Título dinámico o fijo
            </Typography>
            
            {secondaryLoading ? (          // ← ¿Está cargando?
                <p>Cargando...</p>                
            ) : error ? (                  // ← ¿Hay error?
                <p style={{ color: 'red' }}>{error}</p>  
            ) : (                         // ← Todo OK, mostrar tabla
                <CompEntityTable
                    data={secondaryData}           // ← Partidas, juegos cargados
                    onClick={handleSecondaryClick} // ← Click opcional
                    tableColumns={config.secondary.columns}
                    entityName={config.secondary.entityName}
                    label={config.secondary.label}
                />
            )}
```

**Flujo condicional:**
1. **Si `secondaryLoading === true`**: Muestra "Cargando..."
2. **Si `error !== null`**: Muestra error en rojo
3. **Si todo OK**: Muestra la tabla con datos

---

## 5. FLUJOS DE EJECUCIÓN

### FLUJO 1: Carga Inicial

```
1. Componente se monta
        ↓
2. mainLoading = true (del contexto)
        ↓
3. Render: <p>Cargando...</p>
        ↓
4. Contexto termina de cargar
        ↓
5. mainLoading = false
        ↓
6. Render: Tabla principal con datos
7. Tabla secundaria: título + condicional (vacía inicialmente)
```

### FLUJO 2: Click en Tabla Principal

```
Usuario hace click en "Juan Pérez" (ID: 123)
                    ↓
handleMainClick(123) se ejecuta
                    ↓
setSecondaryLoading(true) → Tabla secundaria muestra "Cargando..."
setError(null) → Limpia errores previos
                    ↓
await config.main.onClick(123)
  └→ En players: await getMatchesByPlayer(123)
  └→ En authors: await getGamesByAuthors(123)
                    ↓
API responde con datos crudos: 
[{id: 1, game: {name: "Catan"}, players: [...]}]
                    ↓
config.secondary.processor(data)
  └→ En players: processMatches(data)
  └→ En authors: processGames(data)
                    ↓
Datos procesados: 
[{id: 1, Juego: "Catan", Jugadores: "Juan, Ana"}]
                    ↓
setSecondaryData(processedData) → Datos listos para tabla
                    ↓
if (config.main.getEntityById) {
    await reloadSelectedEntity(123)
        ↓
    getPlayerById(123) → {id: 123, nombre: "Juan Pérez"}
        ↓
    setSelectedEntity(playerData)
}
                    ↓
setSecondaryLoading(false) → Quita "Cargando..."
                    ↓
Render final:
- Título: "Partidas de Juan Pérez"
- Tabla: Datos de partidas de Juan
```

### FLUJO 3: Manejo de Errores

```
Usuario hace click → handleMainClick(id)
                    ↓
setSecondaryLoading(true) → "Cargando..."
                    ↓
await config.main.onClick(id)
                    ↓
❌ API falla (500, network error, etc.)
                    ↓
catch (error) se ejecuta
                    ↓
setError("No se pudieron cargar los datos: Network Error")
                    ↓
finally se ejecuta SIEMPRE
                    ↓
setSecondaryLoading(false) → Quita "Cargando..."
                    ↓
Render final:
- Título: sigue igual
- Tabla: <p style={{color: 'red'}}>No se pudieron cargar los datos: Network Error</p>
```

---

## 6. EJEMPLOS PRÁCTICOS

### EJEMPLO 1: Configuración Players

```javascript
// players-container.jsx
const containerConfig = {
    main: {
        title: "Jugadores",                    // Título fijo
        entityName: "Jugador",                 // Para mensajes
        label: "Partidas",                     // Botón dice "Partidas"
        columns: ["Nombre", "Correo", "Rol"],  // 3 columnas
        onClick: async (jugadorId) => {
            const data = await getMatchesByPlayer(jugadorId);
            return data;                       // Retorna datos crudos
        },
        getEntityById: getPlayerById           // Para recargar jugador
    },
    secondary: {
        title: (selectedPlayer) => 
            `Partidas de ${selectedPlayer?.nombre || "ningún jugador seleccionado"}`,
        entityName: "Partida",
        label: "Detalles",
        columns: ["Juego", "Jugadores", "Ganadores"],
        processor: processMatches              // Transforma datos
    }
};
```

### EJEMPLO 2: Configuración Authors

```javascript
// authors-container.jsx
const containerConfig = {
    main: {
        title: "Autores",
        entityName: "Autor", 
        label: "Juegos",
        columns: ["Nombre", "Nacionalidad"],   // Diferentes columnas
        onClick: async (authorId) => {
            const data = await getGamesByAuthors(authorId); // Diferente API
            return data;
        },
        getEntityById: getAuthorById           // Diferente función
    },
    secondary: {
        title: (selectedAuthor) => 
            `Juegos de ${selectedAuthor?.nombre || "ningún autor seleccionado"}`,
        entityName: "Juego",                   // Diferente entidad
        label: "Detalles", 
        columns: ["nombre", "tipo", "descripcion"], // Diferentes columnas
        processor: processGames                // Diferente processor
    }
};
```

### EJEMPLO 3: Uso sin Processor

```javascript
// Si los datos de API ya vienen en formato correcto
const containerConfig = {
    main: {
        // ... configuración normal
        onClick: async (id) => {
            const data = await getSomeCleanData(id);
            return data; // Ya viene formateado
        }
    },
    secondary: {
        // ... otras props
        // processor: NO SE INCLUYE - datos se usan tal como vienen
    }
};
```

### EJEMPLO 4: Uso sin getEntityById

```javascript
// Si no necesitas título dinámico
const containerConfig = {
    main: {
        // ... configuración normal
        onClick: async (id) => await getData(id),
        // getEntityById: NO SE INCLUYE
    },
    secondary: {
        title: "Datos Relacionados", // Título fijo, no función
        // ... resto igual
    }
};
```

---

## 7. BENEFICIOS Y MÉTRICAS

### Reducción de Código

| Métrica | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| **Líneas totales** | 340 | 120 | 65% |
| **Archivos de tabla** | 4 específicas | 1 genérica | 75% |
| **Funciones duplicadas** | 4 copias | 1 original | 100% |
| **Estados duplicados** | 16 estados | 4 estados | 75% |
| **Lógica de manejo de errores** | 4 lugares | 1 lugar | 100% |

### Mantenibilidad

#### ANTES:
```
Bug en loading state → Arreglar en 4 lugares
Nueva feature → Implementar 4 veces
Cambio en UX → Modificar 4 componentes
```

#### DESPUÉS:
```
Bug en loading state → Arreglar en 1 lugar
Nueva feature → Implementar 1 vez
Cambio en UX → Modificar 1 componente
```

### Consistency (Consistencia)

#### ANTES:
```javascript
// En players-container
const onClickForMatches = async (id) => {
    setLoadingMatches(true);
    // ... lógica
};

// En authors-container  
const onClickForGames = async (id) => {
    setLoadingGames(true); // ← Diferente nombre
    // ... lógica CASI idéntica pero con pequeñas diferencias
};
```

#### DESPUÉS:
```javascript
// EN TODOS LOS CONTAINERS:
// Misma función, mismo comportamiento, misma UX
const handleMainClick = async (entityId) => {
    // Lógica idéntica garantizada
};
```

### Extensibilidad

#### Agregar nuevo container (Games):
```javascript
// ANTES: Copiar y pegar 80 líneas, modificar todo
// DESPUÉS: Solo configuración (25 líneas)

const GamesContainer = () => {
    const { games, loading } = useContext(GamesContext);
    
    const config = {
        main: {
            title: "Juegos",
            onClick: async (id) => await getMatchesByGame(id),
            // ... configuración específica
        },
        secondary: {
            title: (game) => `Partidas de ${game?.nombre}`,
            processor: processGameMatches
        }
    };

    return <GenericContainer mainData={games} mainLoading={loading} config={config} />;
};
```

### Testing

#### ANTES:
```
- Testear lógica en 4 componentes diferentes
- Mocks para 4 funciones similares
- 4 suites de testing
```

#### DESPUÉS:
```
- Testear lógica en 1 componente
- Mocks para configuraciones diferentes  
- 1 suite completa + tests de configuración
```

---

## CONCLUSIÓN

GenericContainer representa un **cambio arquitectónico fundamental**:

### De Implementación Repetitiva a Configuración Declarativa

**Antes:** "Escribir la misma lógica 4 veces con pequeñas variaciones"
**Después:** "Declarar qué queremos, no cómo hacerlo"

### Principios Aplicados

1. **DRY (Don't Repeat Yourself)**: Eliminación total de duplicación
2. **Single Responsibility**: Un componente, una responsabilidad bien definida
3. **Open/Closed**: Abierto a extensión (nuevos configs), cerrado a modificación
4. **Configuration over Code**: Preferir configuración sobre implementación

### Impacto en el Desarrollo

- **Velocidad**: Nuevos containers en minutos, no horas
- **Calidad**: Menos bugs por menos código duplicado
- **Consistencia**: UX uniforme garantizada
- **Mantenimiento**: Cambios centralizados

Este patrón convierte una aplicación con **arquitectura repetitiva** en una aplicación con **arquitectura escalable y mantenible**.

---

**FIN DE DOCUMENTACIÓN**

*Esta documentación cubre completamente el componente GenericContainer. Para dudas específicas sobre implementación, revisar los ejemplos prácticos en la sección 6.*