

import type { BookCoverPanelProps } from "../types/book.types";

const BookCoverPanel = ({
    coverUrl,
    title,
    ratingOptions,
    selectedRating,
    onSelectRating,
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
                <div className="mt-4 grid grid-cols-5 gap-2">
                    {ratingOptions.map((ratingOption) => {
                        const isActive = selectedRating === ratingOption;

                        return (
                            <button
                                key={ratingOption}
                                type="button"
                                onClick={() => onSelectRating(ratingOption)}
                                className={`inline-flex h-11 items-center justify-center rounded-2xl border text-sm font-medium transition-all duration-300 ${
                                    isActive
                                        ? "border-amber-200/30 bg-amber-200/12 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/16 hover:bg-white/10"
                                }`}
                            >
                                {ratingOption.toFixed(1)}
                            </button>
                        );
                    })}
                </div>
                <p className="mt-4 text-sm text-slate-400">
                    {selectedRating
                        ? `Your current Bookora rating: ${selectedRating.toFixed(1)} stars`
                        : "Choose a rating in 0.5 star steps."}
                </p>
            </div>
        </aside>
    );
};

export default BookCoverPanel;