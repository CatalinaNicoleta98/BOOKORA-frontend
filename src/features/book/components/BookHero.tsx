import { Link } from "react-router-dom";

import type { BookHeroProps } from "../types/book.types";

import BookRatingStars from "./BookRatingStars";

const BookHero = ({
    title,
    authorLabel,
    series,
    seriesPositionLabel,
    averageRating,
    ratingsCount,
    reviewsCount,
}: BookHeroProps) => {
    const hasSeries = Boolean(series?.key && series?.name);
    const seriesHref = hasSeries ? `/series/${encodeURIComponent(series!.key)}` : "#";
    const seriesLabel = [series?.name, seriesPositionLabel].filter(Boolean).join(" ");

    const hasRating = typeof averageRating === "number";

    const formatNumber = (value?: number) => {
        if (!value && value !== 0) return undefined;
        return new Intl.NumberFormat().format(value);
    };

    return (
        <header className="w-full">
            {hasSeries ? (
                <Link
                    to={seriesHref}
                    className="inline-flex w-fit items-center text-[1.05rem] font-medium italic text-amber-100/80 transition-colors hover:text-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                    {seriesLabel}
                </Link>
            ) : null}

            <div className={hasSeries ? "mt-2.5 space-y-3" : "space-y-3"}>
                <h1 className="max-w-4xl font-serif text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-[2.65rem] lg:text-[3.25rem] xl:text-[3.7rem]">
                    {title}
                </h1>

                <p className="text-[1.05rem] leading-snug text-slate-200 sm:text-[1.3rem]">
                    <span className="font-medium text-slate-100">{authorLabel}</span>
                </p>
                {hasRating ? (
                    <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
                        <BookRatingStars value={averageRating} onChange={() => {}} readOnly />
                        <span className="text-slate-100 font-medium">
                            {averageRating?.toFixed(2)}
                        </span>
                        {ratingsCount ? (
                            <span className="text-slate-400">
                                · {formatNumber(ratingsCount)} ratings
                            </span>
                        ) : null}
                        {reviewsCount ? (
                            <span className="text-slate-400">
                                · {formatNumber(reviewsCount)} reviews
                            </span>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </header>
    );
};

export default BookHero;
