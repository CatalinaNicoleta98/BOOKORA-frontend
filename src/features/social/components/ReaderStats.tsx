import type { ReaderSummary } from "../types/social.types";

interface ReaderStatsProps {
    summary: ReaderSummary;
}

const ReaderStats = ({ summary }: ReaderStatsProps) => {
    const stats = [
        {
            label: "Books in library",
            value: summary.booksInLibrary,
            helperText: "Everything shelved across reading and listening."
        },
        {
            label: "Finished",
            value: summary.finishedCount,
            helperText: "Books and audiobooks this reader has completed."
        },
        {
            label: "In progress",
            value: summary.inProgressCount,
            helperText: "Current reads and listens that are still underway."
        },
        {
            label: "Public reviews",
            value: summary.reviewsCount,
            helperText: "Visible review text shared from this reader's library."
        }
    ];

    return (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <article key={stat.label} className="theme-content-panel-soft rounded-[1.75rem] p-5">
                    <p className="theme-title text-3xl font-semibold">{stat.value}</p>
                    <p className="theme-text mt-2 text-sm font-medium">{stat.label}</p>
                    <p className="theme-text-muted mt-1 text-xs leading-6">{stat.helperText}</p>
                </article>
            ))}
        </section>
    );
};

export type { ReaderStatsProps };
export default ReaderStats;
