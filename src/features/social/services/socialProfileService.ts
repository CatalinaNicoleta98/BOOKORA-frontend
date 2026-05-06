import { httpClient } from "../../../shared/api/httpClient";
import type { PublicReaderProfileResponse } from "../types/social.types";

type PublicReaderProfileApiResponse = {
    error: string | null;
    data?: PublicReaderProfileResponse;
};

const HANDLE_PATTERN = /^[a-zA-Z0-9_]{3,30}$/;
const READERS_BASE_PATH = "/readers";

const normalizeHandle = (handle: string) => handle.trim();

const validateHandle = (handle: string) => {
    const normalizedHandle = normalizeHandle(handle);

    if (!HANDLE_PATTERN.test(normalizedHandle)) {
        throw new Error("Invalid reader handle.");
    }

    return normalizedHandle;
};

export const getPublicReaderProfile = async (
    handle: string
): Promise<PublicReaderProfileResponse> => {
    const validatedHandle = validateHandle(handle);
    const response = await httpClient.get<PublicReaderProfileApiResponse>(
        `${READERS_BASE_PATH}/${encodeURIComponent(validatedHandle)}`
    );

    if (response.data.error) {
        throw new Error(response.data.error);
    }

    if (!response.data.data) {
        throw new Error("Reader profile data was not returned.");
    }

    return response.data.data;
};
