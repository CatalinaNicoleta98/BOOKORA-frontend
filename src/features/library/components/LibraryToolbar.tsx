type LibraryViewMode = "grid" | "list";
type LibrarySortOption = "recent" | "title" | "author" | "rating";

interface LibraryToolbarProps {
    shelfLabel: string;
    itemCount: number;
    viewMode: LibraryViewMode;
    sortBy: LibrarySortOption;
    onViewModeChange: (mode: LibraryViewMode) => void;
    onSortChange: (sort: LibrarySortOption) => void;
}

const LibraryToolbar = ({
    shelfLabel,
    itemCount,
    viewMode,
    sortBy,
    onViewModeChange,
    onSortChange,
}: LibraryToolbarProps) => {
    return (
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <h2 className="text-xl font-semibold text-white">{shelfLabel}</h2>
                <p className="text-sm text-slate-400">
                    {itemCount} {itemCount === 1 ? "book" : "books"} on this shelf
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="inline-flex rounded-2xl border border-white/10 bg-slate-950/30 p-1">
                    <button
                        type="button"
                        onClick={() => onViewModeChange("grid")}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                            viewMode === "grid"
                                ? "bg-amber-200 text-slate-950"
                                : "text-slate-300 hover:text-white"
                        }`}
                    >
                        Grid
                    </button>
                    <button
                        type="button"
                        onClick={() => onViewModeChange("list")}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                            viewMode === "list"
                                ? "bg-amber-200 text-slate-950"
                                : "text-slate-300 hover:text-white"
                        }`}
                    >
                        List
                    </button>
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-2.5 text-sm text-slate-300">
                    <span className="whitespace-nowrap">Sort by</span>
                    <select
                        value={sortBy}
                        onChange={(event) => onSortChange(event.target.value as LibrarySortOption)}
                        className="bg-transparent text-sm text-white outline-none"
                    >
                        <option value="recent" className="bg-slate-950 text-white">
                            Recently added
                        </option>
                        <option value="title" className="bg-slate-950 text-white">
                            Title
                        </option>
                        <option value="author" className="bg-slate-950 text-white">
                            Author
                        </option>
                        <option value="rating" className="bg-slate-950 text-white">
                            Rating
                        </option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default LibraryToolbar;
export type { LibrarySortOption, LibraryViewMode };
