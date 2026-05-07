import { useNavigate } from "react-router-dom";

import type { HomePageData } from "../types/home.types";
import SocialFeed from "../../social/components/SocialFeed";
import type { HomeFeedData } from "../../social/types/feed.types";

type ActivityFeedProps = {
    data: HomePageData;
    feed: HomeFeedData | null;
    feedError?: string | null;
};

const ActivityFeed = ({ data, feed, feedError }: ActivityFeedProps) => {
    const navigate = useNavigate();
    const featuredContinue = data.continueItems[0];
    const secondaryContinueItems = data.continueItems.slice(1);

    return (
        <section className="space-y-6">
            <div className="theme-content-panel rounded-[1.9rem] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                        <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.2em]">
                            Continue reading
                        </p>
                        <h2 className="theme-title text-2xl font-semibold tracking-[-0.03em]">
                            Your current stack
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="theme-button-ghost inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium"
                    >
                        Open profile
                    </button>
                </div>

                {featuredContinue ? (
                    <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                        <button
                            type="button"
                            onClick={() => navigate(`/books/${featuredContinue.id}`)}
                            className="theme-content-panel-soft group overflow-hidden rounded-[1.55rem] text-left transition-all hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
                        >
                            <div className="grid sm:grid-cols-[152px_minmax(0,1fr)]">
                                <div className="theme-cover-shell relative h-full min-h-[220px] overflow-hidden">
                                    {featuredContinue.coverUrl ? (
                                        <img
                                            src={featuredContinue.coverUrl}
                                            alt={featuredContinue.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                            No cover
                                        </div>
                                    )}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                <div className="flex min-w-0 flex-col justify-between p-5">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="theme-status-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                                {featuredContinue.format === "audiobook"
                                                    ? "Audiobook"
                                                    : featuredContinue.format === "ebook"
                                                    ? "Ebook"
                                                    : "Print"}
                                            </span>
                                            <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                                {featuredContinue.status?.replace(/_/g, " ")}
                                            </span>
                                        </div>

                                        <h3 className="theme-title mt-4 text-2xl font-semibold tracking-[-0.03em]">
                                            {featuredContinue.title}
                                        </h3>
                                        <p className="theme-text-soft mt-2 text-sm">
                                            {featuredContinue.author}
                                        </p>
                                        <p className="theme-text-muted mt-4 text-sm leading-7">
                                            {featuredContinue.progressLabel}
                                            {featuredContinue.secondaryLabel
                                                ? ` • ${featuredContinue.secondaryLabel}`
                                                : ""}
                                        </p>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                                            <span>Reading progress</span>
                                            <span>
                                                {Math.round(
                                                    Math.min(
                                                        100,
                                                        Math.max(
                                                            0,
                                                            (featuredContinue.progressValue / featuredContinue.progressMax) *
                                                                100
                                                        )
                                                    )
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)]"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        Math.max(
                                                            0,
                                                            (featuredContinue.progressValue / featuredContinue.progressMax) *
                                                                100
                                                        )
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>

                        <div className="space-y-3">
                            {secondaryContinueItems.length > 0 ? (
                                secondaryContinueItems.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => navigate(`/books/${item.id}`)}
                                    className="theme-content-panel-soft flex w-full items-center gap-4 rounded-[1.3rem] p-4 text-left transition-all hover:border-[var(--bookora-border-strong)]"
                                    >
                                        <div className="theme-cover-shell h-20 w-14 shrink-0 overflow-hidden rounded-[0.85rem]">
                                            {item.coverUrl ? (
                                                <img
                                                    src={item.coverUrl}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                                                    No cover
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="theme-title line-clamp-1 text-sm font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                                                {item.author}
                                            </p>
                                            <p className="mt-3 text-xs text-slate-400">
                                                {item.progressLabel}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="theme-content-panel-muted rounded-[1.3rem] border-dashed p-4 text-sm leading-6 text-slate-400">
                                    As you add more active books, they will appear here as a quick-return stack.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="theme-content-panel-muted mt-5 rounded-[1.4rem] border-dashed p-5">
                        <p className="theme-text text-base font-medium">
                            No books in progress yet.
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                            Search for a book and mark it as currently reading or listening to start building your home stack.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/search")}
                            className="theme-button-accent mt-4 inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors"
                        >
                            Browse books
                        </button>
                    </div>
                )}
            </div>

            <div className="theme-content-panel rounded-[1.9rem] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                        <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.2em]">
                            Feed
                        </p>
                        <h2 className="theme-title text-2xl font-semibold tracking-[-0.03em]">
                            Followed reader updates
                        </h2>
                        <p className="theme-text-soft text-sm leading-7">
                            Public reading moments, reviews, ratings, and finished books from the readers you follow.
                        </p>
                    </div>

                    {feed?.meta.includeSelf ? (
                        <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                            Your updates included
                        </span>
                    ) : null}
                </div>

                <SocialFeed feed={feed} error={feedError} />
            </div>
        </section>
    );
};

export default ActivityFeed;
