

import type { BookHeroProps } from "../types/book.types";

const BookHero = ({ title, authorLabel }: BookHeroProps) => {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/80">
                    Bookora book profile
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl">
                    {title}
                </h1>
                <p className="mt-3 text-lg font-medium text-slate-300 sm:text-xl">
                    by {authorLabel}
                </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1020]/70 px-5 py-4 text-sm text-slate-300">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Community rating
                </p>
                <div className="mt-3 flex items-center gap-3">
                    <span className="text-2xl font-semibold text-amber-300">★ 4.5</span>
                    <span className="text-sm text-slate-400">12.4k ratings · 41.8k readers</span>
                </div>
            </div>
        </div>
    );
};

export default BookHero;