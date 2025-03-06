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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
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
const del = (endpoint) => fetchData(endpoint, { method: "DELETE" });

export const api = { get, post, put, del };
