
import type { ProfileActivityItem } from "../types/profile.types";

interface ProfileRecentActivityProps {
    items: ProfileActivityItem[];
    onOpenBook: (bookId: string) => void;
    onBrowseBooks: () => void;
}

const ProfileRecentActivity = ({ items, onOpenBook, onBrowseBooks }: ProfileRecentActivityProps) => {
    return (
        <section className="rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent activity</h2>
                <button
                    type="button"
                    onClick={onBrowseBooks}
                    className="text-sm font-medium text-amber-100 transition-colors duration-300 hover:text-amber-50"
                >
                    Find another book
                </button>
            </div>

            <div className="mt-6 space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-slate-400">No recent activity yet.</p>
                ) : (
                    items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => item.bookId ? onOpenBook(item.bookId) : undefined}
                            className="flex w-full items-start gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 text-left transition-all duration-300 hover:border-white/16 hover:bg-white/[0.06]"
                        >
                            <div className="h-16 w-12 shrink-0 overflow-hidden rounded-[0.85rem] border border-white/10 bg-white/6">
                                {item.coverUrl ? (
                                    <img
                                        src={item.coverUrl}
                                        alt={item.bookTitle ?? item.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-sm font-medium text-white">{item.title}</p>
                                    {item.statusLabel ? (
                                        <span className="rounded-full border border-white/10 bg-white/7 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                            {item.statusLabel}
                                        </span>
                                    ) : null}
                                </div>
                                <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                                <p className="mt-2 text-xs text-slate-500">{item.timestamp}</p>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </section>
    );
};

export type { ProfileRecentActivityProps };
export default ProfileRecentActivity;
