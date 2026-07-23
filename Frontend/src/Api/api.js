import axios from "axios";

const api = axios.create({
    // In production, VITE_API_URL is set at build time (e.g. on Vercel).
    // Locally it falls back to the dev backend.
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
    withCredentials: true,  // normally, brower don't send cookies, but when credentials = true , axios tells Whenever talking to my backend, also send the cookies
});

export default api;