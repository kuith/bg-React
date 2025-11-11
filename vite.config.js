import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://bg-api-997t.onrender.com',
                changeOrigin: true,
                secure: true
            }
        }
    }
});
