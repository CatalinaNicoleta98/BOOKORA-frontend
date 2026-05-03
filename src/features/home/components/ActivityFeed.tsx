import { useNavigate } from "react-router-dom";

import type { HomeActivityItem, HomePageData } from "../types/home.types";

type ActivityFeedProps = {
    data: HomePageData;
};

const getActivityAccent = (activity: HomeActivityItem) => {
    switch (activity.type) {
        case "finished_book":
        case "finished_audiobook":
            return {
                badge: "Finished",
                badgeClass: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
                dotClass: "bg-emerald-300",
            };
        case "rated_book":
            return {
                badge: "Reviewed",
                badgeClass: "border-amber-200/20 bg-amber-200/10 text-amber-100",
                dotClass: "bg-amber-200",
            };
        case "started_audiobook":
            return {
                badge: "Listening",
                badgeClass: "border-sky-300/20 bg-sky-300/10 text-sky-100",
                dotClass: "bg-sky-300",
            };
        case "started_book":
            return {
                badge: "Reading",
                badgeClass: "border-indigo-300/20 bg-indigo-300/10 text-indigo-100",
                dotClass: "bg-indigo-300",
            };
        default:
            return {
                badge: "Update",
                badgeClass: "border-white/10 bg-white/5 text-slate-200",
                dotClass: "bg-slate-300",
            };
    }
};

const ActivityFeed = ({ data }: ActivityFeedProps) => {
    const navigate = useNavigate();
    const featuredContinue = data.continueItems[0];
    const secondaryContinueItems = data.continueItems.slice(1);

    return (
        <section className="space-y-6">
            <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,21,38,0.82)_0%,rgba(11,16,30,0.76)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Continue reading
                        </p>
                        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                            Your current stack
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        Open profile
                    </button>
                </div>

                {featuredContinue ? (
                    <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                        <button
                            type="button"
                            onClick={() => navigate(`/books/${featuredContinue.id}`)}
                            className="group overflow-hidden rounded-[1.55rem] border border-white/10 bg-[linear-gradient(180deg,rgba(22,31,55,0.84)_0%,rgba(13,18,32,0.82)_100%)] text-left transition-all hover:-translate-y-0.5 hover:border-white/16"
                        >
                            <div className="grid sm:grid-cols-[152px_minmax(0,1fr)]">
                                <div className="relative h-full min-h-[220px] overflow-hidden bg-white/[0.04]">
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
                                            <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100">
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

                                        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                                            {featuredContinue.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-300">
                                            {featuredContinue.author}
                                        </p>
                                        <p className="mt-4 text-sm leading-7 text-slate-400">
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
                                        className="flex w-full items-center gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4 text-left transition-all hover:border-white/16 hover:bg-white/[0.05]"
                                    >
                                        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-[0.85rem] border border-white/10 bg-white/[0.04]">
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
                                            <p className="line-clamp-1 text-sm font-semibold text-white">
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
                                <div className="rounded-[1.3rem] border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-slate-400">
                                    As you add more active books, they will appear here as a quick-return stack.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-5 rounded-[1.4rem] border border-dashed border-white/10 bg-white/[0.025] p-5">
                        <p className="text-base font-medium text-slate-100">
                            No books in progress yet.
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                            Search for a book and mark it as currently reading or listening to start building your home stack.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/search")}
                            className="mt-4 inline-flex h-11 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10 px-4 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-200/15"
                        >
                            Browse books
                        </button>
                    </div>
                )}
            </div>

            <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,21,38,0.82)_0%,rgba(11,16,30,0.76)_100%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Activity
                        </p>
                        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                            Your reading timeline
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        View profile activity
                    </button>
                </div>

                {data.recentActivity.length > 0 ? (
                    <div className="mt-6 space-y-4">
                        {data.recentActivity.map((activity, index) => {
                            const accent = getActivityAccent(activity);

                            return (
                                <button
                                    key={`${activity.id}-${index}`}
                                    type="button"
                                    onClick={() => navigate(`/books/${activity.book.id}`)}
                                    className="group flex w-full gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-white/16 hover:bg-white/[0.05]"
                                >
                                    <div className="flex flex-col items-center">
                                        <span className={`h-3 w-3 rounded-full ${accent.dotClass}`} />
                                        {index < data.recentActivity.length - 1 ? (
                                            <span className="mt-2 h-full min-h-10 w-px bg-white/10" />
                                        ) : null}
                                    </div>

                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[0.95rem] border border-white/10 bg-white/[0.04]">
                                        {activity.book.coverUrl ? (
                                            <img
                                                src={activity.book.coverUrl}
                                                alt={activity.book.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-[11px] text-slate-400">
                                                No cover
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span
                                                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${accent.badgeClass}`}
                                            >
                                                {accent.badge}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {activity.createdAt}
                                            </span>
                                        </div>

                                        <p className="mt-3 text-base font-semibold text-white">
                                            {activity.title}
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-slate-400">
                                            {activity.subtitle}
                                        </p>
                                        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                                            Open {activity.book.title}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-5 rounded-[1.4rem] border border-dashed border-white/10 bg-white/[0.025] p-5 text-sm leading-7 text-slate-400">
                        Once you rate, review, finish, or update progress on books, your personal activity timeline will start filling in here.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ActivityFeed;
