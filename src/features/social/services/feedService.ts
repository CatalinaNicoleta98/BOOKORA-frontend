import { httpClient } from "../../../shared/api/httpClient";
import type { HomeFeedData, HomeFeedResponse } from "../types/feed.types";

interface GetHomeFeedParams {
    limit?: number;
    cursor?: string;
    includeSelf?: boolean;
}

export const getHomeFeed = async (
    params?: GetHomeFeedParams
): Promise<HomeFeedData> => {
    const response = await httpClient.get<HomeFeedResponse>("/feed/home", {
        params: {
            limit: params?.limit,
            cursor: params?.cursor,
            includeSelf: params?.includeSelf
        }
    });

    if (response.data.error) {
        throw new Error(response.data.error);
    }

    if (!response.data.data) {
        throw new Error("Home feed data was not returned.");
    }

    return response.data.data;
};
