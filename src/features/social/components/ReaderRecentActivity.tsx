import { useState } from "react";
import type { ReaderActivityItem } from "../types/social.types";
import { getAssetUrl } from "../../../shared/api/apiConfig";

interface ReaderRecentActivityProps {
    items: ReaderActivityItem[];
    onOpenBook: (externalBookId: string) => void;
}

type ActivityFilter = "all" | "reviews" | "ratings" | "finished" | "started";

const formatDate = (value: string) => {
    const timestamp = Date.parse(value);

    if (Number.isNaN(timestamp)) {
        return value;
    }

    return new Date(timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

const formatActivityCopy = (item: ReaderRecentActivityProps["items"][number]) => {
    switch (item.type) {
        case "reviewed":
            return {
                title: item.rating ? "Published a review and rating" : "Published a review",
                badge: "Review"
            };
        case "rated":
            return {
                title: item.rating ? `Rated this book ${item.rating}★` : "Left a rating",
                badge: "Rating"
            };
        case "finished_reading":
            return {
                title: "Finished reading",
                badge: "Finished"
            };
        case "finished_listening":
            return {
                title: "Finished listening",
                badge: "Finished"
            };
        case "currently_listening":
            return {
                title: "Started listening",
                badge: "Listening"
            };
        case "currently_reading":
        default:
            return {
                title: "Started reading",
                badge: "Reading"
            };
    }
};

const SpoilerReviewPreview = ({
    text,
    isSpoiler
}: {
    text: string;
    isSpoiler?: boolean;
}) => {
    const [isRevealed, setIsRevealed] = useState(!isSpoiler);

    if (isSpoiler && !isRevealed) {
        return (
            <div className="theme-content-panel-muted rounded-[1.1rem] border-dashed px-4 py-3">
                <p className="theme-accent-text text-xs font-semibold uppercase tracking-[0.16em]">
                    Spoiler review
                </p>
                <p className="theme-text-muted mt-2 text-sm leading-7">
                    This review preview is hidden because it contains spoilers.
                </p>
                <button
                    type="button"
                    onClick={() => setIsRevealed(true)}
                    className="theme-button-accent mt-4 inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold"
                >
                    Show review
                </button>
            </div>
        );
    }

    return (
        <div className="theme-content-panel-muted rounded-[1.1rem] px-4 py-3">
            <p className="theme-text text-sm leading-7">{text}</p>
            {isSpoiler ? (
                <button
                    type="button"
                    onClick={() => setIsRevealed(false)}
                    className="theme-button-ghost mt-4 inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold uppercase tracking-[0.14em]"
                >
                    Hide spoilers
                </button>
            ) : null}
        </div>
    );
};

const ReaderRecentActivity = ({ items, onOpenBook }: ReaderRecentActivityProps) => {
    const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");
    const filters: Array<{ id: ActivityFilter; label: string }> = [
        { id: "all", label: "All updates" },
        { id: "reviews", label: "Reviews" },
        { id: "ratings", label: "Ratings" },
        { id: "finished", label: "Finished" },
        { id: "started", label: "Started" }
    ];
    const filteredItems = items.filter((item) => {
        switch (activeFilter) {
            case "reviews":
                return item.type === "reviewed";
            case "ratings":
                return item.type === "rated" || (item.type === "reviewed" && typeof item.rating === "number");
            case "finished":
                return item.type === "finished_reading" || item.type === "finished_listening";
            case "started":
                return item.type === "currently_reading" || item.type === "currently_listening";
            case "all":
            default:
                return true;
        }
    });

    return (
        <section className="theme-content-panel rounded-[2rem] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="theme-title text-lg font-semibold">Recent activity</h2>
                    <p className="theme-text-muted mt-2 text-sm leading-7">
                        One running stream of this reader&apos;s public books, reviews, ratings, and reading updates.
                    </p>
                </div>
                <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {filteredItems.length} visible
                </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        type="button"
                        onClick={() => setActiveFilter(filter.id)}
                        className={`inline-flex h-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-all sm:px-4 ${
                            activeFilter === filter.id ? "theme-button-accent" : "theme-button-ghost"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <div className="mt-6 space-y-4">
                {filteredItems.length === 0 ? (
                    <p className="text-sm text-slate-400">No public activity yet.</p>
                ) : (
                    filteredItems.map((item, index) => {
                        const activityCopy = formatActivityCopy(item);
                        const coverSource = getAssetUrl(item.book.cover);
                        const canOpenBook = Boolean(item.book.externalBookId);
                        const Container = canOpenBook ? "button" : "article";

                        return (
                            <Container
                                key={`${item.book.title}-${item.createdAt}-${index}`}
                                {...(canOpenBook
                                    ? {
                                          type: "button" as const,
                                          onClick: () => onOpenBook(item.book.externalBookId as string)
                                      }
                                    : {})}
                                className="theme-content-panel-soft flex w-full items-start gap-3 rounded-[1.25rem] p-3.5 text-left transition-all duration-300 hover:border-[var(--bookora-border-strong)] sm:gap-4 sm:rounded-[1.4rem] sm:p-4"
                            >
                                <div className="theme-cover-shell h-18 w-12 shrink-0 overflow-hidden rounded-[0.8rem] sm:h-20 sm:w-14 sm:rounded-[0.85rem]">
                                    {coverSource ? (
                                        <img
                                            src={coverSource}
                                            alt={item.book.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                            {item.book.title}
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="theme-text text-sm font-medium">{activityCopy.title}</p>
                                        <span className="theme-pill-subtle rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                                            {activityCopy.badge}
                                        </span>
                                        {typeof item.rating === "number" ? (
                                            <span className="theme-status-pill rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                                                {item.rating}★
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="theme-title mt-2 text-sm font-semibold sm:text-base">{item.book.title}</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {item.book.author ?? "Unknown author"}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-500">{formatDate(item.createdAt)}</p>

                                    {item.reviewText?.trim() ? (
                                        <div className="mt-4">
                                            <SpoilerReviewPreview
                                                text={item.reviewText}
                                                isSpoiler={item.isSpoiler}
                                            />
                                        </div>
                                    ) : null}

                                    {!canOpenBook ? (
                                        <p className="theme-text-muted mt-4 text-xs uppercase tracking-[0.14em]">
                                            Custom book
                                        </p>
                                    ) : null}
                                </div>
                            </Container>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export type { ReaderRecentActivityProps };
export default ReaderRecentActivity;
