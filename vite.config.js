import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Esto asegura que `expect` y otras funciones estén disponibles globalmente
        environment: "jsdom", // Esto simula el DOM para las pruebas
        setupFiles: "src/setupTests.js", // Asegúrate de que setupTests.js esté configurado
    },
});
