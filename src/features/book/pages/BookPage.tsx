import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../auth/context/AuthContext";
import {
    deleteLibraryEntry,
    getLibraryEntryByBookId,
    upsertLibraryEntry,
} from "../../library/services/libraryService";
import type {
    CreateLibraryEntryPayload,
    UpdateLibraryEntryPayload,
} from "../../library/types/library.types";
import BookAboutSection from "../components/BookAboutSection";
import BookAuthorSection from "../components/BookAuthorSection";
import BookCoverPanel from "../components/BookCoverPanel";
import BookDetailsPanel from "../components/BookDetailsPanel";
import BookEditionsSection from "../components/BookEditionsSection";
import BookHero from "../components/BookHero";
import BookReviewsSection from "../components/BookReviewsSection";
import {
    getBookDetail,
    getCurrentUserBookReview,
    saveCurrentUserBookReview
} from "../services/bookService";
import SimilarBooksSection from "../components/SimilarBooksSection";
import type { BookUserReviewEntry, BookViewModel } from "../types/book.types";
import type { EditBookActivityLocationState } from "../../library/types/library.types";
import {
    applyUserRatingToCommunityRating,
    createDescriptionPreview,
    mapBookDetailToViewModel,
} from "../utils/bookPage.utils";

const BookPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state: authState } = useAuth();

    const [book, setBook] = useState<BookViewModel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [currentUserReview, setCurrentUserReview] = useState<BookUserReviewEntry | null>(null);
    const [isSavingReadingStatus, setIsSavingReadingStatus] = useState(false);

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
                setCurrentUserReview(null);

                const normalizedId = id.replace("/works/", "").trim();
                const responseData = await getBookDetail(normalizedId);

                if (!responseData.data) {
                    throw new Error(responseData.error ?? "Book details response was empty.");
                }

                const nextBook = mapBookDetailToViewModel(responseData.data);
                setBook(nextBook);

                if (authState.isAuthenticated) {
                    const savedReview = await getCurrentUserBookReview(normalizedId);

                    if (!abortController.signal.aborted) {
                        setCurrentUserReview(savedReview);
                        setSelectedRating(savedReview?.rating ?? null);
                    }
                }
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
    }, [authState.isAuthenticated, id]);

    const description = useMemo(() => book?.description ?? "No description available yet.", [book?.description]);
    const descriptionPreview = useMemo(() => createDescriptionPreview(description), [description]);

    const authorLabel = book?.authors.length ? book.authors.join(", ") : "Unknown author";
    const subjectChips = book?.subjects ?? [];
    const publishLabel = book?.publishDate ?? "Unknown publication date";
    const displayedDescription = isDescriptionExpanded ? description : descriptionPreview;
    const currentUser = authState.user
        ? {
              id: authState.user.id,
              name: authState.user.name,
              avatarUrl: authState.user.avatarUrl,
          }
        : undefined;

    const getPublishedYear = (publishDate?: string) => {
        if (!publishDate) {
            return undefined;
        }

        const matchedYear = publishDate.match(/\b(\d{4})\b/);

        if (!matchedYear) {
            return undefined;
        }

        return Number.parseInt(matchedYear[1], 10);
    };

    const openActivityEditor = (focusSection?: "review") => {
        if (!book) {
            return;
        }

        const activityState: EditBookActivityLocationState = {
            book: {
                externalBookId: book.id,
                title: book.title,
                author: book.authors[0],
                cover: book.coverUrl,
                publishedYear: getPublishedYear(book.publishDate),
            },
            focusSection,
        };

        navigate(`/books/${book.id}/activity`, { state: activityState });
    };

    const handleUpdateReadingStatus = async (status: string) => {
        if (!authState.isAuthenticated || !book) {
            return;
        }

        try {
            setIsSavingReadingStatus(true);
            setError(null);

            const existingEntry = await getLibraryEntryByBookId(book.id);
            const createPayload: CreateLibraryEntryPayload = {
                bookSource: "open_library",
                externalBookId: book.id,
                title: book.title,
                author: book.authors[0],
                cover: book.coverUrl,
                publishedYear: getPublishedYear(book.publishDate),
                status: status as CreateLibraryEntryPayload["status"],
                rating: existingEntry?.rating ?? currentUserReview?.rating,
                reviewText:
                    existingEntry?.reviewText ??
                    existingEntry?.notes ??
                    currentUserReview?.content,
                notes:
                    existingEntry?.notes ??
                    existingEntry?.reviewText ??
                    currentUserReview?.content,
                isSpoiler: existingEntry?.isSpoiler ?? currentUserReview?.isSpoiler,
                formats: existingEntry?.formats ?? [],
                customLists: existingEntry?.customLists ?? [],
                dateStarted: existingEntry?.dateStarted,
                dateFinished: existingEntry?.dateFinished,
            };
            const updatePayload: UpdateLibraryEntryPayload = {
                status: status as UpdateLibraryEntryPayload["status"],
            };
            const savedEntry = await upsertLibraryEntry(
                existingEntry,
                createPayload,
                updatePayload
            );

            setCurrentUserReview({
                id: savedEntry.id,
                status: savedEntry.status,
                rating: savedEntry.rating,
                content: savedEntry.reviewText ?? savedEntry.notes,
                isSpoiler: savedEntry.isSpoiler,
                updatedAt: savedEntry.updatedAt,
            });

            if (typeof savedEntry.rating === "number") {
                setSelectedRating(savedEntry.rating);
            }
        } catch {
            setError("Could not update your shelf right now.");
        } finally {
            setIsSavingReadingStatus(false);
        }
    };

    const handleRemoveFromLibrary = async () => {
        if (!authState.isAuthenticated || !book) {
            return;
        }

        try {
            setIsSavingReadingStatus(true);
            setError(null);

            const existingEntry = await getLibraryEntryByBookId(book.id);

            if (!existingEntry) {
                setCurrentUserReview(null);
                setSelectedRating(null);
                return;
            }

            await deleteLibraryEntry(existingEntry.id);
            setCurrentUserReview(null);
            setSelectedRating(null);
        } catch {
            setError("Could not remove this book from your shelves right now.");
        } finally {
            setIsSavingReadingStatus(false);
        }
    };

    const handlePersistRating = async (rating: number) => {
        setSelectedRating(rating);

        if (!authState.isAuthenticated || !book) {
            return;
        }

        try {
            setError(null);

            const savedReview = await saveCurrentUserBookReview({
                externalBookId: book.id,
                title: book.title,
                author: book.authors[0],
                cover: book.coverUrl,
                publishedYear: getPublishedYear(book.publishDate),
                rating,
                notes: currentUserReview?.content,
            });

            setBook((currentBook) => {
                if (!currentBook) {
                    return currentBook;
                }

                return {
                    ...currentBook,
                    communityRating: applyUserRatingToCommunityRating(
                        currentBook.communityRating,
                        currentUserReview?.rating,
                        rating
                    ),
                };
            });
            setCurrentUserReview(savedReview);
        } catch {
            setError("Could not save your rating right now.");
        }
    };

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
                    <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                        <BookCoverPanel
                            coverUrl={book.coverUrl}
                            title={book.title}
                            rating={selectedRating}
                            readingStatus={currentUserReview?.status}
                            onChangeRating={handlePersistRating}
                            onEditActivity={() => openActivityEditor()}
                            onUpdateReadingStatus={handleUpdateReadingStatus}
                            onRemoveFromLibrary={handleRemoveFromLibrary}
                            isSavingReadingStatus={isSavingReadingStatus}
                        />
                    </div>

                    <div className="min-w-0">
                        <BookHero
                            title={book.title}
                            authorLabel={authorLabel}
                            series={book.series}
                            seriesPositionLabel={book.seriesPositionLabel}
                            communityRating={book.communityRating}
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
                                communityRating={book.communityRating}
                                currentUser={currentUser}
                                currentUserRating={selectedRating}
                                currentUserReview={currentUserReview ?? undefined}
                                onCurrentUserRatingChange={handlePersistRating}
                                onOpenReviewEditor={() => openActivityEditor("review")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
