

import axios from "axios";

// IMPORTANT:
// In production we will read this from environment variables.
// For now we keep a safe fallback so the app works immediately.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false
});

// Future improvement point:
// Here we will later add request / response interceptors
// for automatic token attachment, global error handling, etc.