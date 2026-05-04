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
        <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 lg:sticky lg:top-24 lg:self-start">
            <nav className="space-y-1" aria-label="Library shelves">
                {tabs.map((shelf) => {
                    const isActive = shelf.value === activeShelf;

                    return (
                        <button
                            key={shelf.value}
                            type="button"
                            onClick={() => onChange(shelf.value)}
                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                                isActive
                                    ? "bg-amber-200 text-slate-950 shadow-[0_10px_30px_rgba(251,191,36,0.18)]"
                                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <span className="font-medium">{shelf.label}</span>
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                    isActive ? "bg-slate-950/10" : "bg-white/[0.06] text-slate-400"
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
