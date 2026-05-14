export interface SharedUserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    coverImageUrl?: string;
    bio?: string;
    isProfilePublic?: boolean;
    role?: string;
}
