import BrowseBookCard from "./BrowseBookCard";
import { Link } from "react-router-dom";
import type { BrowseBookCardViewModel, BrowseGenreDefinition } from "../types/browse.types";
import { buildBrowseGenreRoute } from "../utils/browseRouting";

interface BrowseCategorySectionProps {
    genre: BrowseGenreDefinition;
    books: BrowseBookCardViewModel[];
}

const BrowseCategorySection = ({ genre, books }: BrowseCategorySectionProps) => {
    if (!books.length) {
        return null;
    }

    return (
        <section className="theme-glass-panel min-w-0 max-w-full rounded-[2rem] p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="theme-title text-[1.55rem] font-semibold">{genre.title}</h2>
                    <p className="theme-text-soft mt-2 text-sm leading-6">{genre.description}</p>
                </div>

                <Link
                    to={buildBrowseGenreRoute(genre.slug)}
                    className="theme-button-ghost inline-flex h-11 items-center justify-center self-start rounded-full px-4 text-sm font-medium"
                >
                    See more
                </Link>
            </div>

            <div className="bookora-rail-arrows mt-4 md:hidden" aria-hidden="true">
                <span>‹</span>
                <span>›</span>
            </div>

            <div className="bookora-mobile-rail mt-5 w-full min-w-0 max-w-full grid grid-flow-col auto-cols-[minmax(10.5rem,72vw)] gap-3.5 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible xl:grid-cols-6">
                {books.map((book) => (
                    <BrowseBookCard key={`${genre.slug}-${book.id}`} book={book} />
                ))}
            </div>
        </section>
    );
};

export default BrowseCategorySection;
