import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../shared/navigation/navigation";
import type { AuthorBookCardViewModel } from "../types/author.types";

const createBookRoute = (bookKey: string) =>
    APP_ROUTES.bookDetails.replace(":id", encodeURIComponent(bookKey));

interface AuthorBookCardProps {
    book: AuthorBookCardViewModel;
}

const AuthorBookCard = ({ book }: AuthorBookCardProps) => {
    const seriesMeta = [book.seriesTitle, book.seriesPosition ? `#${book.seriesPosition}` : undefined]
        .filter(Boolean)
        .join(" ");

    return (
        <Link
            to={createBookRoute(book.key)}
            className="theme-content-panel group flex h-full flex-col gap-3 rounded-[1.35rem] p-3.5 transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
        >
            <div className="theme-cover-shell overflow-hidden rounded-[1rem]">
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                ) : (
                    <div className="theme-text-muted flex aspect-[3/4] w-full items-center justify-center px-4 text-center text-xs font-semibold uppercase tracking-[0.18em]">
                        No cover
                    </div>
                )}
            </div>

            <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                    {typeof book.firstPublishYear === "number" ? (
                        <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                            {book.firstPublishYear}
                        </span>
                    ) : null}
                    {seriesMeta ? (
                        <span className="theme-text-muted line-clamp-1 text-xs font-medium">
                            {seriesMeta}
                        </span>
                    ) : null}
                </div>

                <h3 className="theme-title line-clamp-2 text-base font-semibold">{book.title}</h3>

                {book.description ? (
                    <p className="theme-text-muted line-clamp-2 text-sm leading-6">{book.description}</p>
                ) : (
                    <p className="theme-text-muted text-sm">Open book details</p>
                )}
            </div>
        </Link>
    );
};

export default AuthorBookCard;
