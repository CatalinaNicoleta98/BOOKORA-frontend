import axios from "axios";
import type { LoginResponse, RegisterResponse } from "../types/auth.types";
import type { AuthUser } from "../types/auth.types";

const API_BASE_URL = "http://localhost:4000/api";

export const authService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await axios.post<LoginResponse>(
            `${API_BASE_URL}/auth/login`,
            { email, password }
        );

        return response.data;
    },

    register: async (
        name: string,
        email: string,
        password: string
    ): Promise<RegisterResponse> => {
        const response = await axios.post<RegisterResponse>(
            `${API_BASE_URL}/auth/register`,
            {
                name,
                email,
                password
            }
        );

        return response.data;
    },

    getCurrentUser: async (token: string): Promise<AuthUser> => {
        const response = await axios.get(
            `${API_BASE_URL}/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.data.user;
    }
};
