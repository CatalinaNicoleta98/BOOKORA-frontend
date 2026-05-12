import { httpClient } from "../../../shared/api/httpClient";
import type {
    CombinedSearchResponse,
    ReaderSearchResponse,
    SearchBooksResponse,
    SearchParams
} from "../types/search.types";

interface SearchApiEnvelope {
    error: string | null;
    data: SearchBooksResponse;
    message?: string;
}

interface ReaderSearchApiEnvelope {
    error: string | null;
    data: ReaderSearchResponse;
    message?: string;
}

const normalizeSearchValue = (value?: string) => {
    const normalizedValue = value?.trim();

    return normalizedValue ? normalizedValue : undefined;
};

export const searchBooks = async (params: SearchParams): Promise<SearchBooksResponse> => {
    const normalizedQuery = normalizeSearchValue(params.q);
    const normalizedAuthor = normalizeSearchValue(params.author);
    const normalizedIsbn = normalizeSearchValue(params.isbn);
    const hasShortTextQuery =
        (!normalizedIsbn && normalizedQuery !== undefined && normalizedQuery.length < 3) ||
        (!normalizedIsbn && normalizedAuthor !== undefined && normalizedAuthor.length < 3);

    if ((!normalizedQuery && !normalizedAuthor && !normalizedIsbn) || hasShortTextQuery) {
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

export const searchReaders = async (
    query: string,
    limit = 10
): Promise<ReaderSearchResponse> => {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery || normalizedQuery.length < 3) {
        return {
            query: normalizedQuery ?? "",
            readers: []
        };
    }

    const response = await httpClient.get<ReaderSearchApiEnvelope>("/readers/search", {
        params: {
            q: normalizedQuery,
            limit
        }
    });

    if (response.data.error) {
        throw new Error(response.data.message ?? "Failed to search readers");
    }

    return response.data.data;
};

export const searchAll = async (
    params: SearchParams,
    readerLimit = 10
): Promise<CombinedSearchResponse> => {
    const normalizedQuery = normalizeSearchValue(params.q);
    const normalizedAuthor = normalizeSearchValue(params.author);
    const normalizedIsbn = normalizeSearchValue(params.isbn);
    const hasShortTextQuery =
        (!normalizedIsbn && normalizedQuery !== undefined && normalizedQuery.length < 3) ||
        (!normalizedIsbn && normalizedAuthor !== undefined && normalizedAuthor.length < 3);

    if ((!normalizedQuery && !normalizedAuthor && !normalizedIsbn) || hasShortTextQuery) {
        return {
            books: {
                results: [],
                pagination: {
                    page: params.page ?? 1,
                    limit: params.limit ?? 8,
                    numFound: 0,
                },
            },
            readers: []
        };
    }

    const [books, readerResponse] = await Promise.all([
        searchBooks(params),
        normalizedQuery && !normalizedAuthor && !normalizedIsbn && normalizedQuery.length >= 3
            ? searchReaders(normalizedQuery, readerLimit)
            : Promise.resolve({ query: normalizedQuery ?? "", readers: [] })
    ]);

    return {
        books,
        readers: readerResponse.readers
    };
};

export type { ReaderSearchResult, SearchBookResult, SearchBooksResponse } from "../types/search.types";
