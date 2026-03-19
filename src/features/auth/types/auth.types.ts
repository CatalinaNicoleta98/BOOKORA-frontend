export type AuthUser = {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    isProfilePublic?: boolean;
    role?: string;
};

export type LoginResponse = {
    error: string | null;
    data: {
        userId: string;
        token: string;
        user: AuthUser;
    };
};

export type RegisterResponse = {
    error: string | null;
    data: {
        id: string;
        message: string;
    };
};

export type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    user: AuthUser | null;
    isLoading: boolean;
};