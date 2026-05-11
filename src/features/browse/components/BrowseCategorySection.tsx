import { Link } from "react-router-dom";
import type { BrowseGenreDefinition } from "../types/browse.types";
import { buildBrowseGenreRoute } from "../utils/browseRouting";

interface BrowseCategorySectionProps {
    genre: BrowseGenreDefinition;
}

const BrowseCategorySection = ({ genre }: BrowseCategorySectionProps) => {
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
        </section>
    );
};

export default BrowseCategorySection;
