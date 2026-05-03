
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
                    <p className="theme-title text-3xl font-semibold">{stat.value}</p>
                    <p className="theme-text mt-2 text-sm font-medium">{stat.label}</p>
                    <p className="theme-text-muted mt-1 text-xs leading-6">{stat.helperText}</p>
                </article>
            ))}
        </div>
    );
};

export type { ProfileStatItem, ProfileStatsGridProps };
export default ProfileStatsGrid;
