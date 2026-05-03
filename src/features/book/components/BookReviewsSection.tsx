import { useState } from "react";

import type { BookReviewsSectionProps, Review } from "../types/book.types";

import BookRatingStars from "./BookRatingStars";

const getImageSource = (imagePath?: string | null) => {
    if (!imagePath) {
        return undefined;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `http://localhost:4000${imagePath}`;
};

const formatNumber = (value?: number) => {
    if (typeof value !== "number") {
        return undefined;
    }

    return new Intl.NumberFormat().format(value);
};

const formatReviewDate = (value?: string) => {
    if (!value) {
        return "";
    }

    const timestamp = Date.parse(value);

    if (Number.isNaN(timestamp)) {
        return value;
    }

    return new Date(timestamp).toLocaleDateString();
};

const formatStatusHeading = (status?: string) => {
    switch (status) {
        case "finished_reading":
            return "Read.";
        case "finished_listening":
            return "Finished Listening.";
        case "want_to_read":
            return "Want to Read.";
        case "currently_listening":
            return "Currently Listening.";
        case "on_break":
            return "On Break.";
        case "did_not_finish":
            return "Did Not Finish.";
        case "currently_reading":
        default:
            return "Currently Reading.";
    }
};

const SpoilerReviewContent = ({
    review,
}: {
    review: Review;
}) => {
    const [isRevealed, setIsRevealed] = useState(!review.isSpoiler);

    if (review.isSpoiler && !isRevealed) {
        return (
            <div className="theme-content-panel-soft rounded-[1.25rem] px-5 py-4">
                <p className="theme-accent-text text-xs font-semibold uppercase tracking-[0.16em]">
                    Spoiler review
                </p>
                <p className="theme-text-soft mt-2 text-sm leading-7">
                    This review is hidden because it contains spoilers.
                </p>
                <button
                    type="button"
                    onClick={() => setIsRevealed(true)}
                    className="theme-button-accent mt-4 inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold"
                >
                    Show review
                </button>
            </div>
        );
    }

    return (
        <div className="theme-content-panel-soft rounded-[1.25rem] px-5 py-4">
            <p className="theme-text text-sm leading-7">
                {review.content}
            </p>
            {review.isSpoiler ? (
                <button
                    type="button"
                    onClick={() => setIsRevealed(false)}
                    className="theme-button-ghost mt-4 inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold uppercase tracking-[0.14em]"
                >
                    Hide spoilers
                </button>
            ) : null}
        </div>
    );
};

const BookReviewsSection = ({
    reviews,
    communityRating,
    currentUser,
    currentUserRating,
    currentUserReview,
    onCurrentUserRatingChange,
    onOpenReviewEditor,
}: BookReviewsSectionProps) => {
    const formattedRatingsCount = formatNumber(communityRating.ratingsCount);
    const formattedReviewsCount = formatNumber(communityRating.reviewsCount);
    const currentUserAvatarSource = getImageSource(currentUser?.avatarUrl);
    const currentUserReviewCardReview =
        currentUser && currentUserReview?.content
            ? {
                  id: currentUserReview.id,
                  userName: currentUser.name,
                  rating: currentUserReview.rating ?? currentUserRating ?? 0,
                  content: currentUserReview.content,
                  avatarUrl: currentUser.avatarUrl,
                  isSpoiler: currentUserReview.isSpoiler ?? false,
                  createdAt: currentUserReview.updatedAt
                      ? formatReviewDate(currentUserReview.updatedAt)
                      : "Just now",
                  source: "bookora" as const,
              }
            : undefined;
    const visibleCommunityReviews = reviews ?? [];
    const hasReviews = visibleCommunityReviews.length > 0;

    return (
        <section className="border-t border-[var(--bookora-border)] pt-6 sm:pt-7">
            <div className="space-y-2">
                <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                    Ratings & reviews
                </p>
                <h2 className="theme-title text-[1.05rem] font-semibold sm:text-[1.15rem]">
                    Community thoughts
                </h2>
            </div>

            <div className="theme-content-panel-soft mt-5 flex flex-wrap items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm text-slate-300">
                <BookRatingStars value={communityRating.average} onChange={() => {}} readOnly />
                <span className="theme-text font-medium">{communityRating.average.toFixed(2)}</span>
                <span>· {formattedRatingsCount} ratings</span>
                <span>· {formattedReviewsCount} reviews</span>
            </div>

            {currentUser ? (
                <div className="theme-content-panel mt-6 rounded-[1.75rem] p-5 sm:p-6">
                    <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                        My review
                    </p>

                    <div className="mt-5 grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
                        <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
                            <div className="shrink-0">
                                {currentUserAvatarSource ? (
                                    <img
                                        src={currentUserAvatarSource}
                                        alt={currentUser.name}
                                        className="h-16 w-16 rounded-full object-cover ring-1 ring-white/10"
                                    />
                                ) : (
                                    <div className="theme-cover-shell flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-slate-200 ring-1 ring-[var(--bookora-border)]">
                                        {currentUser.name.slice(0, 1).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 space-y-1">
                                <p className="theme-text text-base font-semibold">
                                    {currentUser.name}
                                </p>
                                <p className="theme-text-muted text-sm">
                                    {currentUserReview?.content ? "Your latest thoughts on this book" : "Your review will appear here once you write it"}
                                </p>
                            </div>
                        </div>

                        <div className="min-w-0 space-y-5">
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-4">
                                    <h3 className="theme-title text-3xl font-semibold tracking-tight sm:text-[2.5rem]">
                                        {formatStatusHeading(currentUserReview?.status)}
                                    </h3>

                                    <div className="space-y-2">
                                        <BookRatingStars
                                            value={currentUserRating ?? null}
                                            onChange={onCurrentUserRatingChange}
                                        />
                                        <p className="theme-text-muted text-sm">
                                            Rating changes are saved with half-star precision and move this book to your finished shelf.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={onOpenReviewEditor}
                                    className="theme-button-ghost inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {currentUserReview?.content ? "Edit Review" : "Write a Review"}
                                </button>
                            </div>

                            {currentUserReview?.content ? (
                                currentUserReviewCardReview ? <SpoilerReviewContent review={currentUserReviewCardReview} /> : null
                            ) : (
                                <div className="theme-content-panel-muted rounded-[1.25rem] border-dashed px-5 py-4">
                                    <p className="theme-text-muted text-sm leading-7">
                                        You have not written a review for this book yet. Your rating is already saved, and your written review can live here once the dedicated review page is ready.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}

            {hasReviews ? (
                <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="theme-title text-lg font-semibold">Community reviews</h3>
                        <p className="theme-text-muted text-sm">
                            From Bookora readers and external sources when available
                        </p>
                    </div>

                    {visibleCommunityReviews.map((review) => (
                        <article
                            key={review.id}
                            className="theme-content-panel rounded-[1.5rem] p-5 sm:p-6"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <div className="flex items-center gap-3 sm:w-52 sm:flex-col sm:items-start sm:gap-2">
                                    {getImageSource(review.avatarUrl) ? (
                                        <img
                                            src={getImageSource(review.avatarUrl)}
                                            alt={review.userName}
                                            className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                                        />
                                    ) : (
                                        <div className="theme-cover-shell flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-slate-200 ring-1 ring-[var(--bookora-border)]">
                                            {review.userName.slice(0, 1).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <p className="theme-text text-sm font-semibold">
                                            {review.userName}
                                        </p>
                                        <p className="theme-text-muted text-xs uppercase tracking-[0.14em]">
                                            {review.source === "bookora" ? "Bookora reader" : "Open Library"}
                                        </p>
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <BookRatingStars value={review.rating} onChange={() => {}} size="sm" readOnly />
                                        <p className="text-sm text-slate-400">{formatReviewDate(review.createdAt)}</p>
                                    </div>

                                    <SpoilerReviewContent
                                        review={review}
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.24))] p-6">
                    <p className="text-base font-medium text-slate-100">
                        Community reviews will appear here once public review text is available for this book.
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                        Your own review still appears above in the personal section. This community area is reserved for reviews returned as public book reviews so every reader sees the same list.
                    </p>
                </div>
            )}
        </section>
    );
};

export default BookReviewsSection;
