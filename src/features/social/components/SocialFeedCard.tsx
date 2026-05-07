import { useState } from "react";
import { Link } from "react-router-dom";
import { getAssetUrl } from "../../../shared/api/apiConfig";
import type { FeedItem } from "../types/feed.types";

interface SocialFeedCardProps {
    item: FeedItem;
}

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

const getActivityCopy = (item: FeedItem) => {
    switch (item.type) {
        case "published_review":
            return {
                title: item.rating ? "shared a review and rating" : "shared a review",
                badge: "Review"
            };
        case "updated_review":
            return {
                title: "updated a review",
                badge: "Review"
            };
        case "rated_book":
            return {
                title: item.rating ? `rated this book ${item.rating}★` : "left a rating",
                badge: "Rating"
            };
        case "finished_reading":
            return {
                title: "finished reading",
                badge: "Finished"
            };
        case "finished_listening":
            return {
                title: "finished listening",
                badge: "Finished"
            };
        case "started_listening":
            return {
                title: "started listening",
                badge: "Listening"
            };
        case "started_reading":
            return {
                title: "started reading",
                badge: "Reading"
            };
        case "reread_logged":
            return {
                title: "logged a reread",
                badge: "Reread"
            };
        case "added_to_shelf":
        default:
            return {
                title: "added a book to their shelf",
                badge: "Shelf"
            };
    }
};

const getBookUrl = (item: FeedItem) => {
    if (!item.book.externalBookId) {
        return null;
    }

    return `/books/${encodeURIComponent(item.book.externalBookId)}`;
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
            <div className="theme-content-panel-muted rounded-[1.15rem] border-dashed px-4 py-4">
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
        <div className="theme-content-panel-muted rounded-[1.15rem] px-4 py-4">
            <p className="theme-text line-clamp-5 text-sm leading-7">{text}</p>
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

const SocialFeedCard = ({ item }: SocialFeedCardProps) => {
    const coverSource = getAssetUrl(item.book.cover);
    const actorUrl = `/readers/${encodeURIComponent(item.actor.handle)}`;
    const bookUrl = getBookUrl(item);
    const activityCopy = getActivityCopy(item);
    const statusLabel = item.status?.replace(/_/g, " ");
    const previousStatusLabel = item.previousStatus?.replace(/_/g, " ");

    return (
        <article className="theme-content-panel-soft rounded-[1.5rem] p-4 transition-all hover:border-[var(--bookora-border-strong)] sm:p-5">
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 sm:gap-4">
                    <Link
                        to={actorUrl}
                        className="block h-12 w-12 shrink-0 overflow-hidden rounded-[1rem] border border-[var(--bookora-border)] sm:h-14 sm:w-14"
                    >
                        {item.actor.avatarUrl ? (
                            <img
                                src={getAssetUrl(item.actor.avatarUrl)}
                                alt={item.actor.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-300/90 via-indigo-300/85 to-fuchsia-300/85 text-sm font-semibold text-slate-950">
                                {item.actor.name.slice(0, 1).toUpperCase()}
                            </div>
                        )}
                    </Link>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="theme-status-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                {activityCopy.badge}
                            </span>
                            {typeof item.rating === "number" ? (
                                <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    {item.rating}★
                                </span>
                            ) : null}
                            <span className="text-xs text-slate-500">{formatDate(item.createdAt)}</span>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-slate-300">
                            <Link to={actorUrl} className="theme-title font-semibold hover:underline">
                                {item.actor.name}
                            </Link>{" "}
                            <span className="text-slate-400">{activityCopy.title}</span>
                        </p>
                    </div>
                </div>

                <div className="theme-content-panel-muted overflow-hidden rounded-[1.25rem] p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                        <div className="theme-cover-shell h-24 w-16 shrink-0 overflow-hidden rounded-[0.95rem] sm:h-28 sm:w-[4.75rem]">
                            {coverSource ? (
                                bookUrl ? (
                                    <Link to={bookUrl} className="block h-full w-full">
                                        <img
                                            src={coverSource}
                                            alt={item.book.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </Link>
                                ) : (
                                    <img
                                        src={coverSource}
                                        alt={item.book.title}
                                        className="h-full w-full object-cover"
                                    />
                                )
                            ) : (
                                <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                    {item.book.title}
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            {bookUrl ? (
                                <Link to={bookUrl} className="theme-title line-clamp-2 text-base font-semibold leading-6 hover:underline">
                                    {item.book.title}
                                </Link>
                            ) : (
                                <p className="theme-title line-clamp-2 text-base font-semibold leading-6">{item.book.title}</p>
                            )}
                            <p className="mt-1 text-sm text-slate-400">
                                {item.book.author ?? "Unknown author"}
                            </p>

                            {(statusLabel || previousStatusLabel) ? (
                                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                                    {statusLabel}
                                    {previousStatusLabel ? ` from ${previousStatusLabel}` : ""}
                                </p>
                            ) : null}

                            <div className="mt-3 flex flex-wrap gap-2">
                                {!bookUrl ? (
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                                        Custom book
                                    </span>
                                ) : (
                                    <Link
                                        to={bookUrl}
                                        className="theme-pill-subtle inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-slate-200"
                                    >
                                        Open book page
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {item.reviewText?.trim() ? (
                        <div className="mt-4">
                            <SpoilerReviewPreview text={item.reviewText} isSpoiler={item.isSpoiler} />
                        </div>
                    ) : null}
                </div>
            </div>
        </article>
    );
};

export type { SocialFeedCardProps };
export default SocialFeedCard;
