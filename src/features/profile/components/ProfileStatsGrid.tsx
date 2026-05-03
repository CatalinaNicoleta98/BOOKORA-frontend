
import type { ProfileStatItem } from "../types/profile.types";

interface ProfileStatsGridProps {
    stats: ProfileStatItem[];
}

const ProfileStatsGrid = ({ stats }: ProfileStatsGridProps) => {
    return (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <article
                    key={stat.label}
                    className="theme-content-panel-soft rounded-[1.75rem] p-5"
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
