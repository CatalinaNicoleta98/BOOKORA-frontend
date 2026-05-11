

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildBookDetailsRoute } from "../../book/utils/bookRouting";

import LibraryGrid from "../components/LibraryGrid";
import LibraryList from "../components/LibraryList";
import LibraryShelfTabs from "../components/LibraryShelfTabs";
import LibraryToolbar, {
    type LibrarySortOption,
    type LibraryViewMode,
} from "../components/LibraryToolbar";
import { getLibrary } from "../services/libraryService";
import type { LibraryEntry, ReadingStatus } from "../types/library.types";

const SHELF_TABS: { label: string; value: ReadingStatus }[] = [
    { label: "Want to Read", value: "want_to_read" },
    { label: "Currently Reading", value: "currently_reading" },
    { label: "Read", value: "finished_reading" },
    { label: "Currently Listening", value: "currently_listening" },
    { label: "Listened", value: "finished_listening" },
    { label: "On Break", value: "on_break" },
    { label: "Did Not Finish", value: "did_not_finish" },
];

const getBookRouteId = (entry: LibraryEntry) => {
    return entry.externalBookId ?? entry.id;
};

const getShelfFromHash = (hash: string): ReadingStatus | null => {
    const normalizedHash = hash.replace(/^#/, "");

    return SHELF_TABS.find((shelf) => shelf.value === normalizedHash)?.value ?? null;
};

const formatLibraryDate = (value?: string) => {
    if (!value) {
        return "-";
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return "-";
    }

    return parsed.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const LibraryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [entries, setEntries] = useState<LibraryEntry[]>([]);
    const [activeShelf, setActiveShelf] = useState<ReadingStatus>("want_to_read");
    const [viewMode, setViewMode] = useState<LibraryViewMode>("grid");
    const [sortBy, setSortBy] = useState<LibrarySortOption>("recent");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const libraryEntries = await getLibrary();
                setEntries(libraryEntries);
            } catch {
                setError("Could not load your library right now.");
            } finally {
                setIsLoading(false);
            }
        };

        void loadLibrary();
    }, []);

    useEffect(() => {
        const hashedShelf = getShelfFromHash(location.hash);

        if (hashedShelf) {
            setActiveShelf(hashedShelf);
        }
    }, [location.hash]);

    const shelfCounts = useMemo(() => {
        return SHELF_TABS.reduce<Record<ReadingStatus, number>>((counts, shelf) => {
            counts[shelf.value] = entries.filter((entry) => entry.status === shelf.value).length;
            return counts;
        }, {} as Record<ReadingStatus, number>);
    }, [entries]);

    const visibleEntries = useMemo(() => {
        const shelfEntries = entries.filter((entry) => entry.status === activeShelf);

        return [...shelfEntries].sort((leftEntry, rightEntry) => {
            if (sortBy === "title") {
                return leftEntry.title.localeCompare(rightEntry.title, undefined, { sensitivity: "base" });
            }

            if (sortBy === "author") {
                const leftAuthor = leftEntry.author ?? "";
                const rightAuthor = rightEntry.author ?? "";
                const authorComparison = leftAuthor.localeCompare(rightAuthor, undefined, { sensitivity: "base" });

                if (authorComparison !== 0) {
                    return authorComparison;
                }

                return leftEntry.title.localeCompare(rightEntry.title, undefined, { sensitivity: "base" });
            }

            if (sortBy === "rating") {
                const leftRating = leftEntry.rating ?? -1;
                const rightRating = rightEntry.rating ?? -1;

                if (rightRating !== leftRating) {
                    return rightRating - leftRating;
                }

                return leftEntry.title.localeCompare(rightEntry.title, undefined, { sensitivity: "base" });
            }

            const leftCreatedAt = new Date(leftEntry.createdAt).getTime();
            const rightCreatedAt = new Date(rightEntry.createdAt).getTime();
            return rightCreatedAt - leftCreatedAt;
        });
    }, [activeShelf, entries, sortBy]);

    const activeShelfLabel = SHELF_TABS.find((shelf) => shelf.value === activeShelf)?.label ?? "Shelf";

    const handleSelectBook = (entry: LibraryEntry) => {
        navigate(buildBookDetailsRoute(getBookRouteId(entry)));
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 theme-text sm:px-6 lg:px-8">
            <section className="theme-glass-panel mb-8 rounded-[2rem] p-6 sm:p-8">
                <p className="theme-accent-text text-xs font-semibold uppercase tracking-[0.3em]">
                    My library
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="theme-title text-3xl font-semibold tracking-tight sm:text-4xl">
                            Your bookshelves
                        </h1>
                        <p className="theme-text-soft mt-2 max-w-2xl text-sm leading-6">
                            Keep track of what you want to read, what you are reading, and the books you have already finished.
                        </p>
                    </div>

                    <div className="theme-content-panel-soft rounded-2xl px-4 py-3 text-sm theme-text-soft">
                        <span className="theme-title font-semibold">{entries.length}</span> saved books
                    </div>
                </div>
            </section>

            {isLoading && (
                <div className="theme-content-panel-soft rounded-2xl px-5 py-8 text-center text-sm theme-text-soft">
                    Loading your shelves...
                </div>
            )}

            {!isLoading && error && (
                <div className="rounded-2xl border border-red-400/30 bg-red-950/30 px-5 py-4 text-sm text-red-100">
                    {error}
                </div>
            )}

            {!isLoading && !error && (
                <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <LibraryShelfTabs
                        tabs={SHELF_TABS}
                        activeShelf={activeShelf}
                        counts={shelfCounts}
                        onChange={setActiveShelf}
                    />

                    <section className="theme-content-panel min-w-0 rounded-[1.5rem] p-4 sm:p-5">
                        <LibraryToolbar
                            shelfLabel={activeShelfLabel}
                            itemCount={visibleEntries.length}
                            viewMode={viewMode}
                            sortBy={sortBy}
                            onViewModeChange={setViewMode}
                            onSortChange={setSortBy}
                        />

                        {visibleEntries.length === 0 ? (
                            <div className="theme-content-panel-muted rounded-2xl border-dashed px-5 py-12 text-center">
                                <p className="theme-title text-base font-medium">No books here yet.</p>
                                <p className="theme-text-muted mt-2 text-sm">
                                    Add books from the book page and they will appear on this shelf.
                                </p>
                            </div>
                        ) : viewMode === "grid" ? (
                            <LibraryGrid entries={visibleEntries} onSelectBook={handleSelectBook} />
                        ) : (
                            <LibraryList
                                entries={visibleEntries}
                                onSelectBook={handleSelectBook}
                                formatDate={formatLibraryDate}
                            />
                        )}
                    </section>
                </div>
            )}
        </main>
    );
};

export default LibraryPage;
