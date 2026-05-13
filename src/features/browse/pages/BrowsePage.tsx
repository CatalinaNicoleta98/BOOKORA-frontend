import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrowseCategorySection from "../components/BrowseCategorySection";
import { getBrowseSections } from "../services/browseService";
import type { BrowseGenreSectionViewModel } from "../types/browse.types";
import { BROWSE_GENRES } from "../utils/browseGenres";
import { buildBrowseGenreRoute } from "../utils/browseRouting";

const BrowsePage = () => {
    const [sections, setSections] = useState<BrowseGenreSectionViewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const loadSections = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const nextSections = await getBrowseSections();

                if (!isActive) {
                    return;
                }

                setSections(nextSections.filter((section) => section.books.length > 0));
            } catch (loadError) {
                if (!isActive) {
                    return;
                }

                setError(loadError instanceof Error ? loadError.message : "Could not load browse categories.");
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void loadSections();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative flex w-full min-w-0 max-w-full flex-col gap-5 pb-16 pt-4 sm:gap-6 sm:pt-6">
                <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
                    <div className="min-w-0 space-y-5">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="theme-eyebrow">Genres</p>
                                <h1 className="theme-title mt-2 text-[1.85rem] font-semibold sm:text-[2.1rem]">
                                    Browse by shelf
                                </h1>
                            </div>
                        </div>

                    <div className="theme-content-panel bookora-mobile-rail w-full min-w-0 max-w-full rounded-[1.6rem] p-3 xl:hidden">
                        {BROWSE_GENRES.map((genre) => (
                            <Link
                                key={genre.slug}
                                to={buildBrowseGenreRoute(genre.slug)}
                                className="theme-content-panel-soft inline-flex shrink-0 items-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                            >
                                {genre.title}
                            </Link>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
                            <p className="theme-title text-base font-medium">Loading browse shelves...</p>
                            <p className="theme-text-muted mt-3 text-sm leading-7">
                                We are gathering a few categories to explore.
                            </p>
                        </div>
                    ) : null}

                    {!isLoading && error ? (
                        <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
                            <p className="theme-title text-base font-medium">Could not load browse right now.</p>
                            <p className="theme-text-muted mt-3 text-sm leading-7">{error}</p>
                        </div>
                    ) : null}

                    {!isLoading && !error
                        ? sections.map((section) => (
                              <BrowseCategorySection
                                  key={section.genre.slug}
                                  genre={section.genre}
                                  books={section.books}
                              />
                          ))
                        : null}

                    {!isLoading && !error && sections.length === 0 ? (
                        <div className="theme-content-panel-muted rounded-[1.6rem] px-5 py-4 text-sm leading-6 theme-text-muted">
                            Browse categories are temporarily quiet right now.
                        </div>
                    ) : null}
                    </div>

                    <aside className="theme-content-panel hidden min-w-0 rounded-[1.8rem] p-5 xl:block xl:sticky xl:top-24">
                        <p className="theme-eyebrow">All genres</p>
                        <div className="mt-4 space-y-2">
                            {BROWSE_GENRES.map((genre) => (
                                <Link
                                    key={genre.slug}
                                    to={buildBrowseGenreRoute(genre.slug)}
                                    className="theme-content-panel-soft block rounded-[1.1rem] px-4 py-3 text-sm transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                                >
                                    <p className="theme-title font-semibold">{genre.title}</p>
                                    <p className="theme-text-muted mt-1 line-clamp-2 text-xs leading-5">
                                        {genre.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    );
};

export default BrowsePage;
