

import type { BookCoverPanelProps } from "../types/book.types";
import BookRatingStars from "./BookRatingStars";

const BookCoverPanel = ({
    coverUrl,
    title,
    rating,
    onChangeRating,
}: BookCoverPanelProps) => {
    return (
        <aside className="space-y-4">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1020]/80 p-4">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={title}
                        className="h-auto w-full rounded-[1.25rem] object-cover"
                    />
                ) : (
                    <div className="flex h-[420px] items-center justify-center rounded-[1.25rem] border border-dashed border-white/10 bg-[#0f172a]/70 px-6 text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                        No cover available
                    </div>
                )}
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Your rating
                </p>
                <div className="mt-4">
                    <BookRatingStars
                        value={rating}
                        onChange={onChangeRating}
                        size="lg"
                    />
                </div>
                <p className="mt-4 text-sm text-slate-400">
                    {rating
                        ? `Your current Bookora rating: ${rating.toFixed(1)} stars`
                        : "Click left or right side of a star for half or full rating."}
                </p>
            </div>
        </aside>
    );
};

export default BookCoverPanel;