import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReaderSearchResultsList from "../components/ReaderSearchResultsList";
import SearchFilters, { type SearchMode } from "../components/SearchFilters";
import SearchResultsList from "../components/SearchResultsList";
import SearchPagination from "../components/SearchPagination";
import { useSearch } from "../hooks/useSearch";
import { useDocumentTitle } from "../../../shared/hooks/useDocumentTitle";


const SearchPage = () => {
    useDocumentTitle("Bookora | Search");
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

    const { bookResults, readerResults, pagination, isLoading, error } = useSearch({
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
            return "Search for a book title, author, series, or reader.";
        }

        if (trimmedQuery.length < 3) {
            return "Type at least 3 characters to search.";
        }

        if (isLoading) {
            return `Searching for "${trimmedQuery}"...`;
        }

        if (error) {
            return error;
        }

        if (bookResults.length === 0 && readerResults.length === 0) {
            return `No results found for "${trimmedQuery}".`;
        }

        const parts: string[] = [];

        if (readerResults.length > 0) {
            parts.push(`${readerResults.length} reader${readerResults.length === 1 ? "" : "s"}`);
        }

        if (bookResults.length > 0) {
            const startIndex = (pagination.page - 1) * pagination.limit + 1;
            const endIndex = startIndex + bookResults.length - 1;
            const totalLabel = pagination.total > 0 ? pagination.total : bookResults.length;

            parts.push(
                `${startIndex}-${endIndex} of ${totalLabel} book result${totalLabel === 1 ? "" : "s"}`
            );
        }

        return `Showing ${parts.join(" and ")} for "${trimmedQuery}"`;
    }, [bookResults.length, error, initialQuery, isLoading, pagination.limit, pagination.page, pagination.total, readerResults.length]);

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
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-0 pb-16 pt-4 sm:gap-6 sm:px-0 sm:pt-6">
                <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
                    <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
                        <div className="max-w-4xl">
                            <p className="theme-eyebrow">
                                Search
                            </p>
                            <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                                Find your next book obsession
                            </h1>
                            <p className="theme-text-soft mt-4 max-w-2xl text-sm leading-7 sm:text-[15px]">
                                Search titles, authors, series, and public readers in one place.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row"
                        >
                            <input
                                type="search"
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                placeholder="Search books, authors, series, or readers"
                                className="theme-input w-full rounded-2xl px-5 py-3 text-sm transition-colors duration-300"
                            />
                            <button
                                type="submit"
                                className="theme-button-primary inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 sm:min-w-[10rem]"
                            >
                                Search Bookora
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
                                Start with a title, author, series, or reader handle.
                            </p>
                            <p className="theme-text-muted mt-3 text-sm leading-7">
                                Use this page for full search results after searching from the navbar
                                or submitting a search here directly.
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

                    {!isLoading && initialQuery.trim() && !error && bookResults.length === 0 && readerResults.length === 0 ? (
                        <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
                            {initialQuery.trim().length < 3 ? (
                                <>
                                    <p className="theme-title text-base font-medium">Keep typing.</p>
                                    <p className="theme-text-muted mt-3 text-sm leading-7">
                                        Enter at least 3 characters before we search books and readers.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="theme-title text-base font-medium">No matches found.</p>
                                    <p className="theme-text-muted mt-3 text-sm leading-7">
                                        Try a different title, author name, reader handle, or a shorter search phrase.
                                    </p>
                                </>
                            )}
                        </div>
                    ) : null}

                    {!isLoading && readerResults.length > 0 ? (
                        <section className="grid gap-4">
                            <div className="px-1">
                                <h2 className="theme-title text-xl font-semibold">Readers</h2>
                                <p className="theme-text-muted mt-2 text-sm">
                                    Public reader profiles matching your search.
                                </p>
                            </div>
                            <ReaderSearchResultsList results={readerResults} />
                        </section>
                    ) : null}

                    {!isLoading && bookResults.length > 0 ? (
                        <section className="grid gap-4">
                            <div className="px-1">
                                <h2 className="theme-title text-xl font-semibold">Books</h2>
                                <p className="theme-text-muted mt-2 text-sm">
                                    Book results based on your current search filters.
                                </p>
                            </div>
                            <SearchResultsList results={bookResults} />
                        </section>
                    ) : null}
                    {!isLoading && bookResults.length > 0 ? (
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
