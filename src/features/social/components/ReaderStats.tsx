import type { ReaderSummary } from "../types/social.types";

interface ReaderStatsProps {
    summary: ReaderSummary;
}

const ReaderStats = ({ summary }: ReaderStatsProps) => {
    const stats = [
        {
            label: "Books in library",
            value: summary.booksInLibrary,
            helperText: "Everything shelved across reading and listening.",
            accent: "from-amber-200/22 via-amber-100/10 to-transparent"
        },
        {
            label: "Finished",
            value: summary.finishedCount,
            helperText: "Books and audiobooks this reader has completed.",
            accent: "from-emerald-200/22 via-emerald-100/10 to-transparent"
        },
        {
            label: "In progress",
            value: summary.inProgressCount,
            helperText: "Current reads and listens that are still underway.",
            accent: "from-sky-200/22 via-sky-100/10 to-transparent"
        },
        {
            label: "Public reviews",
            value: summary.reviewsCount,
            helperText: "Visible review text shared from this reader's library.",
            accent: "from-fuchsia-200/22 via-fuchsia-100/10 to-transparent"
        }
    ];

    return (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <article
                    key={stat.label}
                    className="theme-content-panel-soft relative overflow-hidden rounded-[1.75rem] p-5"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent}`} />
                    <div className="relative">
                    <p className="theme-title text-3xl font-semibold">{stat.value}</p>
                    <p className="theme-text mt-2 text-sm font-medium">{stat.label}</p>
                    <p className="theme-text-muted mt-1 text-xs leading-6">{stat.helperText}</p>
                    </div>
                </article>
            ))}
        </section>
    );
};

export type { ReaderStatsProps };
export default ReaderStats;
