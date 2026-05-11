import SeriesBookCard from "./SeriesBookCard";
import type { SeriesBookViewModel } from "../types/series.types";

interface SeriesReadingOrderProps {
    books: SeriesBookViewModel[];
}

const SeriesReadingOrder = ({ books }: SeriesReadingOrderProps) => {
    if (!books.length) {
        return (
            <section className="theme-glass-panel rounded-[2rem] p-8 text-center">
                <p className="theme-title text-lg font-semibold">No books found</p>
                <p className="theme-text-muted mt-3 text-sm leading-7">
                    We could not verify any books for this series yet.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-5">
            <div className="space-y-2">
                <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                    Reading order
                </p>
                <h2 className="theme-title text-[1.45rem] font-semibold sm:text-[1.7rem]">
                    All books in sequence
                </h2>
            </div>

            <div className="space-y-4">
                {books.map((book, index) => (
                    <SeriesBookCard key={book.key} book={book} index={index} />
                ))}
            </div>
        </section>
    );
};

export default SeriesReadingOrder;
