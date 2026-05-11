import type { SeriesDetailsViewModel } from "../types/series.types";

interface SeriesHeroProps {
    series: SeriesDetailsViewModel;
}

const SeriesHero = ({ series }: SeriesHeroProps) => {
    return (
        <section className="theme-glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl space-y-5">
                <div className="space-y-3">
                    <p className="theme-accent-text text-sm font-semibold uppercase tracking-[0.22em]">
                        Series page
                    </p>
                    <h1 className="theme-title font-serif text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-[3.1rem]">
                        {series.title}
                    </h1>
                    <p className="theme-text-soft text-base sm:text-lg">
                        {series.bookCount} book{series.bookCount === 1 ? "" : "s"} in reading order
                    </p>
                </div>

                {series.description ? (
                    <p className="theme-text-soft text-sm leading-7 sm:text-[15px]">
                        {series.description}
                    </p>
                ) : (
                    <p className="theme-text-muted text-sm">
                        Explore the books in this series in the order Bookora could verify from Open
                        Library metadata.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SeriesHero;
