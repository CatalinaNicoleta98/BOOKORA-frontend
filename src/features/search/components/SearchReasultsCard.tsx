
import { Link } from "react-router-dom";
import { buildAuthorDetailsRoute } from "../../authors/utils/authorRouting";
import { buildBookDetailsRoute } from "../../book/utils/bookRouting";

interface SearchResultCardProps {
    id: string;
    title: string;
    author: string;
    authorKey?: string;
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
    authorKey,
    coverUrl,
    publishYear,
    averageRating,
    ratingsCount,
    readsCount
}: SearchResultCardProps) => {
    return (
        <article className="theme-glass-panel overflow-hidden rounded-[2rem] p-5 transition-all duration-300 hover:border-[var(--bookora-border-strong)]">
            <div className="flex flex-col gap-5 sm:flex-row">
                <div className="theme-cover-shell h-36 w-24 shrink-0 overflow-hidden rounded-[1.25rem]">
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
                            <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                {publishYear}
                            </span>
                        ) : null}
                    </div>

                    <p className="mt-2 text-sm font-medium text-slate-300">
                        by{" "}
                        {authorKey ? (
                            <Link
                                to={buildAuthorDetailsRoute(authorKey)}
                                className="transition-colors hover:text-white"
                            >
                                {author}
                            </Link>
                        ) : (
                            author
                        )}
                    </p>

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
                            to={buildBookDetailsRoute(id)}
                            className="theme-button-primary inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-all duration-300"
                        >
                            View book
                        </Link>
                        <button
                            type="button"
                            className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium"
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
