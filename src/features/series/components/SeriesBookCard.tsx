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
        <article className="theme-glass-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row">
                <Link
                    to={createBookRoute(book.key)}
                    className="theme-cover-shell mx-auto w-full max-w-[180px] shrink-0 overflow-hidden rounded-[1.2rem] sm:mx-0"
                >
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="aspect-[3/4] w-full object-cover"
                        />
                    ) : (
                        <div className="theme-text-muted flex aspect-[3/4] w-full items-center justify-center px-4 text-center text-xs font-semibold uppercase tracking-[0.18em]">
                            No cover
                        </div>
                    )}
                </Link>

                <div className="min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="theme-button-primary inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                            {positionLabel}
                        </span>
                        {typeof book.firstPublishYear === "number" ? (
                            <span className="theme-pill-subtle rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                                {book.firstPublishYear}
                            </span>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <Link
                            to={createBookRoute(book.key)}
                            className="theme-title text-xl font-semibold transition-colors hover:text-white"
                        >
                            {book.title}
                        </Link>
                        {book.authors.length ? (
                            <p className="theme-text-muted text-sm leading-6">
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
                        <p className="theme-text-soft text-sm leading-7">{book.description}</p>
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
