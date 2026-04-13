import { useEffect, useState } from "react";
import { searchBooks } from "../services/searchService";
import {
    normalizeSearchPagination,
    normalizeSearchResults,
    type SearchPagination,
    type SearchResultItem
} from "../utils/searchMappers";

interface UseSearchParams {
    query: string;
    page: number;
    mode: "all" | "title" | "author";
    limit: number;
}

interface UseSearchResult {
    results: SearchResultItem[];
    pagination: SearchPagination;
    isLoading: boolean;
    error: string | null;
}

export const useSearch = ({ query, page, mode, limit }: UseSearchParams): UseSearchResult => {
    const [results, setResults] = useState<SearchResultItem[]>([]);
    const [pagination, setPagination] = useState<SearchPagination>({
        page,
        limit,
        total: 0,
        totalPages: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setResults([]);
            setPagination({ page: 1, limit, total: 0, totalPages: 0 });
            setIsLoading(false);
            setError(null);
            return;
        }

        const load = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const rawResponse = await searchBooks({
                    q: mode === "author" ? undefined : trimmedQuery,
                    author: mode === "author" ? trimmedQuery : undefined,
                    page,
                    limit
                });

                const normalizedResults = normalizeSearchResults(rawResponse);
                const normalizedPagination = normalizeSearchPagination(
                    rawResponse,
                    page,
                    limit,
                    normalizedResults.length
                );

                setResults(normalizedResults);
                setPagination(normalizedPagination);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Search failed";
                setError(message);
                setResults([]);
                setPagination({ page, limit, total: 0, totalPages: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [query, page, mode, limit]);

    return {
        results,
        pagination,
        isLoading,
        error
    };
};
