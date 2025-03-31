export default {
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Usa setupTests.js
    testEnvironment: "jsdom", // Simula un entorno de navegador
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Transforma archivos JS/JSX con Babel
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mockea estilos
    },
};
