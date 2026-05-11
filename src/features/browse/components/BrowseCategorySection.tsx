import BrowseBookCard from "./BrowseBookCard";
import { Link } from "react-router-dom";
import type { BrowseBookCardViewModel, BrowseGenreDefinition } from "../types/browse.types";
import { buildBrowseGenreRoute } from "../utils/browseRouting";

interface BrowseCategorySectionProps {
    genre: BrowseGenreDefinition;
    books: BrowseBookCardViewModel[];
}

const BrowseCategorySection = ({ genre, books }: BrowseCategorySectionProps) => {
    return (
        <section className="theme-glass-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="theme-eyebrow">Browse</p>
                    <h2 className="theme-title mt-2 text-2xl font-semibold">{genre.title}</h2>
                    <p className="theme-text-soft mt-2 text-sm leading-6">{genre.description}</p>
                </div>

                <Link to={buildBrowseGenreRoute(genre.slug)} className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium">
                    See more
                </Link>
            </div>

            {books.length ? (
                <div className="mt-5 grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-6">
                    {books.map((book) => (
                        <BrowseBookCard key={`${genre.slug}-${book.id}`} book={book} />
                    ))}
                </div>
            ) : (
                <div className="theme-content-panel-muted mt-5 rounded-[1.4rem] border-dashed p-4 text-sm leading-6 theme-text-muted">
                    No preview books are available for this category right now.
                </div>
            )}
        </section>
    );
};

export default BrowseCategorySection;
