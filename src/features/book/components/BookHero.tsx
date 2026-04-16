import { Link } from "react-router-dom";

import type { BookHeroProps } from "../types/book.types";

const BookHero = ({
    title,
    authorLabel,
    series,
    seriesPositionLabel,
}: BookHeroProps) => {
    const hasSeries = Boolean(series?.key && series?.name);
    const seriesHref = hasSeries ? `/series/${encodeURIComponent(series!.key)}` : "#";
    const seriesLabel = [series?.name, seriesPositionLabel].filter(Boolean).join(" · ");

    return (
        <header className="w-full max-w-none">
            {hasSeries ? (
                <Link
                    to={seriesHref}
                    className="inline-flex w-fit items-center text-sm font-medium italic text-amber-100/80 transition-colors hover:text-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:text-[1.05rem]"
                >
                    {seriesLabel}
                </Link>
            ) : null}

            <div className={hasSeries ? "mt-3 space-y-3 sm:mt-4" : "space-y-3"}>
                <h1 className="max-w-3xl font-serif text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em] text-white sm:text-[2.35rem] lg:text-[3.15rem] xl:text-[3.45rem]">
                    {title}
                </h1>

                <p className="text-lg leading-snug text-slate-300 sm:text-[1.35rem]">
                    <span className="font-medium text-slate-100">{authorLabel}</span>
                </p>
            </div>
        </header>
    );
};

export default BookHero;