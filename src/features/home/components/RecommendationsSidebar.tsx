import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { buildBookDetailsRoute } from "../../book/utils/bookRouting";

import type { HomeBookCard, HomePageData, HomeRecommendationItem } from "../types/home.types";

type RecommendationsSidebarProps = {
    data: HomePageData;
};

const CompactBookButton = ({
    book,
    subtitle,
}: {
    book: HomeBookCard;
    subtitle?: string;
}) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(buildBookDetailsRoute(book.id))}
            className="theme-content-panel-soft flex w-full items-center gap-4 rounded-[1.25rem] p-3.5 text-left transition-all hover:border-[var(--bookora-border-strong)]"
        >
            <div className="theme-cover-shell h-[4.6rem] w-[3.3rem] shrink-0 overflow-hidden rounded-[0.95rem] shadow-[0_12px_24px_rgba(15,23,42,0.16)]">
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                        No cover
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="theme-title line-clamp-2 text-sm font-semibold leading-5">
                    {book.title}
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                    {book.author}
                </p>
                {subtitle ? (
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                        {subtitle}
                    </p>
                ) : null}
            </div>
        </button>
    );
};

const FeaturedRecommendation = ({ item }: { item: HomeRecommendationItem }) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(buildBookDetailsRoute(item.id))}
            className="theme-content-panel-soft w-full overflow-hidden rounded-[1.55rem] text-left transition-all hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
        >
            <div className="grid grid-cols-[98px_minmax(0,1fr)] gap-5 p-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:p-5">
                <div className="theme-cover-shell overflow-hidden rounded-[1.1rem] shadow-[0_18px_36px_rgba(15,23,42,0.18)]">
                    {item.coverUrl ? (
                        <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="aspect-[3/4] h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex aspect-[3/4] h-full min-h-[132px] items-center justify-center text-[10px] text-slate-400">
                            No cover
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <h3 className="theme-title line-clamp-2 text-lg font-semibold leading-7">
                        {item.title}
                    </h3>
                    <p className="theme-text-soft mt-1 line-clamp-1 text-sm">
                        {item.author}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                        {item.reason}
                    </p>
                    <p className="theme-text-muted mt-4 text-[11px] font-semibold uppercase tracking-[0.16em]">
                        Open book
                    </p>
                </div>
            </div>
        </button>
    );
};

const Panel = ({
    eyebrow,
    title,
    actionLabel,
    onAction,
    children,
}: {
    eyebrow: string;
    title: string;
    actionLabel?: string;
    onAction?: () => void;
    children: ReactNode;
}) => {
    return (
        <section className="theme-content-panel rounded-[1.75rem] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.2em]">
                        {eyebrow}
                    </p>
                    <h3 className="theme-title text-lg font-semibold tracking-[-0.03em]">
                        {title}
                    </h3>
                </div>

                {actionLabel && onAction ? (
                    <button
                        type="button"
                        onClick={onAction}
                        className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[var(--bookora-title)]"
                    >
                        {actionLabel}
                    </button>
                ) : null}
            </div>

            <div className="mt-5">{children}</div>
        </section>
    );
};

const RecommendationsSidebar = ({ data }: RecommendationsSidebarProps) => {
    const navigate = useNavigate();
    const featuredRecommendation = data.recommendations[0];
    const remainingRecommendations = data.recommendations.slice(1, 3);

    return (
        <aside className="space-y-5">
            <Panel
                eyebrow="Discover"
                title="Picked from your reading taste"
                actionLabel="Search"
                onAction={() => navigate("/search")}
            >
                <div className="space-y-5">
                    {featuredRecommendation ? (
                        <FeaturedRecommendation item={featuredRecommendation} />
                    ) : (
                        <div className="theme-content-panel-muted rounded-[1.3rem] border-dashed p-4 text-sm leading-6 text-slate-400">
                            Rate or finish a few books and Bookora will have stronger recommendations to surface here.
                        </div>
                    )}

                    {remainingRecommendations.length > 0 ? (
                        <div className="space-y-3">
                            {remainingRecommendations.map((book) => (
                                <CompactBookButton
                                    key={book.id}
                                    book={book}
                                    subtitle={book.reason}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </Panel>
        </aside>
    );
};

export default RecommendationsSidebar;
