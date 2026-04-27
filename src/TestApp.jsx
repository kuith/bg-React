import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline, Container, Typography } from "@mui/material";

function TestApp() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎯 Test App - Versión Simplificada</h1>
      <p>Si ves esto, la aplicación básica funciona.</p>
      <p>Modo local habilitado ✅</p>
    </div>
  );
}

export default TestApp;