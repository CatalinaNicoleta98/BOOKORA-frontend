import { useState } from "react";
import type { ReaderActivityItem } from "../types/social.types";

interface ReaderRecentActivityProps {
    items: ReaderActivityItem[];
    onOpenBook: (externalBookId: string) => void;
}

const getImageSource = (imagePath?: string) => {
    if (!imagePath) {
        return undefined;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `http://localhost:4000${imagePath}`;
};

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
    return (
        <section className="theme-content-panel rounded-[2rem] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="theme-title text-lg font-semibold">Recent activity</h2>
                    <p className="theme-text-muted mt-2 text-sm leading-7">
                        Public reading updates, ratings, and review moments from this reader.
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-slate-400">No public activity yet.</p>
                ) : (
                    items.map((item, index) => {
                        const activityCopy = formatActivityCopy(item);
                        const coverSource = getImageSource(item.book.cover);
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
                                className="theme-content-panel-soft flex w-full items-start gap-4 rounded-[1.4rem] p-4 text-left transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                            >
                                <div className="theme-cover-shell h-20 w-14 shrink-0 overflow-hidden rounded-[0.85rem]">
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
                                    </div>
                                    <p className="theme-title mt-2 text-base font-semibold">{item.book.title}</p>
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
