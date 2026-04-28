import { Link } from "react-router-dom";

interface BookSeriesSectionProps {
    series?: {
        key: string;
        name: string;
    };
    seriesPositionLabel?: string;
}

const BookSeriesSection = ({ series, seriesPositionLabel }: BookSeriesSectionProps) => {
    if (!series) {
        return null;
    }

    return (
        <section className="mt-8 space-y-2.5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Series</p>
            <p className="text-[1.05rem] leading-snug text-slate-200 sm:text-[1.3rem]">
                <span className="font-medium text-slate-100">
                    {series.name}
                    {seriesPositionLabel ? ` ${seriesPositionLabel}` : ""}
                </span>
            </p>
            <Link
                to={`/series/${encodeURIComponent(series.key)}`}
                className="inline-flex w-fit items-center text-[1.05rem] font-medium italic text-amber-100/80 transition-colors hover:text-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
                View full series →
            </Link>
        </section>
    );
};

export default BookSeriesSection;
