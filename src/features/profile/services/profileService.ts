

import { httpClient } from "../../../shared/api/httpClient";
import type {
    GetMyProfileResponse,
    UpdateMyProfileInput,
    UpdateMyProfileResponse,
    ProfileUser
} from "../types/profile.types";

const PROFILE_BASE_PATH = "/users";

const mapUser = (rawUser: any): ProfileUser => ({
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    avatarUrl: rawUser.avatarUrl,
    coverImageUrl: rawUser.coverImageUrl,
    bio: rawUser.bio,
    isProfilePublic: rawUser.isProfilePublic,
    role: rawUser.role
});

export const getMyProfile = async (): Promise<ProfileUser> => {
    const response = await httpClient.get<GetMyProfileResponse>(
        `${PROFILE_BASE_PATH}/me`
    );

    if (response.data.error) {
        throw new Error(response.data.error);
    }

    return mapUser(response.data.data.user);
};

export const updateMyProfile = async (
    input: UpdateMyProfileInput
): Promise<ProfileUser> => {
    const formData = new FormData();

    if (input.name) {
        formData.append("name", input.name);
    }

    if (input.bio) {
        formData.append("bio", input.bio);
    }

    if (input.avatarFile) {
        formData.append("avatar", input.avatarFile);
    }

    if (input.coverFile) {
        formData.append("cover", input.coverFile);
    }

    const response = await httpClient.patch<UpdateMyProfileResponse>(
        `${PROFILE_BASE_PATH}/me`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    if (response.data.error) {
        throw new Error(response.data.error);
    }

    return mapUser(response.data.data.user);
};