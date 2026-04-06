import type {
    AuthSession,
    AuthUser,
    CurrentUserResponseDTO,
    LoginCredentials,
    LoginResponseDTO,
    RegisterPayload,
    RegisterResponseDTO
} from "../types/auth.types";
import { httpClient } from "../../../shared/api/httpClient";

export const authService = {
    login: async ({ email, password }: LoginCredentials): Promise<AuthSession> => {
        const response = await httpClient.post<LoginResponseDTO>(
            "/auth/login",
            { email, password }
        );

        const {
            data: { token, user }
        } = response.data;

        return { token, user };
    },

    register: async ({ name, email, password }: RegisterPayload): Promise<RegisterResponseDTO["data"]> => {
        const response = await httpClient.post<RegisterResponseDTO>(
            "/auth/register",
            {
                name,
                email,
                password
            }
        );

        return response.data.data;
    },

    getCurrentUser: async (token: string): Promise<AuthUser> => {
        const response = await httpClient.get<CurrentUserResponseDTO>(
            "/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.data.user;
    },

    updateProfile: async (
        payload: {
            name?: string;
            avatarUrl?: string;
            coverImageUrl?: string;
            bio?: string;
        },
        token: string
    ): Promise<AuthUser> => {
        const response = await httpClient.patch(
            "/auth/profile",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.data.user;
    }
};
