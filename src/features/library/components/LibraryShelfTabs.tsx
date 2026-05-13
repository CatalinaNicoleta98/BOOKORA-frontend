import type { ReadingStatus } from "../types/library.types";

type ShelfTab = {
    label: string;
    value: ReadingStatus;
};

interface LibraryShelfTabsProps {
    tabs: ShelfTab[];
    activeShelf: ReadingStatus;
    counts: Record<ReadingStatus, number>;
    onChange: (shelf: ReadingStatus) => void;
}

const LibraryShelfTabs = ({
    tabs,
    activeShelf,
    counts,
    onChange,
}: LibraryShelfTabsProps) => {
    return (
        <aside className="theme-content-panel min-w-0 max-w-full overflow-hidden rounded-[1.5rem] p-2.5 sm:p-3 lg:sticky lg:top-24 lg:self-start">
            <nav className="bookora-mobile-rail flex w-full min-w-0 max-w-full gap-2 lg:block lg:space-y-1" aria-label="Library shelves">
                {tabs.map((shelf) => {
                    const isActive = shelf.value === activeShelf;

                    return (
                        <button
                            key={shelf.value}
                            type="button"
                            onClick={() => onChange(shelf.value)}
                            className={`flex max-w-[75vw] shrink-0 items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm transition lg:w-full lg:max-w-none ${
                                isActive
                                    ? "theme-button-primary shadow-[0_10px_30px_rgba(251,191,36,0.18)]"
                                    : "theme-text-soft hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <span className="min-w-0 truncate font-medium">{shelf.label}</span>
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                    isActive ? "bg-black/10" : "bg-white/[0.06] theme-text-muted"
                                }`}
                            >
                                {counts[shelf.value] ?? 0}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default LibraryShelfTabs;
