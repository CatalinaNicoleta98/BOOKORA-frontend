import type {
    AuthSession,
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
    }
};
