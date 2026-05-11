import type { KeyboardEvent } from "react";

import type { LibraryEntry } from "../types/library.types";

interface LibraryListProps {
    entries: LibraryEntry[];
    onSelectBook: (entry: LibraryEntry) => void;
    formatDate: (value?: string) => string;
}

const renderFormats = (formats: LibraryEntry["formats"]) => {
    if (formats.length === 0) {
        return <span className="theme-text-muted">-</span>;
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {formats.map((format) => (
                <span
                    key={format}
                    className="theme-pill-subtle rounded-full px-2 py-0.5 text-[10px] capitalize"
                >
                    {format}
                </span>
            ))}
        </div>
    );
};

const handleRowKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement | HTMLDivElement>,
    onSelect: () => void,
) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect();
    }
};

const LibraryList = ({ entries, onSelectBook, formatDate }: LibraryListProps) => {
    return (
        <>
            <div className="space-y-3 md:hidden">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectBook(entry)}
                        onKeyDown={(event) => handleRowKeyDown(event, () => onSelectBook(entry))}
                        className="theme-content-panel-soft flex gap-4 rounded-2xl p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
                    >
                        <div className="theme-cover-shell h-24 w-16 flex-shrink-0 overflow-hidden rounded-xl">
                            {entry.cover ? (
                                <img src={entry.cover} alt={entry.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="theme-text-muted flex h-full w-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-[0.18em]">
                                    No cover
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="theme-title text-sm font-semibold">{entry.title}</h3>
                            <p className="theme-text-muted mt-1 text-xs">{entry.author ?? "Unknown author"}</p>
                            <div className="theme-text-soft mt-3 space-y-2 text-xs">
                                <p>
                                    <span className="theme-text-muted">Rating:</span>{" "}
                                    {typeof entry.rating === "number" ? `${entry.rating}/5` : "-"}
                                </p>
                                <div>
                                    <span className="theme-text-muted">Formats:</span>
                                    <div className="mt-1">{renderFormats(entry.formats)}</div>
                                </div>
                                <p>
                                    <span className="theme-text-muted">Started:</span> {formatDate(entry.dateStarted)}
                                </p>
                                <p>
                                    <span className="theme-text-muted">Finished:</span> {formatDate(entry.dateFinished)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="theme-text-muted text-left text-xs uppercase tracking-[0.18em]">
                            <th className="px-4 py-3 font-medium">Book</th>
                            <th className="px-4 py-3 font-medium">Author</th>
                            <th className="px-4 py-3 font-medium">Rating</th>
                            <th className="px-4 py-3 font-medium">Formats</th>
                            <th className="px-4 py-3 font-medium">Started</th>
                            <th className="px-4 py-3 font-medium">Finished</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr
                                key={entry.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => onSelectBook(entry)}
                                onKeyDown={(event) => handleRowKeyDown(event, () => onSelectBook(entry))}
                                className="group cursor-pointer border-t border-white/10 text-sm theme-text-soft transition hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
                            >
                                <td className="min-w-[280px] border-t border-white/10 px-4 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="theme-cover-shell h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                                            {entry.cover ? (
                                                <img src={entry.cover} alt={entry.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="theme-text-muted flex h-full w-full items-center justify-center px-1 text-center text-[9px] uppercase tracking-[0.14em]">
                                                    No cover
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="theme-title line-clamp-2 font-semibold transition group-hover:text-amber-100">
                                                {entry.title}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="theme-text-muted border-t border-white/10 px-4 py-4">
                                    {entry.author ?? "Unknown author"}
                                </td>
                                <td className="border-t border-white/10 px-4 py-4">
                                    {typeof entry.rating === "number" ? (
                                        <span className="theme-accent-text font-medium">{entry.rating}/5</span>
                                    ) : (
                                        <span className="theme-text-muted">-</span>
                                    )}
                                </td>
                                <td className="border-t border-white/10 px-4 py-4">
                                    {renderFormats(entry.formats)}
                                </td>
                                <td className="theme-text-muted border-t border-white/10 px-4 py-4">
                                    {formatDate(entry.dateStarted)}
                                </td>
                                <td className="theme-text-muted border-t border-white/10 px-4 py-4">
                                    {formatDate(entry.dateFinished)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LibraryList;
