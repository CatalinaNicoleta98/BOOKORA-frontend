

import { Link } from "react-router-dom";

interface SearchResultCardProps {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    publishYear?: string;
    averageRating?: number;
    ratingsCount?: number;
    readsCount?: number;
}

const SearchReasultsCard = ({
    id,
    title,
    author,
    coverUrl,
    publishYear,
    averageRating,
    ratingsCount,
    readsCount
}: SearchResultCardProps) => {
    return (
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-white/14 hover:bg-white/[0.07]">
            <div className="flex flex-col gap-5 sm:flex-row">
                <div className="h-36 w-24 shrink-0 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b1020]/76">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                            No cover
                        </div>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold text-white">{title}</h2>
                        {publishYear ? (
                            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                {publishYear}
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 text-sm font-medium text-slate-300">by {author}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        {typeof averageRating === "number" ? (
                            <span className="font-medium text-amber-300">
                                ★ {averageRating.toFixed(1)}
                            </span>
                        ) : (
                            <span>No rating</span>
                        )}

                        {typeof ratingsCount === "number" ? (
                            <span>{ratingsCount.toLocaleString()} ratings</span>
                        ) : null}

                        {typeof readsCount === "number" ? (
                            <span>{readsCount.toLocaleString()} readers</span>
                        ) : null}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            to={`/books/${encodeURIComponent(id)}`}
                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 px-4 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/14"
                        >
                            View book
                        </Link>
                        <button
                            type="button"
                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                        >
                            Add to library
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SearchReasultsCard;