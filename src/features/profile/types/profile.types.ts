
import type { SharedUserProfile } from "../../../shared/types/user.types";

export type ProfileUser = SharedUserProfile;

export interface ProfileStatItem {
    value: string;
    label: string;
    helperText: string;
}

export interface ProfileShelfPreviewBook {
    id: string;
    title: string;
    coverUrl?: string;
}

export interface ProfileShelfItem {
    id: string;
    name: string;
    count: number;
    description: string;
    previewBooks: ProfileShelfPreviewBook[];
}

export interface ProfileActivityItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    bookId?: string;
    bookTitle?: string;
    coverUrl?: string;
    statusLabel?: string;
}

export interface ProfileSpotlightItem {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    statusLabel: string;
    progressLabel?: string;
    detail: string;
}

export interface ProfileReadingGoalSummary {
    target: number;
    current: number;
}

export interface ProfileDashboardData {
    stats: ProfileStatItem[];
    shelves: ProfileShelfItem[];
    activity: ProfileActivityItem[];
    spotlight: ProfileSpotlightItem[];
    goal: ProfileReadingGoalSummary;
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
    isProfilePublic?: boolean;
}

export interface UpdateMyProfileResponse {
    error: string | null;
    data: {
        user: ProfileUser;
    };
}
