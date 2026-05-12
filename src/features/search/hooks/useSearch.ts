import { useEffect, useState } from "react";
import { searchAll } from "../services/searchService";
import {
    normalizeSearchPagination,
    normalizeSearchResults,
    type SearchPagination,
    type SearchResultItem
} from "../utils/searchMappers";
import type { ReaderSearchResult } from "../types/search.types";

interface UseSearchParams {
    query: string;
    page: number;
    mode: "all" | "title" | "author";
    limit: number;
}

interface UseSearchResult {
    bookResults: SearchResultItem[];
    readerResults: ReaderSearchResult[];
    pagination: SearchPagination;
    isLoading: boolean;
    error: string | null;
}

export const useSearch = ({ query, page, mode, limit }: UseSearchParams): UseSearchResult => {
    const [bookResults, setBookResults] = useState<SearchResultItem[]>([]);
    const [readerResults, setReaderResults] = useState<ReaderSearchResult[]>([]);
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
            setBookResults([]);
            setReaderResults([]);
            setPagination({ page: 1, limit, total: 0, totalPages: 0 });
            setIsLoading(false);
            setError(null);
            return;
        }

        if (trimmedQuery.length < 3) {
            setBookResults([]);
            setReaderResults([]);
            setPagination({ page: 1, limit, total: 0, totalPages: 0 });
            setIsLoading(false);
            setError(null);
            return;
        }

        const load = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await searchAll({
                    q: mode === "author" ? undefined : trimmedQuery,
                    author: mode === "author" ? trimmedQuery : undefined,
                    page,
                    limit
                });

                const normalizedResults = normalizeSearchResults(response.books);
                const normalizedPagination = normalizeSearchPagination(
                    response.books,
                    page,
                    limit,
                    normalizedResults.length
                );

                setBookResults(normalizedResults);
                setReaderResults(response.readers);
                setPagination(normalizedPagination);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Search failed";
                setError(message);
                setBookResults([]);
                setReaderResults([]);
                setPagination({ page, limit, total: 0, totalPages: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [query, page, mode, limit]);

    return {
        bookResults,
        readerResults,
        pagination,
        isLoading,
        error
    };
};
