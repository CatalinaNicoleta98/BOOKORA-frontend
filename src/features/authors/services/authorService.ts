import { httpClient } from "../../../shared/api/httpClient";
import type { AuthorDetailsApiEnvelope, AuthorDetailsViewModel } from "../types/author.types";

export const getAuthorDetails = async (authorKey: string): Promise<AuthorDetailsViewModel> => {
    const response = await httpClient.get<AuthorDetailsApiEnvelope>(
        `/authors/${encodeURIComponent(authorKey)}`
    );

    if (response.data.error || !response.data.data) {
        throw new Error(response.data.message ?? "Failed to fetch author details.");
    }

    return response.data.data;
};
