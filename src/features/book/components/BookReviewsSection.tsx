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
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                    <BookRatingStars value={averageRating} onChange={() => {}} readOnly />
                    <span className="font-medium text-slate-100">{averageRating.toFixed(2)}</span>
                    {formattedRatingsCount ? <span>· {formattedRatingsCount} ratings</span> : null}
                    {formattedReviewsCount ? <span>· {formattedReviewsCount} reviews</span> : null}
                </div>
            ) : null}

            {hasReviews ? (
                <div className="mt-5 space-y-4">
                    {reviews!.map((review) => (
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
                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                    <p className="text-base font-medium text-slate-100">
                        Reviews will appear here once readers start reviewing this book.
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                        Community feedback, highlighted reactions, and reader impressions will show up in this section as Bookora collects them.
                    </p>
                </div>
            )}
        </section>
    );
};

export default BookReviewsSection;
