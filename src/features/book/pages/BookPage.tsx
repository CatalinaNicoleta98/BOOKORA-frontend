import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import BookAboutSection from "../components/BookAboutSection";
import BookAuthorSection from "../components/BookAuthorSection";
import BookCoverPanel from "../components/BookCoverPanel";
import BookDetailsPanel from "../components/BookDetailsPanel";
import BookEditionsSection from "../components/BookEditionsSection";
import BookHero from "../components/BookHero";
import BookReviewsSection from "../components/BookReviewsSection";
import SimilarBooksSection from "../components/SimilarBooksSection";
import type { BookDetailApiResponse, BookViewModel } from "../types/book.types";
import { createDescriptionPreview, mapBookDetailToViewModel } from "../utils/bookPage.utils";

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";

const getApiBaseUrl = () => {
    const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

    if (!configuredBaseUrl) {
        return DEFAULT_API_BASE_URL;
    }

    return configuredBaseUrl.replace(/\/+$/, "");
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

    const description = useMemo(() => book?.description ?? "No description available yet.", [book?.description]);
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

                        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
                            <BookAboutSection
                                displayedDescription={displayedDescription}
                                description={description}
                                descriptionPreview={descriptionPreview}
                                isDescriptionExpanded={isDescriptionExpanded}
                                onToggleDescription={() => setIsDescriptionExpanded((currentValue) => !currentValue)}
                                subjectChips={subjectChips}
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
                            <BookReviewsSection
                                reviews={book.reviews}
                                averageRating={book.averageRating}
                                ratingsCount={book.ratingsCount}
                                reviewsCount={book.reviewsCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
