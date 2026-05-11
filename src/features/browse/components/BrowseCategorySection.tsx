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
        <section className="theme-glass-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="theme-title text-[1.55rem] font-semibold">{genre.title}</h2>
                    <p className="theme-text-soft mt-2 text-sm leading-6">{genre.description}</p>
                </div>

                <Link to={buildBrowseGenreRoute(genre.slug)} className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium">
                    See more
                </Link>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-6">
                {books.map((book) => (
                    <BrowseBookCard key={`${genre.slug}-${book.id}`} book={book} />
                ))}
            </div>
        </section>
    );
};

export default BrowseCategorySection;
