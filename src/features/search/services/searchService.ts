import { httpClient } from "../../../shared/api/httpClient";

export interface SearchParams {
    q?: string;
    author?: string;
    isbn?: string;
    page?: number;
    limit?: number;
}

export interface SearchResult {
    source: "open_library";
    externalBookId: string;
    title: string;
    author?: string;
    cover?: string;
    publishedYear?: number;
    isbn?: string[];
}

export interface SearchResponse {
    results: SearchResult[];
    pagination: {
        page: number;
        limit: number;
        numFound: number;
    };
}

interface SearchApiEnvelope {
    error: string | null;
    data: SearchResponse;
    message?: string;
}

const normalizeSearchValue = (value?: string) => {
    const normalizedValue = value?.trim();

    return normalizedValue ? normalizedValue : undefined;
};

export const searchBooks = async (params: SearchParams): Promise<SearchResponse> => {
    const normalizedQuery = normalizeSearchValue(params.q);
    const normalizedAuthor = normalizeSearchValue(params.author);
    const normalizedIsbn = normalizeSearchValue(params.isbn);

    if (!normalizedQuery && !normalizedAuthor && !normalizedIsbn) {
        return {
            results: [],
            pagination: {
                page: params.page ?? 1,
                limit: params.limit ?? 8,
                numFound: 0,
            },
        };
    }

    const response = await httpClient.get<SearchApiEnvelope>("/books/search", {
        params: {
            q: normalizedQuery,
            author: normalizedAuthor,
            isbn: normalizedIsbn,
            page: params.page ?? 1,
            limit: params.limit ?? 8,
        },
    });

    if (response.data.error) {
        throw new Error(response.data.message ?? "Failed to search books");
    }

    return response.data.data;

    
};