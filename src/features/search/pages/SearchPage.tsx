import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchFilters, { type SearchMode } from "../components/SearchFilters";
import SearchResultsList from "../components/SearchResultsList";
import SearchPagination from "../components/SearchPagination";
import { useSearch } from "../hooks/useSearch";


const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") ?? "";

    const initialPageParam = searchParams.get("page");
    const initialPage =
        initialPageParam && Number.isFinite(Number(initialPageParam))
            ? Math.max(1, Number(initialPageParam))
            : 1;
    const searchPageLimit = 20;

    const modeParam = searchParams.get("mode");
    const mode: SearchMode =
        modeParam === "author" || modeParam === "title" ? modeParam : "all";

    const { results, pagination, isLoading, error } = useSearch({
        query: initialQuery,
        page: initialPage,
        mode,
        limit: searchPageLimit
    });

    const [searchInput, setSearchInput] = useState(initialQuery);

    useEffect(() => {
        setSearchInput(initialQuery);
    }, [initialQuery]);

    const resultCountLabel = useMemo(() => {
        const trimmedQuery = initialQuery.trim();

        if (!trimmedQuery) {
            return "Search for a book title, author, or series.";
        }

        if (isLoading) {
            return `Searching for "${trimmedQuery}"...`;
        }

        if (error) {
            return error;
        }

        if (results.length === 0) {
            return `No results found for "${trimmedQuery}".`;
        }

        const startIndex = (pagination.page - 1) * pagination.limit + 1;
        const endIndex = startIndex + results.length - 1;
        const totalLabel = pagination.total > 0 ? pagination.total : results.length;

        return `Showing ${startIndex}-${endIndex} of ${totalLabel} result${totalLabel === 1 ? "" : "s"} for "${trimmedQuery}"`;
    }, [error, initialQuery, isLoading, pagination.limit, pagination.page, pagination.total, results.length]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedQuery = searchInput.trim();
        const nextUrl = trimmedQuery
            ? `/search?q=${encodeURIComponent(trimmedQuery)}&page=1&mode=${mode}`
            : "/search";

        navigate(nextUrl);
    };

    const handlePageChange = (nextPage: number) => {
        const trimmedQuery = initialQuery.trim();

        if (!trimmedQuery) {
            return;
        }

        const normalizedPage = Math.max(1, nextPage);
        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&page=${normalizedPage}&mode=${mode}`);
    };

    const handleModeChange = (nextMode: SearchMode) => {
        const trimmedQuery = initialQuery.trim();

        if (!trimmedQuery) {
            return;
        }

        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&page=1&mode=${nextMode}`);
    };

    const visiblePageNumbers = useMemo(() => {
        if (pagination.totalPages <= 1) {
            return [];
        }

        const startPage = Math.max(1, pagination.page - 2);
        const endPage = Math.min(pagination.totalPages, startPage + 4);
        const adjustedStartPage = Math.max(1, endPage - 4);

        return Array.from(
            { length: endPage - adjustedStartPage + 1 },
            (_, index) => adjustedStartPage + index
        );
    }, [pagination.page, pagination.totalPages]);

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
                    <div className="relative px-6 py-8 sm:px-8 lg:px-10">
                        <div className="max-w-4xl">
                            <p className="theme-eyebrow">
                                Search
                            </p>
                            <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                                Find your next book obsession
                            </h1>
                            <p className="theme-text-soft mt-4 max-w-2xl text-sm leading-7 sm:text-[15px]">
                                Search titles, authors, or series and explore books in a full results
                                view.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 flex flex-col gap-3 sm:flex-row"
                        >
                            <input
                                type="search"
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="Search books, authors, or series"
                                className="theme-input w-full rounded-2xl px-5 py-3 text-sm transition-colors duration-300"
                            />
                            <button
                                type="submit"
                                className="theme-button-primary inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300"
                            >
                                Search books
                            </button>
                        </form>

                        <div className="mt-5 flex flex-col gap-4">
                            <SearchFilters mode={mode} onChange={handleModeChange} />
                            <div className="theme-text-muted text-sm">{resultCountLabel}</div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4">
                    {!initialQuery.trim() ? (
                        <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
                            <p className="theme-title text-base font-medium">
                                Start with a title, author, or series.
                            </p>
                            <p className="theme-text-muted mt-3 text-sm leading-7">
                                This page will become the full search experience for both mobile search
                                and desktop “View all results”.
                            </p>
                        </div>
                    ) : null}

                    {isLoading ? (
                        <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
                            <p className="theme-title text-base font-medium">Searching books...</p>
                            <p className="theme-text-muted mt-3 text-sm leading-7">
                                We are pulling the best matches for your query.
                            </p>
                        </div>
                    ) : null}

                    {!isLoading && initialQuery.trim() && !error && results.length === 0 ? (
                        <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
                            <p className="theme-title text-base font-medium">No books found.</p>
                            <p className="theme-text-muted mt-3 text-sm leading-7">
                                Try a different title, author name, or a shorter search phrase.
                            </p>
                        </div>
                    ) : null}

                    {!isLoading && results.length > 0 ? (
                        <SearchResultsList results={results} />
                    ) : null}
                    {!isLoading ? (
                        <SearchPagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            visiblePages={visiblePageNumbers}
                            onPageChange={handlePageChange}
                        />
                    ) : null}
                </section>
            </div>
        </div>
    );
};

export default SearchPage;
