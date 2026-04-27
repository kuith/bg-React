import "./App.css";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline, Container, Typography } from "@mui/material";

// Probar solo el contexto simplificado
import { PlayersProvider, PlayersContext } from "./context/PlayersContext_simple";

function AppContent() {
  const { players, loading } = useContext(PlayersContext);

  if (loading) {
    return <div>⏳ Cargando jugadores...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎯 App Test - PlayersProvider Simple</h1>
      <p>✅ PlayersProvider funciona correctamente</p>
      <p>📊 Jugadores encontrados: {players.length}</p>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.nombre} ({player.rol})</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <PlayersProvider>
      <AppContent />
    </PlayersProvider>
  );
}

export default App;