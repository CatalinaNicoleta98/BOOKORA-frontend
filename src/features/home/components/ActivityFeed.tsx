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
                                className="min-w-[160px] group cursor-pointer"
                            >
                                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/10 border border-white/10 shadow-md transition duration-300 group-hover:scale-[1.05] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
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

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

                                    {/* Format badge */}
                                    {item.format && (
                                        <span className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-sm">
                                            {item.format === "physical"
                                                ? "Print"
                                                : item.format === "ebook"
                                                ? "Ebook"
                                                : "Audio"}
                                        </span>
                                    )}

                                    {/* Progress bar */}
                                    {item.progressMax > 0 && (
                                        <div className="absolute bottom-0 left-0 w-full px-2 pb-2">
                                            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)]"
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            Math.max(
                                                                0,
                                                                (item.progressValue / item.progressMax) * 100
                                                            )
                                                        )}%`,
                                                    }}
                                                />
                                            </div>
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
                        {data.recentActivity.map((activity, index) => {
                            const isFinished = activity.title.toLowerCase().includes("finished");
                            const isRated = activity.title.toLowerCase().includes("rated");

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition"
                                >
                                    {/* Cover */}
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

                                    {/* Content */}
                                    <div className="flex-1">
                                        <p className="text-sm text-white font-medium">
                                            {activity.title}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            {activity.subtitle}
                                        </p>

                                        {/* Extra context */}
                                        {isFinished && (
                                            <p className="text-[11px] text-emerald-300 mt-1">
                                                Completed
                                            </p>
                                        )}

                                        {isRated && (
                                            <p className="text-[11px] text-amber-300 mt-1">
                                                Your rating saved
                                            </p>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <span className="text-xs text-slate-500 whitespace-nowrap">
                                        {activity.createdAt}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ActivityFeed;