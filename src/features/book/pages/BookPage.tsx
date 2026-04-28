import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import BookAboutSection from "../components/BookAboutSection";
import BookAuthorSection from "../components/BookAuthorSection";
import BookCoverPanel from "../components/BookCoverPanel";
import BookDetailsPanel from "../components/BookDetailsPanel";
import BookEditionsSection from "../components/BookEditionsSection";
import BookHero from "../components/BookHero";
import BookSeriesSection from "../components/BookSeriesSection";
import SimilarBooksSection from "../components/SimilarBooksSection";
import type { BookViewModel } from "../types/book.types";
import { createDescriptionPreview } from "../utils/bookPage.utils";

interface BookDetailApiAuthor {
    name: string;
    key?: string;
}

interface BookDetailApiSeries {
    key: string;
    name: string;
}

interface BookDetailApiPayload {
    externalBookId: string;
    title: string;
    description?: string;
    cover?: string;
    authors: BookDetailApiAuthor[];
    firstPublishDate?: string;
    subjects: string[];
    series?: BookDetailApiSeries;
    seriesPosition?: string;
    rating?: {
        average?: number;
        count?: number;
    };
    reviewsCount?: number;
    pageCount?: number;
    editionCount?: number;
    languages?: string[];
    publishers?: string[];
    publishPlaces?: string[];
    subjectPeople?: string[];
    subjectPlaces?: string[];
    subjectTimes?: string[];
    excerpts?: string[];
}

interface BookDetailApiResponse {
    error: string | null;
    data?: BookDetailApiPayload;
}

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";

const getApiBaseUrl = () => {
    const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

    if (!configuredBaseUrl) {
        return DEFAULT_API_BASE_URL;
    }

    return configuredBaseUrl.replace(/\/+$/, "");
};

const getNormalizedDescription = (description?: string) => {
    if (!description) {
        return "No description available yet.";
    }

    const normalizedDescription = description.trim();
    return normalizedDescription.length > 0 ? normalizedDescription : "No description available yet.";
};

const mapBookDetailToViewModel = (payload: BookDetailApiPayload): BookViewModel => {
    const authorNames = payload.authors
        .map((author) => author.name?.trim())
        .filter((authorName): authorName is string => Boolean(authorName && authorName.length > 0));

    return {
        id: payload.externalBookId,
        title: payload.title,
        description: getNormalizedDescription(payload.description),
        coverUrl: payload.cover ?? undefined,
        authors: authorNames,
        publishDate: payload.firstPublishDate ?? "Unknown publication date",
        subjects: Array.isArray(payload.subjects) ? payload.subjects.slice(0, 8) : [],
        series: payload.series,
        seriesPositionLabel: payload.seriesPosition ? `Book ${payload.seriesPosition}` : undefined,
        averageRating: payload.rating?.average,
        ratingsCount: payload.rating?.count,
        reviewsCount: payload.reviewsCount,
        pageCount: payload.pageCount,
        editionCount: payload.editionCount,
        languages: payload.languages,
        publishers: payload.publishers,
        publishPlaces: payload.publishPlaces,
        subjectPeople: payload.subjectPeople,
        subjectPlaces: payload.subjectPlaces,
        subjectTimes: payload.subjectTimes,
        excerpts: payload.excerpts,
    };
};

const BookPage = () => {
    const { id } = useParams<{ id: string }>();

    const [book, setBook] = useState<BookViewModel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    useEffect(() => {
        if (!id) {
            setBook(null);
            setSelectedRating(null);
            setIsDescriptionExpanded(false);
            setError("Book id is missing.");
            return;
        }

        const abortController = new AbortController();

        const fetchBook = async () => {
            try {
                setIsLoading(true);
                setError(null);
                setBook(null);
                setSelectedRating(null);
                setIsDescriptionExpanded(false);

                const normalizedId = id.replace("/works/", "").trim();
                const apiBaseUrl = getApiBaseUrl();
                const response = await fetch(`${apiBaseUrl}/books/${encodeURIComponent(normalizedId)}`, {
                    signal: abortController.signal,
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch book details.");
                }

                const responseData = (await response.json()) as BookDetailApiResponse;

                if (!responseData.data) {
                    throw new Error(responseData.error ?? "Book details response was empty.");
                }

                setBook(mapBookDetailToViewModel(responseData.data));
            } catch (err) {
                if (abortController.signal.aborted) {
                    return;
                }

                const message = err instanceof Error ? err.message : "Something went wrong.";
                setError(message);
                setBook(null);
            } finally {
                if (!abortController.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        void fetchBook();

        return () => {
            abortController.abort();
        };
    }, [id]);

    const description = useMemo(() => getNormalizedDescription(book?.description), [book?.description]);
    const descriptionPreview = useMemo(() => createDescriptionPreview(description), [description]);

    const authorLabel = book?.authors.length ? book.authors.join(", ") : "Unknown author";
    const subjectChips = book?.subjects ?? [];
    const publishLabel = book?.publishDate ?? "Unknown publication date";
    const displayedDescription = isDescriptionExpanded ? description : descriptionPreview;

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
        <div className="min-h-screen bg-transparent px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="w-full">
                <div className="grid items-start gap-8 xl:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)]">
                    <div className="space-y-5">
                        <BookCoverPanel
                            coverUrl={book.coverUrl}
                            title={book.title}
                            rating={selectedRating}
                            onChangeRating={setSelectedRating}
                        />
                    </div>

                    <div className="min-w-0">
                        <BookHero
                            title={book.title}
                            authorLabel={authorLabel}
                            series={book.series}
                            seriesPositionLabel={book.seriesPositionLabel}
                            averageRating={book.averageRating}
                            ratingsCount={book.ratingsCount}
                            reviewsCount={book.reviewsCount}
                        />

                        <div className="mt-8 space-y-8">
                            <BookAboutSection
                                displayedDescription={displayedDescription}
                                description={description}
                                descriptionPreview={descriptionPreview}
                                isDescriptionExpanded={isDescriptionExpanded}
                                onToggleDescription={() => setIsDescriptionExpanded((currentValue) => !currentValue)}
                                subjectChips={subjectChips}
                            />

                            <BookSeriesSection
                                series={book.series}
                                seriesPositionLabel={book.seriesPositionLabel}
                            />

                            <BookDetailsPanel
                                authorLabel={authorLabel}
                                publishLabel={publishLabel}
                                pageCount={book.pageCount}
                                editionCount={book.editionCount}
                                languages={book.languages}
                                publishers={book.publishers}
                                publishPlaces={book.publishPlaces}
                                subjectPeople={book.subjectPeople}
                                subjectPlaces={book.subjectPlaces}
                                subjectTimes={book.subjectTimes}
                                excerpts={book.excerpts}
                            />

                            <BookEditionsSection editions={book.editions} />
                            <BookAuthorSection authorDetails={book.authorDetails} />
                            <SimilarBooksSection books={book.similarBooks} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
