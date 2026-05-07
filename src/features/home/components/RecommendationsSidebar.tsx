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
            className="theme-content-panel-soft flex w-full items-center gap-3 rounded-[1.15rem] p-3 text-left transition-all hover:border-[var(--bookora-border-strong)]"
        >
            <div className="theme-cover-shell h-16 w-12 shrink-0 overflow-hidden rounded-[0.8rem]">
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
                <p className="theme-title line-clamp-2 text-sm font-semibold leading-6">
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

const CoverRow = ({
    books,
}: {
    books: HomeBookCard[];
}) => {
    const navigate = useNavigate();

    if (books.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            {books.slice(0, 4).map((book) => (
                <button
                    key={book.id}
                    type="button"
                    onClick={() => navigate(`/books/${book.id}`)}
                    className="theme-cover-shell aspect-[3/4] overflow-hidden rounded-[0.9rem] transition-transform duration-300 hover:-translate-y-1"
                >
                    {book.coverUrl ? (
                        <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full items-center justify-center px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {book.title}
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

const FeaturedRecommendation = ({ item }: { item: HomeRecommendationItem }) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(`/books/${item.id}`)}
            className="theme-content-panel-soft w-full overflow-hidden rounded-[1.45rem] text-left transition-all hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
        >
            <div className="grid grid-cols-[86px_minmax(0,1fr)] gap-4 p-4">
                <div className="theme-cover-shell overflow-hidden rounded-[0.95rem]">
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
                    <p className="theme-accent-text text-[11px] font-semibold uppercase tracking-[0.18em]">
                        Recommended for you
                    </p>
                    <h3 className="theme-title mt-2 line-clamp-2 text-base font-semibold leading-6">
                        {item.title}
                    </h3>
                    <p className="theme-text-soft mt-1 line-clamp-1 text-sm">
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
    const remainingRecommendations = data.recommendations.slice(1, 4);
    const trendingPreview = data.trendingBooks.slice(0, 4);
    const queuePreview = data.newReleases.slice(0, 4);

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
                        <>
                            <FeaturedRecommendation item={featuredRecommendation} />
                            <div className="theme-content-panel-soft rounded-[1.2rem] p-4">
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    Visual picks
                                </p>
                                <div className="mt-3">
                                    <CoverRow books={data.recommendations} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="theme-content-panel-muted rounded-[1.3rem] border-dashed p-4 text-sm leading-6 text-slate-400">
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
                        <>
                            <div className="theme-content-panel-soft rounded-[1.2rem] p-4">
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    Recently active
                                </p>
                                <div className="mt-3">
                                    <CoverRow books={trendingPreview} />
                                </div>
                            </div>
                            {trendingPreview.map((book) => (
                                <CompactBookButton
                                    key={book.id}
                                    book={book}
                                    subtitle="Opened from your recent reading and rating activity."
                                />
                            ))}
                        </>
                    ) : (
                        <div className="theme-content-panel-muted rounded-[1.3rem] border-dashed p-4 text-sm leading-6 text-slate-400">
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
                        <>
                            <div className="theme-content-panel-soft rounded-[1.2rem] p-4">
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    Queue preview
                                </p>
                                <div className="mt-3">
                                    <CoverRow books={queuePreview} />
                                </div>
                            </div>
                            {queuePreview.map((book) => (
                                <CompactBookButton
                                    key={book.id}
                                    book={book}
                                    subtitle="A title to revisit next from your saved queue."
                                />
                            ))}
                        </>
                    ) : (
                        <div className="theme-content-panel-muted rounded-[1.3rem] border-dashed p-4 text-sm leading-6 text-slate-400">
                            Add a few books to Want to Read and this queue will start feeling much more personal.
                        </div>
                    )}
                </div>
            </Panel>
        </aside>
    );
};

export default RecommendationsSidebar;
