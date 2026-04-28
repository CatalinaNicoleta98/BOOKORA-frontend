import type { BookReviewsSectionProps } from "../types/book.types";

import BookRatingStars from "./BookRatingStars";

const formatNumber = (value?: number) => {
    if (typeof value !== "number") {
        return undefined;
    }

    return new Intl.NumberFormat().format(value);
};

const BookReviewsSection = ({
    reviews,
    averageRating,
    ratingsCount,
    reviewsCount,
    currentUser,
    currentUserRating,
    currentUserReview,
    reviewDraft,
    onReviewDraftChange,
    onCurrentUserRatingChange,
    onSaveCurrentUserReview,
    isSavingCurrentUserReview = false,
}: BookReviewsSectionProps) => {
    const hasReviews = Boolean(reviews?.length);
    const formattedRatingsCount = formatNumber(ratingsCount);
    const formattedReviewsCount = formatNumber(reviewsCount);

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

            {typeof averageRating === "number" ? (
                <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                    <BookRatingStars value={averageRating} onChange={() => {}} readOnly />
                    <span className="font-medium text-slate-100">{averageRating.toFixed(2)}</span>
                    {formattedRatingsCount ? <span>· {formattedRatingsCount} ratings</span> : null}
                    {formattedReviewsCount ? <span>· {formattedReviewsCount} reviews</span> : null}
                </div>
            ) : null}

            {currentUser ? (
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.24))] p-5 sm:p-6">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            My review
                        </p>
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-start gap-4">
                                {currentUser.avatarUrl ? (
                                    <img
                                        src={currentUser.avatarUrl}
                                        alt={currentUser.name}
                                        className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                                    />
                                ) : (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/8 text-lg font-semibold text-slate-200 ring-1 ring-white/10">
                                        {currentUser.name.slice(0, 1).toUpperCase()}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <p className="text-base font-semibold text-slate-100">
                                        {currentUser.name}
                                    </p>

                                    <BookRatingStars
                                        value={currentUserRating ?? null}
                                        onChange={onCurrentUserRatingChange}
                                    />

                                    <textarea
                                        value={reviewDraft}
                                        onChange={(event) => onReviewDraftChange(event.target.value)}
                                        placeholder="Share what you thought about this book..."
                                        className="min-h-28 w-full rounded-[1rem] border border-white/10 bg-slate-950/45 px-4 py-3 text-sm leading-7 text-slate-200 outline-none transition-colors placeholder:text-slate-500 focus:border-amber-200/30"
                                    />

                                    {!currentUserReview?.content ? (
                                        <p className="text-sm leading-7 text-slate-400">
                                            You have not written a review for this book yet.
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-2">
                                <button
                                    type="button"
                                    onClick={onSaveCurrentUserReview}
                                    disabled={isSavingCurrentUserReview}
                                    className="inline-flex h-11 items-center justify-center rounded-full border border-amber-200/20 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(251,191,36,0.08))] px-5 text-sm font-semibold text-amber-100 transition-all hover:border-amber-200/35 hover:bg-[linear-gradient(180deg,rgba(251,191,36,0.2),rgba(251,191,36,0.12))] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSavingCurrentUserReview
                                        ? "Saving..."
                                        : currentUserReview
                                        ? "Save changes"
                                        : "Write a review"}
                                </button>
                                <p className="text-xs text-slate-500">
                                    Rating changes are saved with half-star precision and added to your reading list automatically.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {hasReviews ? (
                <div className="mt-5 space-y-4">
                    {reviews!
                        .filter((review) => review.id !== currentUserReview?.id)
                        .map((review) => (
                        <article
                            key={review.id}
                            className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-sm font-semibold text-slate-100">
                                    {review.userName}
                                </p>
                                <BookRatingStars value={review.rating} onChange={() => {}} size="sm" readOnly />
                                <p className="text-sm text-slate-400">{review.createdAt}</p>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                {review.content}
                            </p>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.24))] p-6">
                    <p className="text-base font-medium text-slate-100">
                        Reviews will appear here once readers start reviewing this book.
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                        Open Library does not currently provide free-form text reviews for this book, so this space is ready for Bookora reader reviews and future external review support when real written content is available.
                    </p>
                </div>
            )}
        </section>
    );
};

export default BookReviewsSection;
