import { Link } from "react-router-dom";

import type { SimilarBooksSectionProps } from "../types/book.types";

const SimilarBooksSection = ({ books }: SimilarBooksSectionProps) => {
    if (!books?.length) {
        return null;
    }

    return (
        <section className="border-t border-white/8 pt-6 sm:pt-7">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Similar books
                </p>
                <h2 className="text-[1.05rem] font-semibold text-white sm:text-[1.15rem]">
                    Readers also enjoyed
                </h2>
            </div>

            <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
                {books.map((book) => (
                    <Link
                        key={book.id}
                        to={`/books/${encodeURIComponent(book.id)}`}
                        className="w-40 shrink-0 space-y-3 rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.52),rgba(15,23,42,0.24))] p-3 transition-colors hover:bg-white/10"
                    >
                        {book.coverUrl ? (
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="aspect-[3/4] w-full rounded-[0.9rem] object-cover shadow-[0_14px_28px_rgba(2,6,23,0.28)]"
                            />
                        ) : (
                            <div className="flex aspect-[3/4] w-full items-center justify-center rounded-[0.9rem] bg-slate-900/80 px-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                                No cover
                            </div>
                        )}

                        <div className="space-y-1">
                            <h3 className="line-clamp-2 text-sm font-semibold text-slate-100">
                                {book.title}
                            </h3>
                            {book.authors?.length ? (
                                <p className="line-clamp-2 text-sm text-slate-400">
                                    {book.authors.join(", ")}
                                </p>
                            ) : null}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SimilarBooksSection;
