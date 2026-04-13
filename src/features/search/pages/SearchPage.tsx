import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { searchBooks } from "../services/searchService";

interface SearchResultItem {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    publishYear?: string;
    description?: string;
    averageRating?: number;
    ratingsCount?: number;
    readsCount?: number;
}

const getBookId = (rawBook: Record<string, unknown>, fallbackIndex: number) => {
    const idCandidates = [
        rawBook.id,
        rawBook.key,
        rawBook.bookId,
        rawBook.workId,
        rawBook.cover_edition_key
    ];

    const resolvedId = idCandidates.find(
        (candidate) => typeof candidate === "string" && candidate.trim().length > 0
    );

    return (resolvedId as string | undefined) ?? `search-result-${fallbackIndex}`;
};

const getBookAuthor = (rawBook: Record<string, unknown>) => {
    if (typeof rawBook.author === "string" && rawBook.author.trim().length > 0) {
        return rawBook.author;
    }

    if (Array.isArray(rawBook.author_name) && typeof rawBook.author_name[0] === "string") {
        return rawBook.author_name[0];
    }

    if (Array.isArray(rawBook.authors) && typeof rawBook.authors[0] === "string") {
        return rawBook.authors[0];
    }

    return "Unknown author";
};

const getBookCoverUrl = (rawBook: Record<string, unknown>) => {
    if (typeof rawBook.cover === "string" && rawBook.cover.trim().length > 0) {
        return rawBook.cover;
    }

    if (typeof rawBook.coverUrl === "string" && rawBook.coverUrl.trim().length > 0) {
        return rawBook.coverUrl;
    }

    const coverId =
        typeof rawBook.cover_i === "number"
            ? rawBook.cover_i
            : typeof rawBook.coverId === "number"
                ? rawBook.coverId
                : typeof rawBook.cover_id === "number"
                    ? rawBook.cover_id
                    : undefined;

    if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }

    return undefined;
};

const getBookDescription = (rawBook: Record<string, unknown>) => {
    const descriptionValue = rawBook.description;
    const firstSentenceValue = rawBook.first_sentence;

    const text =
        typeof descriptionValue === "string"
            ? descriptionValue
            : descriptionValue &&
                typeof descriptionValue === "object" &&
                typeof (descriptionValue as { value?: unknown }).value === "string"
                ? ((descriptionValue as { value: string }).value)
                : typeof firstSentenceValue === "string"
                    ? firstSentenceValue
                    : Array.isArray(firstSentenceValue) && typeof firstSentenceValue[0] === "string"
                        ? firstSentenceValue[0]
                        : typeof rawBook.subtitle === "string"
                            ? rawBook.subtitle
                            : undefined;

    if (!text || text.trim().length === 0) {
        return undefined;
    }

    const normalizedText = text.trim();

    return normalizedText.length > 220
        ? `${normalizedText.slice(0, 220).trimEnd()}...`
        : normalizedText;
};

