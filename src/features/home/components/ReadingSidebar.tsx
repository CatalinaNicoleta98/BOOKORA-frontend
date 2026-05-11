import { useNavigate } from "react-router-dom";
import { buildBookDetailsRoute } from "../../book/utils/bookRouting";
import type {
    HomeContinueItem,
    HomePageData,
    HomeReadingStatus,
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

const CurrentReadListItem = ({
    item,
    onOpen,
}: {
    item: HomeContinueItem;
    onOpen: (bookId: string) => void;
}) => {
    return (
        <button
            type="button"
            onClick={() => onOpen(item.id)}
            className="theme-content-panel-soft flex w-full items-center gap-3 rounded-[1.15rem] p-3 text-left"
        >
            <div className="theme-cover-shell h-16 w-12 shrink-0 overflow-hidden rounded-[0.85rem]">
                {item.coverUrl ? (
                    <img
                        src={item.coverUrl}
                        alt={`${item.title} cover`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-2 text-center text-[10px] text-slate-400">
                        No cover
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="theme-title line-clamp-2 text-sm font-semibold">{item.title}</p>
                <p className="theme-text-soft mt-1 text-sm">{item.author}</p>
                <p className="mt-2 text-xs text-slate-400">{item.progressLabel}</p>
            </div>
        </button>
    );
};

const ReadingSidebar = ({ data }: ReadingSidebarProps) => {
    const navigate = useNavigate();
    const challengeProgress =
        data.challenge.target > 0
            ? Math.max(0, Math.min(100, (data.challenge.current / data.challenge.target) * 100))
            : 0;
    const remainingBooks = Math.max(data.challenge.target - data.challenge.current, 0);
    const currentReads = data.continueItems.filter((item) => item.status === "currently_reading");
    const featuredRead = currentReads[0] ?? null;
    const remainingCurrentReads = currentReads.slice(1);

    return (
        <aside className="col-span-12 space-y-5">
            <section className="theme-content-panel overflow-hidden rounded-[1.8rem]">
                <div className="relative overflow-hidden px-5 py-5 sm:px-6">
                    <div className="pointer-events-none absolute inset-x-4 top-4 h-28 rounded-full bg-[radial-gradient(circle_at_top,_rgba(241,223,177,0.24),_transparent_72%)] blur-2xl" />
                    <div className="pointer-events-none absolute -right-8 top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(159,208,255,0.14),transparent_68%)] blur-2xl" />
                    <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                            <div className="max-w-[16rem]">
                                <p className="theme-text-muted text-xs uppercase tracking-[0.24em]">Reading challenge</p>
                                <h2 className="theme-title mt-3 text-[1.4rem] font-semibold tracking-[-0.03em] sm:text-[1.55rem]">
                                    {data.challenge.current} of {data.challenge.target} books
                                </h2>
                                <p className="theme-text-soft mt-2 text-sm leading-6">
                                    {data.challenge.label}
                                </p>
                            </div>
                            <div className="theme-content-panel-soft flex min-h-[5.25rem] min-w-[5.25rem] flex-col items-center justify-center rounded-[1.5rem] px-3 text-center shadow-[0_14px_30px_rgba(15,23,42,0.18)]">
                                <p className="theme-title text-xl font-semibold">
                                    {Math.round(challengeProgress)}%
                                </p>
                                <p className="theme-text-muted mt-1 text-[10px] uppercase tracking-[0.2em]">
                                    complete
                                </p>
                            </div>
                        </div>

                        <div className="theme-content-panel-soft mt-5 rounded-[1.4rem] p-4 sm:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="theme-text-muted text-[11px] uppercase tracking-[0.2em]">
                                        Progress this year
                                    </p>
                                    <p className="theme-text-soft mt-2 text-sm">
                                        {remainingBooks > 0
                                            ? `${remainingBooks} book${remainingBooks === 1 ? "" : "s"} left to reach your goal.`
                                            : "Goal reached. Everything from here is bonus momentum."}
                                    </p>
                                </div>
                                <div className="theme-content-panel-muted rounded-[1rem] px-4 py-3 text-right">
                                    <p className="theme-title text-lg font-semibold">{data.challenge.target}</p>
                                    <p className="theme-text-muted text-[11px] uppercase tracking-[0.18em]">
                                        annual goal
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                                    <span>Progress</span>
                                    <span>{data.challenge.current}/{data.challenge.target}</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#e2b96b_48%,#9fd0ff_100%)]"
                                        style={{ width: `${challengeProgress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/library#finished_reading")}
                            className="theme-button-ghost mt-5 inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium"
                        >
                            See reading history
                        </button>
                    </div>
                </div>
            </section>

            <section className="theme-content-panel overflow-hidden rounded-[1.8rem]">
                <div className="border-b border-[var(--bookora-border)] px-5 py-4 sm:px-6">
                    <p className="theme-text-muted text-xs uppercase tracking-[0.24em]">Current stack</p>
                    <h2 className="theme-title mt-3 text-xl font-semibold tracking-[-0.03em]">
                        Pick up where you left off
                    </h2>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                    {featuredRead ? (
                        <>
                            <button
                                type="button"
                                onClick={() => navigate(buildBookDetailsRoute(featuredRead.id))}
                                className="theme-content-panel-soft group w-full rounded-[1.35rem] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
                            >
                                <div className="flex gap-4">
                                    <div className="theme-cover-shell h-28 w-[4.9rem] shrink-0 overflow-hidden rounded-[1rem] shadow-md transition group-hover:shadow-[0_10px_26px_rgba(0,0,0,0.18)]">
                                        {featuredRead.coverUrl ? (
                                            <img
                                                src={featuredRead.coverUrl}
                                                alt={`${featuredRead.title} cover`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center px-2 text-center text-[10px] text-slate-400">
                                                No cover
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="theme-status-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                                {featuredRead.format ?? "Book"}
                                            </span>
                                        </div>
                                        <h3 className="theme-title mt-3 line-clamp-2 text-base font-semibold leading-6">
                                            {featuredRead.title}
                                        </h3>
                                        <p className="theme-text-soft mt-1 text-sm">{featuredRead.author}</p>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                                                <span>{featuredRead.progressLabel}</span>
                                                <span>{Math.round(getProgressPercentage(featuredRead))}%</span>
                                            </div>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#9fd0ff_100%)]"
                                                    style={{ width: `${getProgressPercentage(featuredRead)}%` }}
                                                />
                                            </div>
                                            {featuredRead.secondaryLabel ? (
                                                <p className="text-xs text-slate-500">{featuredRead.secondaryLabel}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {remainingCurrentReads.length === 1 ? (
                                <CurrentReadListItem
                                    item={remainingCurrentReads[0]}
                                    onOpen={(bookId) => navigate(buildBookDetailsRoute(bookId))}
                                />
                            ) : null}

                            {remainingCurrentReads.length > 1 ? (
                                <div className="space-y-3">
                                    <p className="theme-text-muted px-1 text-[11px] uppercase tracking-[0.18em]">
                                        More currently reading
                                    </p>
                                    <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                        {remainingCurrentReads.map((item) => (
                                            <div key={item.id} className="w-[15rem] shrink-0">
                                                <CurrentReadListItem
                                                    item={item}
                                                    onOpen={(bookId) => navigate(buildBookDetailsRoute(bookId))}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <div className="theme-content-panel-muted rounded-[1.2rem] border-dashed p-4 text-sm leading-6 text-slate-400">
                            No book is in progress right now. Mark a book as currently reading or listening and it will land here.
                        </div>
                    )}

                    <div className="grid gap-3">
                        {spotlightSections.map((section) => {
                            const item = getSpotlightItem(data.continueItems, section.statuses);

                            return (
                                <div key={section.id} className="theme-content-panel-soft rounded-[1.15rem] px-4 py-3">
                                    <p className="theme-text-muted text-[11px] uppercase tracking-[0.2em]">
                                        {section.label}
                                    </p>
                                    <p className="theme-text mt-2 text-sm font-medium">
                                        {item ? item.title : section.emptyLabel}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {item ? item.progressLabel : "Add a title to your library to keep it in view."}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </aside>
    );
};

export default ReadingSidebar;
