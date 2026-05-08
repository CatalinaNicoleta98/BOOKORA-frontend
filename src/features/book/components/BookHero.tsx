import { Fragment } from "react";
import { Link } from "react-router-dom";
import { buildAuthorDetailsRoute } from "../../authors/utils/authorRouting";
import { buildSeriesDetailsRoute } from "../../series/utils/seriesRouting";

import type { BookHeroProps } from "../types/book.types";

import BookRatingStars from "./BookRatingStars";

const BookHero = ({
    title,
    authorLabel,
    authorCredits,
    series,
    seriesPositionLabel,
    communityRating,
}: BookHeroProps) => {
    const hasSeries = Boolean(series?.key && series?.name);
    const seriesHref = hasSeries ? buildSeriesDetailsRoute(series!.key) : "#";
    const seriesLabel = [series?.name, seriesPositionLabel].filter(Boolean).join(" ");

    const formatNumber = (value?: number) => {
        if (!value && value !== 0) return undefined;
        return new Intl.NumberFormat().format(value);
    };

    return (
        <header className="w-full">
            {hasSeries ? (
                <Link
                    to={seriesHref}
                    className="theme-accent-text inline-flex w-fit items-center text-[1.05rem] font-medium italic transition-colors hover:text-[var(--bookora-title)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                    {seriesLabel}
                </Link>
            ) : null}

            <div className={hasSeries ? "mt-2.5 space-y-3" : "space-y-3"}>
                <h1 className="theme-title max-w-4xl font-serif text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[2.65rem] lg:text-[3.25rem] xl:text-[3.7rem]">
                    {title}
                </h1>

                <p className="theme-text-soft text-[1.05rem] leading-snug sm:text-[1.3rem]">
                    <span className="theme-text font-medium">
                        {authorCredits?.length
                            ? authorCredits.map((author, index) => (
                                  <Fragment key={`${author.key ?? author.name}-${index}`}>
                                      {index > 0 ? ", " : null}
                                      {author.key ? (
                                          <Link
                                              to={buildAuthorDetailsRoute(author.key)}
                                              className="transition-colors hover:text-white"
                                          >
                                              {author.name}
                                          </Link>
                                      ) : (
                                          author.name
                                      )}
                                  </Fragment>
                              ))
                            : authorLabel}
                    </span>
                </p>
                <div className="theme-text-soft mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <BookRatingStars value={communityRating.average} onChange={() => {}} readOnly />
                    <span className="theme-text font-medium">
                        {communityRating.average.toFixed(2)}
                    </span>
                    <span className="theme-text-muted">
                        {formatNumber(communityRating.ratingsCount)} ratings
                    </span>
                    <span className="theme-text-muted">
                        · {formatNumber(communityRating.reviewsCount)} reviews
                    </span>
                </div>
            </div>
        </header>
    );
};

export default BookHero;
