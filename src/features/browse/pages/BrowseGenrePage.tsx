import { useParams } from "react-router-dom";
import { getBrowseGenreFromRouteParam } from "../utils/browseRouting";

const BrowseGenrePage = () => {
    const { genreSlug } = useParams<{ genreSlug: string }>();
    const genre = getBrowseGenreFromRouteParam(genreSlug);

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <section className="theme-glass-panel rounded-[2.25rem] p-6 text-center sm:p-8 lg:p-10">
                    <p className="theme-eyebrow">Browse Genre</p>
                    <h1 className="theme-title mt-3 text-3xl font-semibold sm:text-4xl">
                        {genre?.title ?? "Genre not found"}
                    </h1>
                    <p className="theme-text-soft mt-4 text-sm leading-7 sm:text-[15px]">
                        {genre
                            ? "This genre page is ready for the full discovery implementation."
                            : "We could not match that browse genre."}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default BrowseGenrePage;
