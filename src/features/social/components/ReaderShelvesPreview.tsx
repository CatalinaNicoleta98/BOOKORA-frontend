import { useMemo, useState } from "react";
import { getAssetUrl } from "../../../shared/api/apiConfig";
import type {
    ReaderActivityItem,
    ReaderShelfSummary,
    ReaderSpotlightItem
} from "../types/social.types";

interface ReaderShelvesPreviewProps {
    shelves: ReaderShelfSummary;
    recentActivity: ReaderActivityItem[];
    spotlight: ReaderSpotlightItem[];
    onOpenBook: (externalBookId: string) => void;
}

const SHELF_ITEMS: Array<{
    key: keyof ReaderShelfSummary;
    label: string;
    description: string;
}> = [
    {
        key: "want_to_read",
        label: "Want to Read",
        description: "Books waiting for the right reading mood."
    },
    {
        key: "currently_reading",
        label: "Currently Reading",
        description: "Active books that are part of the current stack."
    },
    {
        key: "currently_listening",
        label: "Currently Listening",
        description: "Audiobooks that are in the current rotation."
    },
    {
        key: "finished_reading",
        label: "Finished Reading",
        description: "Completed print and ebook reads."
    },
    {
        key: "finished_listening",
        label: "Finished Listening",
        description: "Completed audiobook listens."
    },
    {
        key: "on_break",
        label: "On Break",
        description: "Books paused without being fully abandoned."
    },
    {
        key: "did_not_finish",
        label: "Did Not Finish",
        description: "Titles this reader chose to step away from."
    }
];

const ReaderShelvesPreview = ({
    shelves,
    recentActivity,
    spotlight,
    onOpenBook
}: ReaderShelvesPreviewProps) => {
    const [activeShelf, setActiveShelf] = useState<keyof ReaderShelfSummary | null>(null);
    const shelfItemsWithCounts = SHELF_ITEMS.map((item) => ({
        ...item,
        count: shelves[item.key]
    }));
    const shelfBooks = useMemo(() => {
        const allItems = [...recentActivity, ...spotlight];
        const shelfMap = new Map<
            keyof ReaderShelfSummary,
            Array<{
                key: string;
                title: string;
                author?: string;
                cover?: string;
                externalBookId?: string;
                status?: string;
            }>
        >();

        for (const shelf of SHELF_ITEMS) {
            const seen = new Set<string>();
            const books = allItems
                .filter((item) => item.status === shelf.key)
                .filter((item) => {
                    const uniqueKey =
                        item.book.externalBookId ??
                        `${item.book.title}-${item.book.author ?? ""}-${item.status ?? ""}`;

                    if (seen.has(uniqueKey)) {
                        return false;
                    }

                    seen.add(uniqueKey);
                    return true;
                })
                .map((item) => ({
                    key:
                        item.book.externalBookId ??
                        `${item.book.title}-${item.book.author ?? ""}-${item.status ?? ""}`,
                    title: item.book.title,
                    author: item.book.author,
                    cover: item.book.cover,
                    externalBookId: item.book.externalBookId,
                    status: item.status
                }));

            shelfMap.set(shelf.key, books);
        }

        return shelfMap;
    }, [recentActivity, spotlight]);

    return (
        <section className="theme-content-panel rounded-[1.75rem] p-4 sm:rounded-[2rem] sm:p-6">
            <div>
                <p className="theme-eyebrow">Lists and shelves</p>
                <h2 className="theme-title mt-2 text-xl font-semibold sm:text-2xl">Library organization</h2>
                <p className="theme-text-muted mt-3 text-sm leading-7">
                    Open a shelf to preview public books we can see from this reader&apos;s visible activity.
                </p>
            </div>

            <div className="theme-content-panel-soft mt-6 overflow-hidden rounded-[1.35rem] border border-[var(--bookora-border)]">
                {shelfItemsWithCounts.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        onClick={() => setActiveShelf((currentValue) => currentValue === item.key ? null : item.key)}
                        className={`flex w-full flex-col px-4 py-4 text-left transition-all duration-300 hover:bg-white/[0.03] sm:px-5 ${
                            activeShelf === item.key ? "bg-white/[0.03]" : ""
                        }`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <h3 className="theme-title text-base font-semibold sm:text-lg">{item.label}</h3>
                                <p className="theme-text-muted mt-1 text-sm leading-6">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-2">
                                <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                                    {item.count}
                                </span>
                                <span className="theme-text-muted text-[10px] font-semibold uppercase tracking-[0.14em]">
                                    {activeShelf === item.key ? "Open" : "Closed"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--bookora-border)] pt-3">
                            <span className="theme-text-muted text-xs uppercase tracking-[0.14em]">
                                {activeShelf === item.key ? "Hide books" : "See books"}
                            </span>
                            <span className="theme-accent-text text-xs font-semibold uppercase tracking-[0.16em]">
                                {Math.min(shelfBooks.get(item.key)?.length ?? 0, 3)} books shown
                            </span>
                        </div>

                        {activeShelf === item.key ? (
                            <div className="mt-4 space-y-2 border-t border-[var(--bookora-border)] pt-4">
                                {(shelfBooks.get(item.key) ?? []).slice(0, 3).length > 0 ? (
                                    (shelfBooks.get(item.key) ?? []).slice(0, 3).map((book) => (
                                        <div
                                            key={book.key}
                                            className="theme-content-panel-muted flex min-h-[4.25rem] items-center gap-3 rounded-[0.95rem] p-3"
                                        >
                                            <div className="theme-cover-shell h-16 w-12 shrink-0 overflow-hidden rounded-[0.8rem]">
                                                {book.cover ? (
                                                    <img
                                                        src={getAssetUrl(book.cover)}
                                                        alt={book.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center px-1 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                                        No cover
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="theme-title line-clamp-1 text-sm font-semibold">
                                                    {book.title}
                                                </p>
                                                <p className="mt-1 line-clamp-1 min-h-[1rem] text-xs text-slate-400">
                                                    {book.author ?? "Unknown author"}
                                                </p>
                                            </div>

                                            {book.externalBookId ? (
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        onOpenBook(book.externalBookId as string);
                                                    }}
                                                    className="theme-button-ghost inline-flex h-9 items-center justify-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.14em]"
                                                >
                                                    Open
                                                </button>
                                            ) : (
                                                <span className="theme-text-muted text-[10px] font-semibold uppercase tracking-[0.14em]">
                                                    Custom
                                                </span>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="theme-content-panel-muted flex min-h-[4.25rem] items-center rounded-[0.95rem] border-dashed p-4 text-sm leading-6 text-slate-400">
                                        No public book preview is available for this shelf yet.
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </button>
                ))}
            </div>
        </section>
    );
};

export type { ReaderShelvesPreviewProps };
export default ReaderShelvesPreview;
