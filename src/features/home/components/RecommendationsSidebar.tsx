import type { HomePageData, HomeBookCard } from "../types/home.types";

type RecommendationsSidebarProps = {
    data: HomePageData;
};

const BookMiniCard = ({ book }: { book: HomeBookCard }) => {
    return (
        <div className="min-w-[110px] sm:min-w-[120px] group cursor-pointer">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] shadow-sm transition duration-300 group-hover:scale-[1.04] group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                        No cover
                    </div>
                )}

                {/* soft gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            <p className="mt-2 line-clamp-1 text-xs font-medium text-white sm:text-sm">
                {book.title}
            </p>
            <p className="line-clamp-1 text-[11px] text-slate-400 sm:text-xs">
                {book.author}
            </p>
        </div>
    );
};

const Section = ({
    title,
    items,
}: {
    title: string;
    items: HomeBookCard[];
}) => {
    return (
        <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,21,38,0.78)_0%,rgba(10,14,26,0.72)_100%)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
                    {title}
                </h3>
                <span className="text-xs text-slate-400">{items.length}</span>
            </div>

            {items.length === 0 ? (
                <p className="text-xs text-slate-400 sm:text-sm">
                    No books yet.
                </p>
            ) : (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {items.slice(0, 10).map((book) => (
                        <BookMiniCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

const RecommendationsSidebar = ({ data }: RecommendationsSidebarProps) => {
    return (
        <aside className="col-span-12 space-y-5 md:col-span-6 xl:col-span-3">
            <Section title="Recommended for you" items={data.recommendations} />

            <Section title="Trending now" items={data.trendingBooks} />

            <Section title="New releases" items={data.newReleases} />
        </aside>
    );
};

export default RecommendationsSidebar;