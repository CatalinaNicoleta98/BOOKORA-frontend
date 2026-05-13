import { useRef } from "react";
import BrowseBookCard from "./BrowseBookCard";
import { Link } from "react-router-dom";
import type { BrowseBookCardViewModel, BrowseGenreDefinition } from "../types/browse.types";
import { buildBrowseGenreRoute } from "../utils/browseRouting";

interface BrowseCategorySectionProps {
    genre: BrowseGenreDefinition;
    books: BrowseBookCardViewModel[];
}

const BrowseCategorySection = ({ genre, books }: BrowseCategorySectionProps) => {
    const railRef = useRef<HTMLDivElement | null>(null);

    if (!books.length) {
        return null;
    }

    const scrollRail = (direction: "left" | "right") => {
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        const offset = Math.max(rail.clientWidth * 0.82, 180);
        rail.scrollBy({
            left: direction === "left" ? -offset : offset,
            behavior: "smooth",
        });
    };

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

            <div className="bookora-rail-arrows mt-4 md:hidden">
                <button type="button" onClick={() => scrollRail("left")} aria-label={`Scroll ${genre.title} books left`}>
                    ‹
                </button>
                <button type="button" onClick={() => scrollRail("right")} aria-label={`Scroll ${genre.title} books right`}>
                    ›
                </button>
            </div>

            <div ref={railRef} className="bookora-mobile-rail mt-5 w-full min-w-0 max-w-full grid grid-flow-col auto-cols-[minmax(10.5rem,72vw)] gap-3.5 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible xl:grid-cols-6">
                {books.map((book) => (
                    <BrowseBookCard key={`${genre.slug}-${book.id}`} book={book} />
                ))}
            </div>
        </section>
    );
};

export default BrowseCategorySection;
