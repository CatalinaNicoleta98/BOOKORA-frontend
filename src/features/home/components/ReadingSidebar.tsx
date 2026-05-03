import { useNavigate } from "react-router-dom";
import type {
    HomeContinueItem,
    HomePageData,
    HomeReadingStatus,
    HomeShelfSummaryItem,
} from "../types/home.types";

type ReadingSidebarProps = {
    data: HomePageData;
};

type ReadingSpotlightConfig = {
    id: string;
    label: string;
    emptyLabel: string;
    statuses: HomeReadingStatus[];
};

const spotlightSections: ReadingSpotlightConfig[] = [
    {
        id: "currently-reading",
        label: "Currently reading",
        emptyLabel: "No active physical read yet",
        statuses: ["currently_reading"],
    },
    {
        id: "currently-listening",
        label: "Currently listening",
        emptyLabel: "No audiobook in progress yet",
        statuses: ["currently_listening"],
    },
];

const getSpotlightItem = (
    continueItems: HomeContinueItem[],
    statuses: HomeReadingStatus[],
): HomeContinueItem | null => {
    return continueItems.find((item) => item.status && statuses.includes(item.status)) ?? null;
};

const getProgressPercentage = (item: HomeContinueItem): number => {
    if (item.progressMax <= 0) {
        return 0;
    }

    const percentage = (item.progressValue / item.progressMax) * 100;

    return Math.max(0, Math.min(100, percentage));
};

const getShelfPreview = (shelfSummary: HomeShelfSummaryItem[]): HomeShelfSummaryItem[] => {
    return [...shelfSummary]
        .sort((left, right) => right.count - left.count)
        .slice(0, 4);
};

const ReadingSidebar = ({ data }: ReadingSidebarProps) => {
    const navigate = useNavigate();
    const shelfPreview = getShelfPreview(data.shelfSummary);
    const challengeProgress =
        data.challenge.target > 0
            ? Math.max(0, Math.min(100, (data.challenge.current / data.challenge.target) * 100))
            : 0;

    return (
        <aside className="col-span-12 space-y-5">
            <section className="theme-content-panel overflow-hidden rounded-[1.75rem]">
                <div className="border-b border-white/10 px-5 py-4 sm:px-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Reading now</p>
                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                        Pick up where you left off
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                        Keep physical books, ebooks, and audiobooks clearly separated without losing the
                        full picture.
                    </p>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                    {spotlightSections.map((section) => {
                        const item = getSpotlightItem(data.continueItems, section.statuses);

                        if (!item) {
                            return (
                                <article key={section.id} className="theme-content-panel-soft rounded-[1.35rem] p-4">
                                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                        {section.label}
                                    </p>
                                    <p className="mt-3 text-sm font-medium text-slate-200">
                                        {section.emptyLabel}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        Add a title to your library and mark it as in progress to keep it
                                        here.
                                    </p>
                                </article>
                            );
                        }

                        const progressPercentage = getProgressPercentage(item);

                        return (
                            <button
                                key={section.id}
                                type="button"
                                onClick={() => navigate(`/books/${item.id}`)}
                                className="theme-content-panel-soft group w-full rounded-[1.35rem] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
                            >
                                <div className="flex gap-4">
                                    <div className="theme-cover-shell flex h-24 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-[1rem] text-[0.7rem] text-slate-500 shadow-md transition group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]">
                                        {item.coverUrl ? (
                                            <img
                                                src={item.coverUrl}
                                                alt={`${item.title} cover`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="px-2 text-center">No cover</span>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-400">
                                            {section.label}
                                        </p>
                                        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-300">{item.author}</p>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                                                <span>{item.progressLabel}</span>
                                                <span>{Math.round(progressPercentage)}%</span>
                                            </div>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)]"
                                                    style={{ width: `${progressPercentage}%` }}
                                                />
                                            </div>
                                            {item.secondaryLabel ? (
                                                <p className="text-xs text-slate-500">
                                                    {item.secondaryLabel}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="theme-content-panel rounded-[1.75rem] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Your shelves</p>
                        <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
                            Library snapshot
                        </h2>
                    </div>
                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                        {data.shelfSummary.length} total
                    </span>
                </div>

                <div className="mt-5 space-y-3">
                    {shelfPreview.length > 0 ? (
                        shelfPreview.map((shelf) => (
                            <button
                                key={shelf.id}
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="theme-content-panel-soft flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left transition hover:border-[var(--bookora-border-strong)]"
                            >
                                <span className="text-sm text-slate-200">{shelf.label}</span>
                                <span className="text-sm font-medium text-white">{shelf.count}</span>
                            </button>
                        ))
                    ) : (
                        <div className="theme-content-panel-muted rounded-[1rem] border-dashed px-4 py-4 text-sm leading-6 text-slate-400">
                            Your shelf overview will appear here once you start organizing your library.
                        </div>
                    )}
                </div>
            </section>

            <section className="theme-content-panel rounded-[1.75rem] p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Reading goal</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">
                            {data.challenge.current} / {data.challenge.target}
                        </h2>
                        <p className="mt-1 text-sm text-slate-300">{data.challenge.label}</p>
                    </div>
                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                        {Math.round(challengeProgress)}%
                    </span>
                </div>

                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)]"
                        style={{ width: `${challengeProgress}%` }}
                    />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                    Keep momentum across print, ebook, and audio, while still tracking each format in
                    the way that fits it best.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="theme-button-ghost mt-5 inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium"
                >
                    See full reading history
                </button>
            </section>
        </aside>
    );
};

export default ReadingSidebar;
