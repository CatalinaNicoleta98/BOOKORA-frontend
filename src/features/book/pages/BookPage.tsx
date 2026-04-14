import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import type { BookData } from "../types/book.types";
import { createDescriptionPreview, getBookDescription, getCoverUrl } from "../utils/bookPage.utils";
import BookCoverPanel from "../components/BookCoverPanel";
import BookHero from "../components/BookHero";
import BookActions from "../components/BookActions";
import BookAboutSection from "../components/BookAboutSection";
import BookDetailsPanel from "../components/BookDetailsPanel";

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
                            <BookHero title={book.title} authorLabel={authorLabel} />

                            <BookActions
                                onAddToLibrary={() => console.log("Add to library clicked")}
                                onWantToRead={() => console.log("Want to read clicked")}
                                onWriteReview={() => console.log("Write review clicked")}
                            />

                            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
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
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BookPage;