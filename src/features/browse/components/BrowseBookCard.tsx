import { Link } from "react-router-dom";
import { buildBookDetailsRoute } from "../../book/utils/bookRouting";
import type { BrowseBookCardViewModel } from "../types/browse.types";

interface BrowseBookCardProps {
    book: BrowseBookCardViewModel;
}

const BrowseBookCard = ({ book }: BrowseBookCardProps) => {
    return (
        <Link
            to={buildBookDetailsRoute(book.id)}
            className="theme-content-panel-soft group block h-full w-full min-w-0 max-w-full rounded-[1.35rem] p-3 sm:p-3.5"
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

            <div className="mt-3 space-y-1.5">
                <h3 className="theme-title line-clamp-2 text-sm font-semibold leading-5">{book.title}</h3>
                <p className="theme-text-muted line-clamp-1 text-xs">{book.author}</p>
                {book.publishedYear ? (
                    <p className="theme-text-muted text-xs">{book.publishedYear}</p>
                ) : null}
            </div>
        </Link>
    );
};

export default BrowseBookCard;
