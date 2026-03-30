

import type { HomePageData } from "../types/home.types";

type ActivityFeedProps = {
    data: HomePageData;
};

const ActivityFeed = ({ data }: ActivityFeedProps) => {
    return (
        <section className="col-span-6 space-y-6">
            {/* Continue Reading & Listening */}
            <div className="rounded-2xl border border-white/10 bg-[rgba(15,21,38,0.7)] p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold text-white">
                        Continue Reading & Listening
                    </h2>
                    <button className="text-sm text-slate-400 hover:text-white transition">
                        View all
                    </button>
                </div>

                {data.continueItems.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        No books in progress yet. Start reading or listening to see them here.
                    </p>
                ) : (
                    <div className="flex gap-5 overflow-x-auto pb-2">
                        {data.continueItems.map((item, index) => (
                            <div
                                key={index}
                                className="min-w-[140px] group cursor-pointer"
                            >
                                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-white/10 border border-white/10 shadow-md group-hover:scale-[1.04] transition duration-300">
                                    {item.coverUrl ? (
                                        <img
                                            src={item.coverUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                            No cover
                                        </div>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-white font-medium line-clamp-1">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-400 line-clamp-1">
                                    {item.author}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Activity Feed */}
            <div className="rounded-2xl border border-white/10 bg-[rgba(15,21,38,0.7)] p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold text-white">
                        Your Activity
                    </h2>
                </div>

                {data.recentActivity.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        No recent activity yet.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {data.recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                            >
                                <div className="h-12 w-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center text-xs text-slate-400">
                                    {activity.book.coverUrl ? (
                                        <img
                                            src={activity.book.coverUrl}
                                            alt={activity.book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        "—"
                                    )}
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {activity.subtitle}
                                    </p>
                                </div>

                                <span className="text-xs text-slate-500">
                                    {activity.createdAt}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ActivityFeed;