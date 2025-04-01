import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock de import.meta.env
global.importMetaEnv = {
    VITE_BASE_URL: "/images/",
};

Object.defineProperty(global, "import", {
    writable: true,
    value: {
        meta: {
            env: global.importMetaEnv,
        },
    },
});
