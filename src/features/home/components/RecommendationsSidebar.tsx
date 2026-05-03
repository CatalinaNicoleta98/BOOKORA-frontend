import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
            onClick={() => navigate(`/books/${book.id}`)}
            className="flex w-full items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-3 text-left transition-all hover:border-white/16 hover:bg-white/[0.05]"
        >
            <div className="h-16 w-12 shrink-0 overflow-hidden rounded-[0.8rem] border border-white/10 bg-white/[0.05]">
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
                <p className="line-clamp-2 text-sm font-semibold leading-6 text-white">
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
            onClick={() => navigate(`/books/${item.id}`)}
            className="w-full overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,28,48,0.84)_0%,rgba(12,16,30,0.78)_100%)] text-left transition-all hover:-translate-y-0.5 hover:border-white/16"
        >
            <div className="grid grid-cols-[86px_minmax(0,1fr)] gap-4 p-4">
                <div className="overflow-hidden rounded-[0.95rem] border border-white/10 bg-white/[0.04]">
                    {item.coverUrl ? (
                        <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full min-h-[126px] items-center justify-center text-[10px] text-slate-400">
                            No cover
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/80">
                        Recommended for you
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-6 text-white">
                        {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-300">
                        {item.author}
                    </p>
                    <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-400">
                        {item.reason}
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
        <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,21,38,0.78)_0%,rgba(10,14,26,0.72)_100%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {eyebrow}
                    </p>
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                        {title}
                    </h3>
                </div>

                {actionLabel && onAction ? (
                    <button
                        type="button"
                        onClick={onAction}
                        className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white"
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
    const remainingRecommendations = data.recommendations.slice(1, 4);

    return (
        <aside className="space-y-5">
            <Panel
                eyebrow="Discover"
                title="Books picked from your history"
                actionLabel="Search"
                onAction={() => navigate("/search")}
            >
                <div className="space-y-3">
                    {featuredRecommendation ? (
                        <FeaturedRecommendation item={featuredRecommendation} />
                    ) : (
                        <div className="rounded-[1.3rem] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-400">
                            Rate or finish a few books and Bookora will have stronger recommendations to surface here.
                        </div>
                    )}

                    {remainingRecommendations.map((book) => (
                        <CompactBookButton
                            key={book.id}
                            book={book}
                            subtitle={book.reason}
                        />
                    ))}
                </div>
            </Panel>

            <Panel
                eyebrow="Momentum"
                title="Recently active books"
                actionLabel="Profile"
                onAction={() => navigate("/profile")}
            >
                <div className="space-y-3">
                    {data.trendingBooks.length > 0 ? (
                        data.trendingBooks.slice(0, 4).map((book) => (
                            <CompactBookButton
                                key={book.id}
                                book={book}
                                subtitle="Opened from your recent reading and rating activity."
                            />
                        ))
                    ) : (
                        <div className="rounded-[1.3rem] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-400">
                            Once you begin tracking more books, your recent momentum shelf will appear here.
                        </div>
                    )}
                </div>
            </Panel>

            <Panel
                eyebrow="Queue"
                title="Pulled from Want to Read"
                actionLabel="Browse"
                onAction={() => navigate("/search")}
            >
                <div className="space-y-3">
                    {data.newReleases.length > 0 ? (
                        data.newReleases.slice(0, 4).map((book) => (
                            <CompactBookButton
                                key={book.id}
                                book={book}
                                subtitle="A title to revisit next from your saved queue."
                            />
                        ))
                    ) : (
                        <div className="rounded-[1.3rem] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-400">
                            Add a few books to Want to Read and this queue will start feeling much more personal.
                        </div>
                    )}
                </div>
            </Panel>
        </aside>
    );
};

export default RecommendationsSidebar;
