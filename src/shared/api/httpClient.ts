import axios from "axios";
import { API_CONFIG } from "./apiConfig";

export const httpClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false
});

// Future improvement point:
// Here we will later add request / response interceptors
// for automatic token attachment, global error handling, etc.ªß