import { useNavigate } from "react-router-dom";

import type { HomePageData } from "../types/home.types";
import ReadingSidebar from "./ReadingSidebar";
import ActivityFeed from "./ActivityFeed";
import RecommendationsSidebar from "./RecommendationsSidebar";
import type { HomeFeedData } from "../../social/types/feed.types";

type HomeLayoutProps = {
    data: HomePageData;
    feed: HomeFeedData | null;
    feedError?: string | null;
};

const HomeLayout = ({ data, feed, feedError }: HomeLayoutProps) => {
    const navigate = useNavigate();
    const heroBooks = [
        ...data.continueItems,
        ...data.recommendations,
        ...data.trendingBooks,
        ...data.newReleases,
    ]
        .filter((book, index, books) => books.findIndex((item) => item.id === book.id) === index)
        .filter((book) => Boolean(book.coverUrl))
        .slice(0, 5);
    const activeReadsCount = data.continueItems.length;
    const recommendationCount = data.recommendations.length;
    const challengeProgress =
        data.challenge.target > 0
            ? Math.round(Math.max(0, Math.min(100, (data.challenge.current / data.challenge.target) * 100)))
            : 0;

    return (
        <div className="space-y-8 py-6 lg:py-10">
            <section className="theme-content-panel overflow-hidden rounded-[2rem] shadow-[0_32px_90px_rgba(0,0,0,0.18)]">
                <div className="grid gap-8 px-5 py-6 sm:px-8 sm:py-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.9fr)] xl:px-10">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="theme-eyebrow">Home</p>
                            <h1 className="theme-title max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                Welcome back, {data.userName.split(" ")[0]}.
                            </h1>
                            <p className="theme-text-soft max-w-2xl text-sm leading-7 sm:text-[0.95rem]">
                                Your reading dashboard is ready with your current stack, shelf momentum,
                                followed reader updates, and a few books worth opening next.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/search")}
                                className="theme-button-accent inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all"
                            >
                                Find your next book
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="theme-button-ghost inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold"
                            >
                                Visit profile
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="theme-content-panel-soft rounded-[1.35rem] px-4 py-4">
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.2em]">
                                    Reading now
                                </p>
                                <p className="theme-title mt-3 text-2xl font-semibold">{activeReadsCount}</p>
                                <p className="theme-text-soft mt-1 text-sm">books currently in motion</p>
                            </div>

                            <div className="theme-content-panel-soft rounded-[1.35rem] px-4 py-4">
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.2em]">
                                    Goal progress
                                </p>
                                <p className="theme-title mt-3 text-2xl font-semibold">
                                    {data.challenge.current}/{data.challenge.target}
                                </p>
                                <p className="theme-text-soft mt-1 text-sm">{challengeProgress}% of your challenge</p>
                            </div>

                            <div className="theme-content-panel-soft rounded-[1.35rem] px-4 py-4">
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.2em]">
                                    Discovery
                                </p>
                                <p className="theme-title mt-3 text-2xl font-semibold">{recommendationCount}</p>
                                <p className="theme-text-soft mt-1 text-sm">personal picks waiting on the right</p>
                            </div>
                        </div>
                    </div>

                    <div className="theme-content-panel-soft overflow-hidden rounded-[1.7rem] p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="theme-text-muted text-[11px] font-semibold uppercase tracking-[0.2em]">
                                    Reader moodboard
                                </p>
                                <h2 className="theme-title mt-2 text-xl font-semibold tracking-[-0.03em]">
                                    Your dashboard at a glance
                                </h2>
                            </div>
                        </div>

                        {heroBooks.length > 0 ? (
                            <div className="mt-5">
                                <div className="grid grid-cols-5 gap-3">
                                    {heroBooks.map((book, index) => (
                                        <button
                                            key={`${book.id}-${index}`}
                                            type="button"
                                            onClick={() => navigate(`/books/${book.id}`)}
                                            className={`theme-cover-shell overflow-hidden rounded-[1.1rem] shadow-[0_14px_28px_rgba(2,6,23,0.22)] transition-transform duration-300 hover:-translate-y-1 ${
                                                index === 0 ? "col-span-2 row-span-2 min-h-[220px]" : "min-h-[104px]"
                                            }`}
                                        >
                                            <img
                                                src={book.coverUrl ?? ""}
                                                alt={book.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                                        {activeReadsCount} active reads
                                    </span>
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                                        {feed?.meta.followingCount ?? 0} followed readers
                                    </span>
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                                        {data.shelfSummary.length} shelf groups
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="theme-content-panel-muted mt-5 rounded-[1.35rem] border-dashed p-4 text-sm leading-6 text-slate-400">
                                As your shelves fill up, this space will become a quick visual snapshot of what you are reading and discovering.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-12 gap-6 xl:gap-7">
                <div className="order-2 col-span-12 md:col-span-6 xl:order-1 xl:col-span-3">
                    <ReadingSidebar data={data} />
                </div>

                <div className="order-1 col-span-12 xl:order-2 xl:col-span-6">
                    <ActivityFeed data={data} feed={feed} feedError={feedError} />
                </div>

                <div className="order-3 col-span-12 md:col-span-6 xl:col-span-3">
                    <RecommendationsSidebar data={data} />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
