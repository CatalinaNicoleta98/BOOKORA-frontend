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
        <div className="mb-5 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
                <h2 className="theme-title text-xl font-semibold">{shelfLabel}</h2>
                <p className="theme-text-muted text-sm">
                    {itemCount} {itemCount === 1 ? "book" : "books"} on this shelf
                </p>
            </div>

            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="theme-content-panel-soft grid w-full grid-cols-2 rounded-2xl p-1 sm:w-auto sm:inline-flex">
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

                <label className="theme-input flex w-full min-w-0 flex-col items-start gap-2 rounded-2xl px-4 py-3 text-sm theme-text-soft sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:py-2.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] sm:whitespace-nowrap sm:text-sm sm:font-normal sm:normal-case sm:tracking-normal">Sort by</span>
                    <select
                        value={sortBy}
                        onChange={(event) => onSortChange(event.target.value as LibrarySortOption)}
                        className="min-w-0 w-full flex-1 bg-transparent text-sm theme-text outline-none sm:w-auto"
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
