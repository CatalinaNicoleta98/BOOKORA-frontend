import { useEffect, useState } from "react";
import BrowseCategorySection from "../components/BrowseCategorySection";
import { getBrowseSections } from "../services/browseService";
import type { BrowseGenreSectionViewModel } from "../types/browse.types";

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
                <section className="theme-glass-panel rounded-[2.25rem] p-6 sm:p-8 lg:p-10">
                    <p className="theme-eyebrow">Browse</p>
                    <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                        Discover books by mood, genre, and vibe
                    </h1>
                    <p className="theme-text-soft mt-4 max-w-2xl text-sm leading-7 sm:text-[15px]">
                        Browse will become Bookora&apos;s discovery home, while search stays focused on direct search results.
                    </p>
                </section>

                <section className="grid gap-5">
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
                </section>
            </div>
        </div>
    );
};

export default BrowsePage;
