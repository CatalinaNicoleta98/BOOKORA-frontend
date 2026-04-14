import type { BookCoverPanelProps } from "../types/book.types";
import BookRatingStars from "./BookRatingStars";

const BookCoverPanel = ({
    coverUrl,
    title,
    rating,
    onChangeRating,
}: BookCoverPanelProps) => {
    return (
        <aside className="space-y-5">
            <div className="group relative isolate">
                <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.16),_transparent_42%)] opacity-80 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative overflow-visible rounded-[2rem] p-1">
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    {coverUrl ? (
                        <div className="relative [perspective:1400px]">
                            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0f172a] shadow-[0_18px_40px_rgba(15,23,42,0.45)] transition-all duration-500 [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:rotate-y-[-10deg] group-hover:rotate-x-[5deg] group-hover:shadow-[0_30px_80px_rgba(15,23,42,0.68)]">
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-white/18 via-white/7 to-transparent opacity-80" />
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-white/12 to-transparent" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-black/18 to-transparent opacity-70" />

                                <img
                                    src={coverUrl}
                                    alt={title}
                                    className="h-auto w-full object-cover"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#0f172a]/80 px-6 text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500 shadow-[0_18px_40px_rgba(15,23,42,0.35)]">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.12),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.1),_transparent_45%)]" />
                            <span className="relative">No cover available</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.22)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Your rating
                </p>
                <div className="mt-4">
                    <BookRatingStars value={rating} onChange={onChangeRating} size="lg" />
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