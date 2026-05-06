import { httpClient } from "../../../shared/api/httpClient";

interface FollowMutationPayload {
    following: boolean;
    targetUserId: string;
    followerCount: number;
    followingCount: number;
}

interface FollowMutationApiResponse {
    error?: string | null;
    message?: string;
    data?: FollowMutationPayload;
}

export interface FollowMutationResult {
    following: boolean;
    targetUserId: string;
    followerCount: number;
    followingCount: number;
}

const FOLLOWS_BASE_PATH = "/follows";

const mapFollowMutationResponse = (
    payload: FollowMutationApiResponse
): FollowMutationResult => {
    if (payload.error) {
        throw new Error(payload.error);
    }

    if (!payload.data) {
        throw new Error("Follow response data was not returned.");
    }

    return payload.data;
};

export const followReader = async (targetUserId: string): Promise<FollowMutationResult> => {
    const response = await httpClient.post<FollowMutationApiResponse>(
        `${FOLLOWS_BASE_PATH}/${encodeURIComponent(targetUserId)}`
    );

    return mapFollowMutationResponse(response.data);
};

export const unfollowReader = async (targetUserId: string): Promise<FollowMutationResult> => {
    const response = await httpClient.delete<FollowMutationApiResponse>(
        `${FOLLOWS_BASE_PATH}/${encodeURIComponent(targetUserId)}`
    );

    return mapFollowMutationResponse(response.data);
};