const normalizeSearchResults = (rawResponse: unknown): SearchResultItem[] => {
    if (!rawResponse || typeof rawResponse !== "object") {
        return [];
    }

    const responseRecord = rawResponse as Record<string, unknown>;
    const responseData =
        responseRecord.data && typeof responseRecord.data === "object"
            ? (responseRecord.data as Record<string, unknown>)
            : undefined;

    const rawItems = Array.isArray(responseRecord.results)
        ? responseRecord.results
        : Array.isArray(responseRecord.data)
            ? responseRecord.data
            : Array.isArray(responseRecord.docs)
                ? responseRecord.docs
                : Array.isArray(responseData?.docs)
                    ? (responseData.docs as unknown[])
                    : Array.isArray(responseData?.books)
                        ? (responseData.books as unknown[])
                        : [];

    return rawItems
        .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
        .map((item, index) => ({
            id: getBookId(item, index),
            title:
                typeof item.title === "string" && item.title.trim().length > 0
                    ? item.title
                    : "Untitled book",
            author: getBookAuthor(item),
            coverUrl: getBookCoverUrl(item),
            publishYear:
                typeof item.first_publish_year === "number"
                    ? String(item.first_publish_year)
                    : typeof item.publishYear === "string"
                        ? item.publishYear
                        : undefined,
            description: getBookDescription(item),
            averageRating:
                typeof item.averageRating === "number"
                    ? item.averageRating
                    : typeof item.ratings_average === "number"
                        ? item.ratings_average
                        : undefined,
            ratingsCount:
                typeof item.ratingsCount === "number"
                    ? item.ratingsCount
                    : typeof item.ratings_count === "number"
                        ? item.ratings_count
                        : undefined,
            readsCount:
                typeof item.readsCount === "number"
                    ? item.readsCount
                    : typeof item.want_to_read_count === "number"
                        ? item.want_to_read_count
                        : undefined
        }));
};

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") ?? "";

    const [searchInput, setSearchInput] = useState(initialQuery);
    const [results, setResults] = useState<SearchResultItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setSearchInput(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        const trimmedQuery = initialQuery.trim();

        if (!trimmedQuery) {
            setResults([]);
            setIsLoading(false);
            setErrorMessage(null);
            return;
        }

        const loadResults = async () => {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const rawResponse = await searchBooks({ q: trimmedQuery });
                const normalizedResults = normalizeSearchResults(rawResponse);

                setResults(normalizedResults);
            } catch (error) {
                const fallbackMessage =
                    error instanceof Error
                        ? error.message
                        : "Unable to search books right now.";

                setErrorMessage(fallbackMessage);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadResults();
    }, [initialQuery]);

    const resultCountLabel = useMemo(() => {
        if (!initialQuery.trim()) {
            return "Search for a book title, author, or series.";
        }

        if (isLoading) {
            return `Searching for "${initialQuery.trim()}"...`;
        }

        if (errorMessage) {
            return errorMessage;
        }

        if (results.length === 0) {
            return `No results found for "${initialQuery.trim()}".`;
        }

        return `${results.length} result${results.length === 1 ? "" : "s"} for "${initialQuery.trim()}"`;
    }, [errorMessage, initialQuery, isLoading, results.length]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedQuery = searchInput.trim();
        const nextUrl = trimmedQuery
            ? `/search?q=${encodeURIComponent(trimmedQuery)}`
            : "/search";

        navigate(nextUrl);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.14),_transparent_24%),radial-gradient(circle_at_82%_14%,_rgba(244,208,140,0.10),_transparent_20%),linear-gradient(to_bottom,_rgba(8,11,22,0.92),_rgba(7,10,18,1))]" />
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0.8px,_transparent_0.8px)] [background-size:28px_28px]" />

            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-[0_28px_90px_rgba(15,23,42,0.34)] backdrop-blur-xl">
                    <div className="relative px-6 py-8 sm:px-8 lg:px-10">
                        <div className="max-w-4xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                                Search
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
                                Find your next book obsession
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px]">
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
                                className="w-full rounded-2xl border border-white/12 bg-[#0b1020]/76 px-5 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-slate-500 focus:border-amber-200/30"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 px-5 py-3 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/14"
                            >
                                Search books
                            </button>
                        </form>

                        <div className="mt-5 text-sm text-slate-400">{resultCountLabel}</div>
                    </div>
                </section>

                <section className="grid gap-4">
                    {!initialQuery.trim() ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl">
                            <p className="text-base font-medium text-white">
                                Start with a title, author, or series.
                            </p>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                This page will become the full search experience for both mobile search
                                and desktop “View all results”.
                            </p>
                        </div>
                    ) : null}

                    {isLoading ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl">
                            <p className="text-base font-medium text-white">Searching books...</p>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                We are pulling the best matches for your query.
                            </p>
                        </div>
                    ) : null}

                    {!isLoading && initialQuery.trim() && !errorMessage && results.length === 0 ? (
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl">
                            <p className="text-base font-medium text-white">No books found.</p>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                Try a different title, author name, or a shorter search phrase.
                            </p>
                        </div>
                    ) : null}

                    {!isLoading && results.length > 0 ? (
                        <div className="grid gap-4">
                            {results.map((result) => (
                                <article
                                    key={result.id}
                                    className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-white/14 hover:bg-white/[0.07]"
                                >
                                    <div className="flex flex-col gap-5 sm:flex-row">
                                        <div className="h-36 w-24 shrink-0 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b1020]/76">
                                            {result.coverUrl ? (
                                                <img
                                                    src={result.coverUrl}
                                                    alt={result.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                                                    No cover
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h2 className="text-xl font-semibold text-white">
                                                    {result.title}
                                                </h2>
                                                {result.publishYear ? (
                                                    <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                                        {result.publishYear}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <p className="mt-2 text-sm font-medium text-slate-300">
                                                by {result.author}
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                                {typeof result.averageRating === "number" ? (
                                                    <span className="font-medium text-amber-300">
                                                        ★ {result.averageRating.toFixed(1)}
                                                    </span>
                                                ) : (
                                                    <span>No rating</span>
                                                )}

                                                {typeof result.ratingsCount === "number" ? (
                                                    <span>{result.ratingsCount.toLocaleString()} ratings</span>
                                                ) : null}

                                                {typeof result.readsCount === "number" ? (
                                                    <span>{result.readsCount.toLocaleString()} readers</span>
                                                ) : null}
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-3">
                                                <Link
                                                    to={`/books/${encodeURIComponent(result.id)}`}
                                                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 px-4 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/14"
                                                >
                                                    View book
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                                >
                                                    Add to library
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}
                </section>
            </div>
        </div>
    );
};

export default SearchPage;