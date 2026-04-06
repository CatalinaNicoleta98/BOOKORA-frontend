

export interface ProfileActivityItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
}

interface ProfileRecentActivityProps {
    items: ProfileActivityItem[];
}

const ProfileRecentActivity = ({ items }: ProfileRecentActivityProps) => {
    return (
        <section className="rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent activity</h2>
            </div>

            <div className="mt-6 space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-slate-400">No recent activity yet.</p>
                ) : (
                    items.map((item) => (
                        <article
                            key={item.id}
                            className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4"
                        >
                            <p className="text-sm font-medium text-white">{item.title}</p>
                            <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                            <p className="mt-2 text-xs text-slate-500">{item.timestamp}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};

export type { ProfileRecentActivityProps };
export default ProfileRecentActivity;