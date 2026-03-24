import axios from "axios";
import type {
    AuthSession,
    AuthUser,
    CurrentUserResponseDTO,
    LoginCredentials,
    LoginResponseDTO,
    RegisterPayload,
    RegisterResponseDTO
} from "../types/auth.types";

const API_BASE_URL = "http://localhost:4000/api";

export const authService = {
    login: async ({ email, password }: LoginCredentials): Promise<AuthSession> => {
        const response = await axios.post<LoginResponseDTO>(
            `${API_BASE_URL}/auth/login`,
            { email, password }
        );

        const {
            data: { token, user }
        } = response.data;

        return { token, user };
    },

    register: async ({ name, email, password }: RegisterPayload): Promise<RegisterResponseDTO["data"]> => {
        const response = await axios.post<RegisterResponseDTO>(
            `${API_BASE_URL}/auth/register`,
            {
                name,
                email,
                password
            }
        );

        return response.data.data;
    },

    getCurrentUser: async (token: string): Promise<AuthUser> => {
        const response = await axios.get<CurrentUserResponseDTO>(
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
