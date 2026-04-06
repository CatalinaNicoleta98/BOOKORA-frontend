

export interface ProfileUser {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    coverImageUrl?: string;
    bio?: string;
    isProfilePublic?: boolean;
    role?: string;
}

export interface GetMyProfileResponse {
    error: string | null;
    data: {
        user: ProfileUser;
    };
}

export interface UpdateMyProfileInput {
    name?: string;
    bio?: string;
    avatarFile?: File | null;
    coverFile?: File | null;
}

export interface UpdateMyProfileResponse {
    error: string | null;
    data: {
        user: ProfileUser;
    };
}