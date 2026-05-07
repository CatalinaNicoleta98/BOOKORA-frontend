import { useState } from "react";
import type { ReaderSpotlightItem } from "../types/social.types";
import { getAssetUrl } from "../../../shared/api/apiConfig";

interface ReaderSpotlightProps {
    items: ReaderSpotlightItem[];
    onOpenBook: (externalBookId: string) => void;
}

type SpotlightFilter = "all" | "reviews" | "ratings" | "finished";

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

const formatStatusLabel = (status?: string) => {
    switch (status) {
        case "finished_reading":
            return "Finished Reading";
        case "finished_listening":
            return "Finished Listening";
        case "currently_listening":
            return "Currently Listening";
        case "currently_reading":
            return "Currently Reading";
        default:
            return "Reader highlight";
    }
};

const SpoilerSpotlightReview = ({
    text,
    isSpoiler
}: {
    text: string;
    isSpoiler?: boolean;
}) => {
    const [isRevealed, setIsRevealed] = useState(!isSpoiler);

    if (isSpoiler && !isRevealed) {
        return (
            <div className="theme-content-panel-muted rounded-[1.15rem] border-dashed p-4">
                <p className="theme-accent-text text-xs font-semibold uppercase tracking-[0.16em]">
                    Spoiler review
                </p>
                <p className="theme-text-muted mt-2 text-sm leading-7">
                    This highlight includes a spoiler review preview.
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
        <div className="theme-content-panel-muted rounded-[1.15rem] p-4">
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

const ReaderSpotlight = ({ items, onOpenBook }: ReaderSpotlightProps) => {
    const [activeFilter, setActiveFilter] = useState<SpotlightFilter>("all");
    const filters: Array<{ id: SpotlightFilter; label: string }> = [
        { id: "all", label: "All picks" },
        { id: "reviews", label: "Reviews" },
        { id: "ratings", label: "Ratings" },
        { id: "finished", label: "Finished" }
    ];
    const filteredItems = items.filter((item) => {
        switch (activeFilter) {
            case "reviews":
                return Boolean(item.reviewText?.trim());
            case "ratings":
                return typeof item.rating === "number";
            case "finished":
                return item.status === "finished_reading" || item.status === "finished_listening";
            case "all":
            default:
                return true;
        }
    });

    return (
        <section className="theme-content-panel rounded-[2rem] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                <p className="theme-eyebrow">Reviews and ratings</p>
                <h2 className="theme-title mt-3 text-2xl font-semibold">A closer look at this reader&apos;s strongest public opinions</h2>
                <p className="theme-text-muted mt-2 max-w-2xl text-sm leading-7">
                    Highlights from this reader&apos;s public bookshelf, with review snippets, star ratings, and finished-book moments when available.
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
                        className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition-all ${
                            activeFilter === filter.id ? "theme-button-accent" : "theme-button-ghost"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {filteredItems.length === 0 ? (
                <div className="theme-content-panel-muted mt-6 rounded-[1.4rem] border-dashed p-5 text-sm leading-7 text-slate-400">
                    Nothing matches this filter yet.
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {filteredItems.map((item, index) => {
                        const canOpenBook = Boolean(item.book.externalBookId);
                        const coverSource = getAssetUrl(item.book.cover);
                        const Container = canOpenBook ? "button" : "article";
                        const ratingLabel =
                            typeof item.rating === "number" ? `${item.rating}★` : null;

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
                                        <p className="theme-text text-sm font-medium">
                                            {item.reviewText?.trim() ? "Shared a review highlight" : "Shared a rating moment"}
                                        </p>
                                        <span className="theme-pill-subtle rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                                            {item.reviewText?.trim() ? "Review" : "Rating"}
                                        </span>
                                        {ratingLabel ? (
                                            <span className="theme-status-pill rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                                                {ratingLabel}
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="theme-title mt-2 text-base font-semibold">{item.book.title}</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {item.book.author ?? "Unknown author"}
                                    </p>
                                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                        <span>{formatDate(item.createdAt)}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-500" />
                                        <span>{formatStatusLabel(item.status)}</span>
                                    </div>

                                {item.reviewText?.trim() ? (
                                    <div className="mt-4">
                                        <SpoilerSpotlightReview
                                            text={item.reviewText}
                                            isSpoiler={item.isSpoiler}
                                        />
                                    </div>
                                ) : (
                                    <p className="mt-4 text-sm leading-7 text-slate-400">
                                        Public activity on this title is visible even without a written review snippet.
                                    </p>
                                )}

                                <span className="theme-text mt-4 inline-block text-sm font-medium">
                                    {canOpenBook ? "Open book page" : "Custom book"}
                                </span>
                                </div>
                            </Container>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export type { ReaderSpotlightProps };
export default ReaderSpotlight;
