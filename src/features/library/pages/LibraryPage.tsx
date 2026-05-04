

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const LibraryPage = () => {
    const navigate = useNavigate();

    const [entries, setEntries] = useState<LibraryEntry[]>([]);
    const [activeShelf, setActiveShelf] = useState<ReadingStatus>("want_to_read");
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

    const shelfCounts = useMemo(() => {
        return SHELF_TABS.reduce<Record<ReadingStatus, number>>((counts, shelf) => {
            counts[shelf.value] = entries.filter((entry) => entry.status === shelf.value).length;
            return counts;
        }, {} as Record<ReadingStatus, number>);
    }, [entries]);

    const visibleEntries = useMemo(() => {
        return entries.filter((entry) => entry.status === activeShelf);
    }, [activeShelf, entries]);

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
            <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                    My library
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Your bookshelves
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                            Keep track of what you want to read, what you are reading, and the books you have already finished.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
                        <span className="font-semibold text-white">{entries.length}</span> saved books
                    </div>
                </div>
            </section>

            {isLoading && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-8 text-center text-sm text-slate-300">
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
                    <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 lg:sticky lg:top-24 lg:self-start">
                        <nav className="space-y-1" aria-label="Library shelves">
                            {SHELF_TABS.map((shelf) => {
                                const isActive = shelf.value === activeShelf;

                                return (
                                    <button
                                        key={shelf.value}
                                        type="button"
                                        onClick={() => setActiveShelf(shelf.value)}
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
                                            {shelfCounts[shelf.value] ?? 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    <section className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {SHELF_TABS.find((shelf) => shelf.value === activeShelf)?.label}
                                </h2>
                                <p className="text-sm text-slate-400">
                                    {visibleEntries.length} {visibleEntries.length === 1 ? "book" : "books"} on this shelf
                                </p>
                            </div>
                        </div>

                        {visibleEntries.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/30 px-5 py-12 text-center">
                                <p className="text-base font-medium text-white">No books here yet.</p>
                                <p className="mt-2 text-sm text-slate-400">
                                    Add books from the book page and they will appear on this shelf.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {visibleEntries.map((entry) => (
                                    <button
                                        key={entry.id}
                                        type="button"
                                        onClick={() => navigate(`/books/${getBookRouteId(entry)}`)}
                                        className="group flex gap-4 rounded-2xl border border-white/10 bg-slate-950/30 p-3 text-left transition hover:-translate-y-0.5 hover:border-amber-200/30 hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
                                    >
                                        <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.05]">
                                            {entry.cover ? (
                                                <img
                                                    src={entry.cover}
                                                    alt={entry.title}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                                    No cover
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1 py-1">
                                            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-white">
                                                {entry.title}
                                            </h3>
                                            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                                                {entry.author ?? "Unknown author"}
                                            </p>

                                            {typeof entry.rating === "number" && (
                                                <p className="mt-3 text-xs font-medium text-amber-200">
                                                    Rated {entry.rating}/5
                                                </p>
                                            )}

                                            {entry.formats.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {entry.formats.map((format) => (
                                                        <span
                                                            key={format}
                                                            className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] capitalize text-slate-300"
                                                        >
                                                            {format}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </main>
    );
};

export default LibraryPage;