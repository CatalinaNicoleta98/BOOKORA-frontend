import { Fragment } from "react";
import { Link } from "react-router-dom";
import { buildAuthorDetailsRoute } from "../../authors/utils/authorRouting";
import { APP_ROUTES } from "../../../shared/navigation/navigation";
import type { SeriesBookViewModel } from "../types/series.types";

const createBookRoute = (bookKey: string) =>
    APP_ROUTES.bookDetails.replace(":id", encodeURIComponent(bookKey));

interface SeriesBookCardProps {
    book: SeriesBookViewModel;
    index: number;
}

const SeriesBookCard = ({ book, index }: SeriesBookCardProps) => {
    const positionLabel = book.position ? `#${book.position}` : `Book ${index + 1}`;

    return (
        <article className="theme-content-panel group flex h-full flex-col gap-4 rounded-[1.5rem] p-4 transition-all duration-300 hover:border-[var(--bookora-border-strong)]">
            <div className="flex items-start justify-between gap-2.5">
                <span className="theme-button-primary inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {positionLabel}
                </span>
                {typeof book.firstPublishYear === "number" ? (
                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                        {book.firstPublishYear}
                    </span>
                ) : null}
            </div>

            <div className="flex gap-3.5">
                <Link
                    to={createBookRoute(book.key)}
                    className="theme-cover-shell h-32 w-[5.5rem] shrink-0 overflow-hidden rounded-[1rem]"
                >
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="theme-text-muted flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em]">
                            No cover
                        </div>
                    )}
                </Link>

                <div className="min-w-0 flex-1 space-y-2">
                    <div className="space-y-1.5">
                        <Link
                            to={createBookRoute(book.key)}
                            className="theme-title line-clamp-2 text-base font-semibold transition-colors hover:text-white"
                        >
                            {book.title}
                        </Link>
                        {book.authors.length ? (
                            <p className="theme-text-muted line-clamp-2 text-sm leading-5">
                                by{" "}
                                {book.authors.map((author, authorIndex) => (
                                    <Fragment key={`${author.key ?? author.name}-${authorIndex}`}>
                                        {authorIndex > 0 ? ", " : null}
                                        {author.key ? (
                                            <Link
                                                to={buildAuthorDetailsRoute(author.key)}
                                                className="transition-colors hover:text-[var(--bookora-title)]"
                                            >
                                                {author.name}
                                            </Link>
                                        ) : (
                                            author.name
                                        )}
                                    </Fragment>
                                ))}
                            </p>
                        ) : null}
                    </div>

                    {book.description ? (
                        <p className="theme-text-muted line-clamp-3 text-sm leading-6">
                            {book.description}
                        </p>
                    ) : (
                        <p className="theme-text-muted text-sm">
                            Open the book page to see more details.
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
};

export default SeriesBookCard;
