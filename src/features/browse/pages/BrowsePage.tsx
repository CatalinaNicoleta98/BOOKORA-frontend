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

                setSections(nextSections);
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
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
                    <div className="space-y-5">
                        <div className="flex flex-wrap items-end justify-between gap-4 px-1">
                            <div>
                                <p className="theme-eyebrow">Genres</p>
                                <h1 className="theme-title mt-2 text-[1.85rem] font-semibold sm:text-[2.1rem]">
                                    Browse by shelf
                                </h1>
                            </div>
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
                    </div>

                    <aside className="theme-content-panel hidden rounded-[1.8rem] p-5 xl:block xl:sticky xl:top-24">
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
