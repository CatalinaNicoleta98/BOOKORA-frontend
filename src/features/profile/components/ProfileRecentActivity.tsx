
import type { ProfileActivityItem } from "../types/profile.types";

interface ProfileRecentActivityProps {
    items: ProfileActivityItem[];
    onOpenBook: (bookId: string) => void;
    onBrowseBooks: () => void;
}

const ProfileRecentActivity = ({ items, onOpenBook, onBrowseBooks }: ProfileRecentActivityProps) => {
    return (
        <section className="theme-content-panel rounded-[2rem] p-6">
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
                            className="theme-content-panel-soft flex w-full items-start gap-4 rounded-[1.4rem] p-4 text-left transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                        >
                            <div className="theme-cover-shell h-16 w-12 shrink-0 overflow-hidden rounded-[0.85rem]">
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
                                        <span className="theme-pill-subtle rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
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
