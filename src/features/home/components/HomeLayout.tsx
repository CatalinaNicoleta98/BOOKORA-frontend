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
    const activeReadsCount = data.continueItems.length;
    const writtenReviewsCount = data.recentActivity.filter((activity) =>
        activity.title.toLowerCase().includes("review")
    ).length;

    return (
        <div className="space-y-8 py-6 lg:py-10">
            <section className="theme-content-panel overflow-hidden rounded-[2rem] shadow-[0_32px_90px_rgba(0,0,0,0.18)]">
                <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.9fr)] lg:px-10">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <p className="theme-eyebrow">
                                Home
                            </p>
                            <h1 className="theme-title max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                Welcome back, {data.userName.split(" ")[0]}.
                            </h1>
                            <p className="theme-text-soft max-w-2xl text-sm leading-7 sm:text-[0.95rem]">
                                Your shelves, in-progress reads, and recent review activity all live here.
                                Pick up a book, browse your profile, or jump into something new.
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
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        <div className="theme-content-panel-soft rounded-[1.4rem] p-4">
                            <p className="theme-text-muted text-xs uppercase tracking-[0.2em]">
                                Reading now
                            </p>
                            <p className="theme-title mt-3 text-2xl font-semibold">
                                {activeReadsCount}
                            </p>
                            <p className="theme-text-soft mt-1 text-sm">
                                active books across print and audio
                            </p>
                        </div>

                        <div className="theme-content-panel-soft rounded-[1.4rem] p-4">
                            <p className="theme-text-muted text-xs uppercase tracking-[0.2em]">
                                Goal progress
                            </p>
                            <p className="theme-title mt-3 text-2xl font-semibold">
                                {data.challenge.current}/{data.challenge.target}
                            </p>
                            <p className="theme-text-soft mt-1 text-sm">
                                books completed toward your target
                            </p>
                        </div>

                        <div className="theme-content-panel-soft rounded-[1.4rem] p-4">
                            <p className="theme-text-muted text-xs uppercase tracking-[0.2em]">
                                Written reviews
                            </p>
                            <p className="theme-title mt-3 text-2xl font-semibold">
                                {writtenReviewsCount}
                            </p>
                            <p className="theme-text-soft mt-1 text-sm">
                                recent review moments in your activity
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-12 gap-6">
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
