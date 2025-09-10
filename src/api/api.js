const API_URL = "https://bg-api-997t.onrender.com/api";

const fetchData = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });
        if (!response.ok) {
            // Intenta leer el error como JSON, si falla, como texto
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                throw new Error(data.message || text);
            } catch {
                throw new Error(text);
            }
        }
        // Si la respuesta es vacía (ej: DELETE con 200 y sin body), no intentes parsear JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error("Error en la API:", error);
        throw error;
    }
};

const get = (endpoint) => fetchData(endpoint, { method: "GET" });
const post = (endpoint, body) =>
    fetchData(endpoint, { method: "POST", body: JSON.stringify(body) });

const put = (endpoint, body) =>
    fetchData(endpoint, { method: "PUT", body: JSON.stringify(body) });
const patch = (endpoint, body) =>
    fetchData(endpoint, { method: "PATCH", body: JSON.stringify(body) });
const del = (endpoint) => fetchData(endpoint, { method: "DELETE" });

export const api = { get, post, put, patch, del };

