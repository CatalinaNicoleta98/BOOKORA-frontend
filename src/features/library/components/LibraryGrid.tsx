import type { LibraryEntry } from "../types/library.types";

interface LibraryGridProps {
    entries: LibraryEntry[];
    onSelectBook: (entry: LibraryEntry) => void;
}

const LibraryGrid = ({ entries, onSelectBook }: LibraryGridProps) => {
    return (
        <div className="grid min-w-0 gap-3.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {entries.map((entry) => (
                <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelectBook(entry)}
                    className="theme-content-panel-soft group flex w-full min-w-0 items-start gap-3 rounded-2xl p-3 text-left transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:gap-4"
                >
                    <div className="theme-cover-shell h-24 w-[4.25rem] flex-shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-20">
                        {entry.cover ? (
                            <img
                                src={entry.cover}
                                alt={entry.title}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className="theme-text-muted flex h-full w-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-[0.18em]">
                                No cover
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1 py-0.5 sm:py-1">
                        <h3 className="theme-title line-clamp-2 text-sm font-semibold leading-5">
                            {entry.title}
                        </h3>
                        <p className="theme-text-muted mt-1 line-clamp-1 text-xs">
                            {entry.author ?? "Unknown author"}
                        </p>

                        {typeof entry.rating === "number" && (
                            <p className="theme-accent-text mt-2.5 text-xs font-medium">
                                Rated {entry.rating}/5
                            </p>
                        )}

                        {entry.formats.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {entry.formats.map((format) => (
                                    <span
                                        key={format}
                                        className="theme-pill-subtle rounded-full px-2 py-0.5 text-[10px] capitalize"
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
    );
};

export default LibraryGrid;
