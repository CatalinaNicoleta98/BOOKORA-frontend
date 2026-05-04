import type { KeyboardEvent } from "react";

import type { LibraryEntry } from "../types/library.types";

interface LibraryListProps {
    entries: LibraryEntry[];
    onSelectBook: (entry: LibraryEntry) => void;
    formatDate: (value?: string) => string;
}

const renderFormats = (formats: LibraryEntry["formats"]) => {
    if (formats.length === 0) {
        return <span className="text-slate-500">-</span>;
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {formats.map((format) => (
                <span
                    key={format}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] capitalize text-slate-300"
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
                        className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-left transition hover:border-amber-200/30 hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
                    >
                        <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.05]">
                            {entry.cover ? (
                                <img src={entry.cover} alt={entry.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                    No cover
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-white">{entry.title}</h3>
                            <p className="mt-1 text-xs text-slate-400">{entry.author ?? "Unknown author"}</p>
                            <div className="mt-3 space-y-2 text-xs text-slate-300">
                                <p>
                                    <span className="text-slate-500">Rating:</span>{" "}
                                    {typeof entry.rating === "number" ? `${entry.rating}/5` : "-"}
                                </p>
                                <div>
                                    <span className="text-slate-500">Formats:</span>
                                    <div className="mt-1">{renderFormats(entry.formats)}</div>
                                </div>
                                <p>
                                    <span className="text-slate-500">Started:</span> {formatDate(entry.dateStarted)}
                                </p>
                                <p>
                                    <span className="text-slate-500">Finished:</span> {formatDate(entry.dateFinished)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
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
                                className="group cursor-pointer border-t border-white/10 text-sm text-slate-300 transition hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
                            >
                                <td className="min-w-[280px] border-t border-white/10 px-4 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.05]">
                                            {entry.cover ? (
                                                <img src={entry.cover} alt={entry.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center px-1 text-center text-[9px] uppercase tracking-[0.14em] text-slate-500">
                                                    No cover
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="line-clamp-2 font-semibold text-white transition group-hover:text-amber-100">
                                                {entry.title}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="border-t border-white/10 px-4 py-4 text-slate-400">
                                    {entry.author ?? "Unknown author"}
                                </td>
                                <td className="border-t border-white/10 px-4 py-4">
                                    {typeof entry.rating === "number" ? (
                                        <span className="font-medium text-amber-200">{entry.rating}/5</span>
                                    ) : (
                                        <span className="text-slate-500">-</span>
                                    )}
                                </td>
                                <td className="border-t border-white/10 px-4 py-4">
                                    {renderFormats(entry.formats)}
                                </td>
                                <td className="border-t border-white/10 px-4 py-4 text-slate-400">
                                    {formatDate(entry.dateStarted)}
                                </td>
                                <td className="border-t border-white/10 px-4 py-4 text-slate-400">
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
