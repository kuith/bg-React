export default {
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Archivo de configuración adicional
    testEnvironment: "jsdom", // Simula un entorno de navegador
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Usa babel-jest para transformar archivos JS/JSX
    },
    transformIgnorePatterns: [
        "/node_modules/(?!@babel/runtime)", // Asegúrate de transformar dependencias necesarias
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mockea estilos
    },
};
