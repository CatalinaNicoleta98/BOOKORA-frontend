import axios from "axios";
import { API_CONFIG } from "./apiConfig";
import { authStorage } from "../../features/auth/services/authStorage";

export const httpClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false
});

httpClient.interceptors.request.use((config) => {
    const token = authStorage.getToken();

    if (token) {
        config.headers = config.headers ?? {};
        config.headers["auth-token"] = token;
    }

    return config;
});

