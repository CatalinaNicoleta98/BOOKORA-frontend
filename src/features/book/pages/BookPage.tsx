import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import type { BookData } from "../types/book.types";
import { createDescriptionPreview, getBookDescription, getCoverUrl } from "../utils/bookPage.utils";
import BookCoverPanel from "../components/BookCoverPanel";

const BookPage = () => {
    const { id } = useParams<{ id: string }>();

    const [book, setBook] = useState<BookData | null>(null);
    const [authorNames, setAuthorNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchBook = async () => {
            try {
                setIsLoading(true);
                setError(null);
                setAuthorNames([]);

                const normalizedId = id.replace("/works/", "").trim();
                const response = await fetch(`https://openlibrary.org/works/${normalizedId}.json`);

                if (!response.ok) {
                    throw new Error("Failed to fetch book details.");
                }

                const data = (await response.json()) as BookData;
                setBook(data);

                const authorKeys = (data.authors ?? [])
                    .map((entry) => entry.author?.key)
                    .filter((key): key is string => Boolean(key && key.trim().length > 0));

                if (authorKeys.length === 0) {
                    setAuthorNames([]);
                    return;
                }

                const resolvedAuthors = await Promise.all(
                    authorKeys.map(async (authorKey) => {
                        const authorResponse = await fetch(`https://openlibrary.org${authorKey}.json`);

                        if (!authorResponse.ok) {
                            return null;
                        }

                        const authorData = (await authorResponse.json()) as { name?: string };
                        return typeof authorData.name === "string" ? authorData.name.trim() : null;
                    })
                );

                setAuthorNames(
                    resolvedAuthors.filter(
                        (authorName): authorName is string => Boolean(authorName && authorName.length > 0)
                    )
                );
            } catch (err) {
                const message = err instanceof Error ? err.message : "Something went wrong.";
                setError(message);
                setBook(null);
                setAuthorNames([]);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchBook();
    }, [id]);

    const coverUrl = useMemo(() => getCoverUrl(book?.covers?.[0]), [book?.covers]);
    const description = useMemo(() => getBookDescription(book?.description), [book?.description]);
    const descriptionPreview = useMemo(() => createDescriptionPreview(description), [description]);

    const authorLabel = authorNames.length > 0 ? authorNames.join(", ") : "Unknown author";
    const subjectChips = (book?.subjects ?? []).slice(0, 8);
    const publishLabel = book?.first_publish_date ?? "Unknown publication date";
    const displayedDescription = isDescriptionExpanded ? description : descriptionPreview;
    const ratingOptions = Array.from({ length: 10 }, (_, index) => (index + 1) * 0.5);

    if (isLoading) {
        return <div className="p-8 text-white">Loading book...</div>;
    }

    if (error) {
        return <div className="p-8 text-red-400">{error}</div>;
    }

    if (!book) {
        return <div className="p-8 text-white">No book found.</div>;
    }

    return (
        <div className="min-h-screen bg-[#070a12] px-6 py-10 text-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl">
                    <div className="grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8 xl:grid-cols-[320px_1fr]">
                        <BookCoverPanel
                            coverUrl={coverUrl}
                            title={book.title}
                            ratingOptions={ratingOptions}
                            selectedRating={selectedRating}
                            onSelectRating={setSelectedRating}
                        />

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="max-w-4xl">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/80">
                                        Bookora book profile
                                    </p>
                                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl">
                                        {book.title}
                                    </h1>
                                    <p className="mt-3 text-lg font-medium text-slate-300 sm:text-xl">
                                        by {authorLabel}
                                    </p>
                                </div>

                                <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1020]/70 px-5 py-4 text-sm text-slate-300">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                                        Community rating
                                    </p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-2xl font-semibold text-amber-300">★ 4.5</span>
                                        <span className="text-sm text-slate-400">12.4k ratings · 41.8k readers</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 px-5 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/14"
                                >
                                    Add to library
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-5 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                >
                                    Want to read
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-5 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                >
                                    Write review
                                </button>
                            </div>

                            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                                <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <h2 className="text-lg font-semibold text-white">About this book</h2>
                                        {description.length > descriptionPreview.length ? (
                                            <button
                                                type="button"
                                                onClick={() => setIsDescriptionExpanded((currentValue) => !currentValue)}
                                                className="text-sm font-medium text-amber-200 transition-colors duration-300 hover:text-amber-100"
                                            >
                                                {isDescriptionExpanded ? "Show less" : "Show more"}
                                            </button>
                                        ) : null}
                                    </div>

                                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                                        {displayedDescription}
                                    </p>

                                    {subjectChips.length > 0 ? (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {subjectChips.map((subject) => (
                                                <span
                                                    key={subject}
                                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-300"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-6">
                                    <h2 className="text-lg font-semibold text-white">Book details</h2>

                                    <dl className="mt-5 space-y-4 text-sm text-slate-300">
                                        <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                                            <dt className="text-slate-400">Author</dt>
                                            <dd className="text-right text-white">{authorLabel}</dd>
                                        </div>
                                        <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                                            <dt className="text-slate-400">First published</dt>
                                            <dd className="text-right text-white">{publishLabel}</dd>
                                        </div>
                                        <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                                            <dt className="text-slate-400">Reading format</dt>
                                            <dd className="text-right text-white">Physical · Ebook · Audiobook</dd>
                                        </div>
                                        <div className="flex items-start justify-between gap-4">
                                            <dt className="text-slate-400">Bookora rating mode</dt>
                                            <dd className="text-right text-white">0.5 star increments</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BookPage;