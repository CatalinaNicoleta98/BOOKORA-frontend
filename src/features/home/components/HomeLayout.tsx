import { useNavigate } from "react-router-dom";

import type { HomePageData } from "../types/home.types";
import ReadingSidebar from "./ReadingSidebar";
import ActivityFeed from "./ActivityFeed";
import RecommendationsSidebar from "./RecommendationsSidebar";

type HomeLayoutProps = {
    data: HomePageData;
};

const HomeLayout = ({ data }: HomeLayoutProps) => {
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
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/70">
                                Home
                            </p>
                            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                                Welcome back, {data.userName.split(" ")[0]}.
                            </h1>
                            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-[0.95rem]">
                                Your shelves, in-progress reads, and recent review activity all live here.
                                Pick up a book, browse your profile, or jump into something new.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/search")}
                                className="inline-flex h-12 items-center justify-center rounded-full border border-amber-200/25 bg-amber-200/12 px-5 text-sm font-semibold text-amber-50 transition-all hover:border-amber-200/35 hover:bg-amber-200/18"
                            >
                                Find your next book
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Visit profile
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        <div className="theme-content-panel-soft rounded-[1.4rem] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                Reading now
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-white">
                                {activeReadsCount}
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                                active books across print and audio
                            </p>
                        </div>

                        <div className="theme-content-panel-soft rounded-[1.4rem] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                Goal progress
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-white">
                                {data.challenge.current}/{data.challenge.target}
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                                books completed toward your target
                            </p>
                        </div>

                        <div className="theme-content-panel-soft rounded-[1.4rem] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                Written reviews
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-white">
                                {writtenReviewsCount}
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
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
                    <ActivityFeed data={data} />
                </div>

                <div className="order-3 col-span-12 md:col-span-6 xl:col-span-3">
                    <RecommendationsSidebar data={data} />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
