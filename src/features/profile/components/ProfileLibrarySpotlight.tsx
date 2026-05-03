import type { ProfileSpotlightItem } from "../types/profile.types";

interface ProfileLibrarySpotlightProps {
    items: ProfileSpotlightItem[];
    onOpenBook: (bookId: string) => void;
    onBrowseBooks: () => void;
}

const ProfileLibrarySpotlight = ({
    items,
    onOpenBook,
    onBrowseBooks
}: ProfileLibrarySpotlightProps) => {
    return (
        <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
            <div className="border-b border-[var(--bookora-border)] px-6 py-5 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Reading spotlight
                </p>
                <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">The books shaping your current reading mood</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                            Jump back into your active stack or pull something forward from Want to Read.
                        </p>
                    </div>
                    <button type="button" onClick={onBrowseBooks} className="theme-button-primary inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium">
                        Browse books
                    </button>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="px-6 py-8 sm:px-8">
                    <div className="theme-content-panel-muted rounded-[1.8rem] border-dashed p-6 text-sm leading-7 text-slate-400">
                        Your profile will start feeling alive once you add books to your library and mark one as in
                        progress.
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-3 sm:px-8">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onOpenBook(item.id)}
                            className="theme-content-panel-soft group flex h-full flex-col rounded-[1.8rem] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
                        >
                            <div className="flex gap-4">
                                <div className="theme-cover-shell h-28 w-20 shrink-0 overflow-hidden rounded-[1rem]">
                                    {item.coverUrl ? (
                                        <img
                                            src={item.coverUrl}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            No cover
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                                        {item.statusLabel}
                                    </span>
                                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-400">{item.author}</p>
                                    {item.progressLabel ? (
                                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">
                                            {item.progressLabel}
                                        </p>
                                    ) : null}
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-7 text-slate-400">{item.detail}</p>
                            <span className="mt-4 text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
                                Open book page
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
};

export type { ProfileLibrarySpotlightProps };
export default ProfileLibrarySpotlight;
