import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BrowseBookCard from "../components/BrowseBookCard";
import { getBrowseGenreBooks } from "../services/browseService";
import type { BrowseBookCardViewModel } from "../types/browse.types";
import { getBrowseGenreFromRouteParam } from "../utils/browseRouting";

const GENRE_PAGE_LIMIT = 18;

const BrowseGenrePage = () => {
    const { genreSlug } = useParams<{ genreSlug: string }>();
    const genre = getBrowseGenreFromRouteParam(genreSlug);
    const [books, setBooks] = useState<BrowseBookCardViewModel[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!genre) {
            setBooks([]);
            setPage(1);
            setHasMore(false);
            setIsLoading(false);
            setError(null);
            return;
        }

        let isActive = true;

        const loadGenre = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await getBrowseGenreBooks(genre, 1, GENRE_PAGE_LIMIT);

                if (!isActive) {
                    return;
                }

                setBooks(result.books);
                setPage(result.page);
                setHasMore(result.hasMore);
            } catch (loadError) {
                if (!isActive) {
                    return;
                }

                setBooks([]);
                setError(loadError instanceof Error ? loadError.message : "Could not load this genre.");
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void loadGenre();

        return () => {
            isActive = false;
        };
    }, [genre]);

    const handleLoadMore = async () => {
        if (!genre || isLoadingMore || !hasMore) {
            return;
        }

        try {
            setIsLoadingMore(true);
            setError(null);

            const nextPage = page + 1;
            const result = await getBrowseGenreBooks(genre, nextPage, GENRE_PAGE_LIMIT);

            setBooks((currentBooks) => [...currentBooks, ...result.books]);
            setPage(result.page);
            setHasMore(result.hasMore);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Could not load more books.");
        } finally {
            setIsLoadingMore(false);
        }
    };

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <section className="theme-glass-panel rounded-[2.25rem] p-6 text-center sm:p-8 lg:p-10">
                    <p className="theme-eyebrow">Browse Genre</p>
                    <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl">
                        {genre?.title ?? "Genre not found"}
                    </h1>
                    <p className="theme-text-soft mt-4 text-sm leading-7 sm:text-[15px]">
                        {genre?.description ?? "We could not match that browse genre."}
                    </p>
                </section>

                {!genre ? (
                    <section className="theme-glass-panel rounded-[2rem] p-8 text-center">
                        <p className="theme-title text-base font-medium">Genre not found.</p>
                        <p className="theme-text-muted mt-3 text-sm leading-7">
                            Try another browse category from the main browse page.
                        </p>
                    </section>
                ) : null}

                {genre && isLoading ? (
                    <section className="theme-glass-panel rounded-[2rem] p-8 text-center">
                        <p className="theme-title text-base font-medium">Loading {genre.title} books...</p>
                        <p className="theme-text-muted mt-3 text-sm leading-7">
                            We are pulling together a shelf of books for this category.
                        </p>
                    </section>
                ) : null}

                {genre && !isLoading && error ? (
                    <section className="theme-glass-panel rounded-[2rem] p-8 text-center">
                        <p className="theme-title text-base font-medium">Could not load this genre.</p>
                        <p className="theme-text-muted mt-3 text-sm leading-7">{error}</p>
                    </section>
                ) : null}

                {genre && !isLoading && !error && books.length === 0 ? (
                    <section className="theme-glass-panel rounded-[2rem] p-8 text-center">
                        <p className="theme-title text-base font-medium">No books found.</p>
                        <p className="theme-text-muted mt-3 text-sm leading-7">
                            We could not find books for this category right now.
                        </p>
                    </section>
                ) : null}

                {genre && !isLoading && !error && books.length > 0 ? (
                    <section className="space-y-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="theme-eyebrow">All Books</p>
                                <h2 className="theme-title mt-2 text-2xl font-semibold">
                                    Explore {genre.title}
                                </h2>
                            </div>
                            <p className="theme-text-muted text-sm">
                                {books.length} book{books.length === 1 ? "" : "s"} loaded
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-3.5 md:grid-cols-3 xl:grid-cols-6">
                            {books.map((book) => (
                                <BrowseBookCard key={`${genre.slug}-${book.id}`} book={book} />
                            ))}
                        </div>

                        {hasMore ? (
                            <div className="flex justify-center pt-2">
                                <button
                                    type="button"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="theme-button-primary inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isLoadingMore ? "Loading more..." : "Load more"}
                                </button>
                            </div>
                        ) : null}
                    </section>
                ) : null}
            </div>
        </div>
    );
};

export default BrowseGenrePage;
