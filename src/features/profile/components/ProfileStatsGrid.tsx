

interface ProfileStatItem {
    value: string;
    label: string;
    helperText: string;
}

interface ProfileStatsGridProps {
    stats: ProfileStatItem[];
}

const ProfileStatsGrid = ({ stats }: ProfileStatsGridProps) => {
    return (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <article
                    key={stat.label}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl"
                >
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium text-slate-200">{stat.label}</p>
                    <p className="mt-1 text-xs leading-6 text-slate-400">{stat.helperText}</p>
                </article>
            ))}
        </div>
    );
};

export type { ProfileStatItem, ProfileStatsGridProps };
export default ProfileStatsGrid;