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
                <h2 className="theme-title text-xl font-semibold">{shelfLabel}</h2>
                <p className="theme-text-muted text-sm">
                    {itemCount} {itemCount === 1 ? "book" : "books"} on this shelf
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="theme-content-panel-soft grid grid-cols-2 rounded-2xl p-1 sm:inline-flex">
                    <button
                        type="button"
                        onClick={() => onViewModeChange("grid")}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition sm:min-w-[5rem] ${
                            viewMode === "grid"
                                ? "theme-button-primary"
                                : "theme-text-soft hover:text-white"
                        }`}
                    >
                        Grid
                    </button>
                    <button
                        type="button"
                        onClick={() => onViewModeChange("list")}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition sm:min-w-[5rem] ${
                            viewMode === "list"
                                ? "theme-button-primary"
                                : "theme-text-soft hover:text-white"
                        }`}
                    >
                        List
                    </button>
                </div>

                <label className="theme-input flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm theme-text-soft sm:w-auto">
                    <span className="whitespace-nowrap">Sort by</span>
                    <select
                        value={sortBy}
                        onChange={(event) => onSortChange(event.target.value as LibrarySortOption)}
                        className="min-w-0 flex-1 bg-transparent text-sm theme-text outline-none"
                    >
                        <option value="recent">
                            Recently added
                        </option>
                        <option value="title">
                            Title
                        </option>
                        <option value="author">
                            Author
                        </option>
                        <option value="rating">
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
