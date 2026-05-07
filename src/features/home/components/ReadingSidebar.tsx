import { useNavigate } from "react-router-dom";
import type {
    HomeContinueItem,
    HomeBookCard,
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

const getUniqueBooks = (books: HomeBookCard[]) =>
    books.filter((book, index, values) => values.findIndex((item) => item.id === book.id) === index);

const CoverCluster = ({
    books,
    emptyLabel,
    onOpenBook,
}: {
    books: HomeBookCard[];
    emptyLabel: string;
    onOpenBook: (bookId: string) => void;
}) => {
    if (books.length === 0) {
        return (
            <div className="theme-content-panel-muted rounded-[1rem] border-dashed px-4 py-4 text-sm leading-6 text-slate-400">
                {emptyLabel}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            {books.slice(0, 4).map((book) => (
                <button
                    key={book.id}
                    type="button"
                    onClick={() => onOpenBook(book.id)}
                    className="theme-cover-shell aspect-[3/4] overflow-hidden rounded-[0.95rem] transition-transform duration-300 hover:-translate-y-1"
                >
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center px-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                            {book.title}
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

const ReadingSidebar = ({ data }: ReadingSidebarProps) => {
    const navigate = useNavigate();
    const shelfPreview = getShelfPreview(data.shelfSummary);
    const challengeProgress =
        data.challenge.target > 0
            ? Math.max(0, Math.min(100, (data.challenge.current / data.challenge.target) * 100))
            : 0;
    const featuredRead = data.continueItems[0] ?? null;
    const inProgressBooks = getUniqueBooks(data.continueItems);
    const queueBooks = getUniqueBooks(data.newReleases);
    const momentumBooks = getUniqueBooks(data.trendingBooks);

    return (
        <aside className="col-span-12 space-y-5">
            <section className="theme-content-panel overflow-hidden rounded-[1.8rem]">
                <div className="relative overflow-hidden px-5 py-5 sm:px-6">
                    <div className="pointer-events-none absolute inset-x-4 top-4 h-24 rounded-full bg-[radial-gradient(circle_at_top,_rgba(241,223,177,0.18),_transparent_72%)] blur-2xl" />
                    <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="theme-text-muted text-xs uppercase tracking-[0.24em]">Reading challenge</p>
                                <h2 className="theme-title mt-3 text-xl font-semibold tracking-[-0.03em]">
                                    {data.challenge.current} of {data.challenge.target} books
                                </h2>
                                <p className="theme-text-soft mt-2 text-sm leading-6">
                                    {data.challenge.label}
                                </p>
                            </div>
                            <div className="theme-content-panel-soft flex h-16 w-16 items-center justify-center rounded-[1.4rem] text-sm font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_rgba(15,23,42,0.18)]">
                                Goal
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                                    <span>Progress</span>
                                    <span>{Math.round(challengeProgress)}%</span>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#e2b96b_48%,#9fd0ff_100%)]"
                                        style={{ width: `${challengeProgress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="theme-content-panel-soft rounded-[1rem] px-4 py-3 text-right">
                                <p className="theme-title text-lg font-semibold">{data.challenge.current}</p>
                                <p className="theme-text-muted text-[11px] uppercase tracking-[0.18em]">
                                    completed
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
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
                        <button
                            type="button"
                            onClick={() => navigate(`/books/${featuredRead.id}`)}
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
                                        {featuredRead.status ? (
                                            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                                                {featuredRead.status.replace(/_/g, " ")}
                                            </span>
                                        ) : null}
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

            <section className="theme-content-panel rounded-[1.8rem] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="theme-text-muted text-xs uppercase tracking-[0.24em]">Shelf preview</p>
                        <h2 className="theme-title mt-3 text-lg font-semibold tracking-[-0.03em]">
                            Your reading lanes
                        </h2>
                    </div>
                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                        {shelfPreview.length} tracked
                    </span>
                </div>

                <div className="mt-5 space-y-4">
                    <div className="theme-content-panel-soft rounded-[1.2rem] p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                                <p className="theme-title text-sm font-semibold">In progress</p>
                                <p className="theme-text-muted text-xs">Current reading and listening</p>
                            </div>
                            <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                                {inProgressBooks.length}
                            </span>
                        </div>
                        <CoverCluster
                            books={inProgressBooks}
                            emptyLabel="Start a book to build your in-progress shelf."
                            onOpenBook={(bookId) => navigate(`/books/${bookId}`)}
                        />
                    </div>

                    <div className="theme-content-panel-soft rounded-[1.2rem] p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                                <p className="theme-title text-sm font-semibold">Momentum</p>
                                <p className="theme-text-muted text-xs">Books from recent activity</p>
                            </div>
                            <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                                {momentumBooks.length}
                            </span>
                        </div>
                        <CoverCluster
                            books={momentumBooks}
                            emptyLabel="Your recently active books will show up here."
                            onOpenBook={(bookId) => navigate(`/books/${bookId}`)}
                        />
                    </div>

                    <div className="theme-content-panel-soft rounded-[1.2rem] p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                                <p className="theme-title text-sm font-semibold">Want to read</p>
                                <p className="theme-text-muted text-xs">Pulled from your saved queue</p>
                            </div>
                            <span className="theme-pill-subtle rounded-full px-3 py-1 text-xs">
                                {queueBooks.length}
                            </span>
                        </div>
                        <CoverCluster
                            books={queueBooks}
                            emptyLabel="Save books for later and your queue will become more visual."
                            onOpenBook={(bookId) => navigate(`/books/${bookId}`)}
                        />
                    </div>
                </div>

                {shelfPreview.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {shelfPreview.map((shelf) => (
                            <button
                                key={shelf.id}
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="theme-content-panel-soft rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-[var(--bookora-border-strong)]"
                            >
                                {shelf.label} · {shelf.count}
                            </button>
                        ))}
                    </div>
                ) : null}
            </section>
        </aside>
    );
};

export default ReadingSidebar;
