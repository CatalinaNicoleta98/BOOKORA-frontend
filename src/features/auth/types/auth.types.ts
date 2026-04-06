export type AuthUser = {
    id: string;
    name: string;
    email: string;

    // Profile visuals
    avatarUrl?: string;
    coverImageUrl?: string;

    // Backward compatibility
    profilePicture?: string;

    bio?: string;
    isProfilePublic?: boolean;
    role?: string;
};

export type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    user: AuthUser | null;
    isLoading: boolean;
};

export type AuthSession = {
    token: string;
    user: AuthUser;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

export type LoginResponseDTO = {
    error: string | null;
    data: {
        token: string;
        user: AuthUser;
    };
};

export type RegisterResponseDTO = {
    error: string | null;
    data: {
        id: string;
        message: string;
    };
};

export type CurrentUserResponseDTO = {
    error: string | null;
    data: {
        user: AuthUser;
    };
};