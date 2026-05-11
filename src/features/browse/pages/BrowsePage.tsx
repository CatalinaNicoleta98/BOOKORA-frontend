import BrowseCategorySection from "../components/BrowseCategorySection";
import { BROWSE_GENRES } from "../utils/browseGenres";

const BrowsePage = () => {
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
                    {BROWSE_GENRES.map((genre) => (
                        <BrowseCategorySection key={genre.slug} genre={genre} />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default BrowsePage;
