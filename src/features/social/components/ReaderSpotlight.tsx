import { useState } from "react";
import type { ReaderSpotlightItem } from "../types/social.types";

interface ReaderSpotlightProps {
    items: ReaderSpotlightItem[];
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
    return (
        <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
            <div className="border-b border-[var(--bookora-border)] px-6 py-5 sm:px-8">
                <p className="theme-eyebrow">Reader spotlight</p>
                <h2 className="theme-title mt-3 text-2xl font-semibold">A closer look at a few public reading moments</h2>
                <p className="theme-text-muted mt-2 max-w-2xl text-sm leading-7">
                    Highlights from this reader&apos;s recent public activity, including ratings and review snippets when available.
                </p>
            </div>

            {items.length === 0 ? (
                <div className="px-6 py-8 sm:px-8">
                    <div className="theme-content-panel-muted rounded-[1.8rem] border-dashed p-6 text-sm leading-7 text-slate-400">
                        Nothing is in the spotlight yet.
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-3 sm:px-8">
                    {items.map((item, index) => {
                        const canOpenBook = Boolean(item.book.externalBookId);
                        const coverSource = getImageSource(item.book.cover);
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
                                className="theme-content-panel-soft group flex h-full flex-col rounded-[1.8rem] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
                            >
                                <div className="flex gap-4">
                                    <div className="theme-cover-shell h-28 w-20 shrink-0 overflow-hidden rounded-[1rem]">
                                        {coverSource ? (
                                            <img
                                                src={coverSource}
                                                alt={item.book.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                No cover
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <span className="theme-status-pill inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                            {formatStatusLabel(item.status)}
                                        </span>
                                        <h3 className="theme-title mt-3 line-clamp-2 text-lg font-semibold">
                                            {item.book.title}
                                        </h3>
                                        <p className="theme-text-muted mt-1 text-sm">
                                            {item.book.author ?? "Unknown author"}
                                        </p>
                                        {typeof item.rating === "number" ? (
                                            <p className="theme-accent-text mt-3 text-xs font-semibold uppercase tracking-[0.16em]">
                                                {item.rating}★ rating
                                            </p>
                                        ) : null}
                                        <p className="mt-3 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                                    </div>
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
                                        Public activity on this title is available without a written review snippet.
                                    </p>
                                )}

                                <span className="theme-text mt-4 text-sm font-medium transition-colors duration-300 group-hover:text-[var(--bookora-title)]">
                                    {canOpenBook ? "Open book page" : "Custom book"}
                                </span>
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
