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
            <div className="rounded-[1.25rem] border border-amber-200/18 bg-amber-200/[0.06] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                    Spoiler review
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                    This review is hidden because it contains spoilers.
                </p>
                <button
                    type="button"
                    onClick={() => setIsRevealed(true)}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-amber-200/20 bg-white/5 px-4 text-sm font-semibold text-amber-100 transition-colors hover:bg-white/10"
                >
                    Show review
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/35 px-5 py-4">
            <p className="text-sm leading-7 text-slate-200">
                {review.content}
            </p>
            {review.isSpoiler ? (
                <button
                    type="button"
                    onClick={() => setIsRevealed(false)}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
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
                      ? new Date(currentUserReview.updatedAt).toLocaleDateString()
                      : "Just now",
                  source: "bookora" as const,
              }
            : undefined;
    const visibleCommunityReviews = reviews ?? [];
    const hasReviews = visibleCommunityReviews.length > 0;

    return (
        <section className="border-t border-white/8 pt-6 sm:pt-7">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Ratings & reviews
                </p>
                <h2 className="text-[1.05rem] font-semibold text-white sm:text-[1.15rem]">
                    Community thoughts
                </h2>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                <BookRatingStars value={communityRating.average} onChange={() => {}} readOnly />
                <span className="font-medium text-slate-100">{communityRating.average.toFixed(2)}</span>
                <span>· {formattedRatingsCount} ratings</span>
                <span>· {formattedReviewsCount} reviews</span>
            </div>

            {currentUser ? (
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.56),rgba(15,23,42,0.2))] p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
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
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/8 text-lg font-semibold text-slate-200 ring-1 ring-white/10">
                                        {currentUser.name.slice(0, 1).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 space-y-1">
                                <p className="text-base font-semibold text-slate-100">
                                    {currentUser.name}
                                </p>
                                <p className="text-sm text-slate-400">
                                    {currentUserReview?.content ? "Your latest thoughts on this book" : "Your review will appear here once you write it"}
                                </p>
                            </div>
                        </div>

                        <div className="min-w-0 space-y-5">
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem]">
                                        {formatStatusHeading(currentUserReview?.status)}
                                    </h3>

                                    <div className="space-y-2">
                                        <BookRatingStars
                                            value={currentUserRating ?? null}
                                            onChange={onCurrentUserRatingChange}
                                        />
                                        <p className="text-sm text-slate-400">
                                            Rating changes are saved with half-star precision and move this book to your finished shelf.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={onOpenReviewEditor}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {currentUserReview?.content ? "Edit Review" : "Write a Review"}
                                </button>
                            </div>

                            {currentUserReview?.content ? (
                                currentUserReviewCardReview ? <SpoilerReviewContent review={currentUserReviewCardReview} /> : null
                            ) : (
                                <div className="rounded-[1.25rem] border border-dashed border-white/10 bg-slate-950/20 px-5 py-4">
                                    <p className="text-sm leading-7 text-slate-400">
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
                        <h3 className="text-lg font-semibold text-white">Community reviews</h3>
                        <p className="text-sm text-slate-500">
                            From Bookora readers and external sources when available
                        </p>
                    </div>

                    {visibleCommunityReviews.map((review) => (
                        <article
                            key={review.id}
                            className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.42),rgba(15,23,42,0.2))] p-5 sm:p-6"
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
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-slate-200 ring-1 ring-white/10">
                                            {review.userName.slice(0, 1).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-slate-100">
                                            {review.userName}
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                                            {review.source === "bookora" ? "Bookora reader" : "Open Library"}
                                        </p>
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <BookRatingStars value={review.rating} onChange={() => {}} size="sm" readOnly />
                                        <p className="text-sm text-slate-400">{review.createdAt}</p>
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
