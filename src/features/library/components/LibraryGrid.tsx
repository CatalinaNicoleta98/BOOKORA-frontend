import type { LibraryEntry } from "../types/library.types";

interface LibraryGridProps {
    entries: LibraryEntry[];
    onSelectBook: (entry: LibraryEntry) => void;
}

const LibraryGrid = ({ entries, onSelectBook }: LibraryGridProps) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry) => (
                <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelectBook(entry)}
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
    );
};

export default LibraryGrid;
