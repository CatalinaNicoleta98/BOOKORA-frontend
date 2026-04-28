import type { BookEditionsSectionProps } from "../types/book.types";

const BookEditionsSection = ({ editions }: BookEditionsSectionProps) => {
    if (!editions?.length) {
        return null;
    }

    return (
        <section className="border-t border-white/8 pt-6 sm:pt-7">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    More editions
                </p>
                <h2 className="text-[1.05rem] font-semibold text-white sm:text-[1.15rem]">
                    Other available editions
                </h2>
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
                {editions.map((edition) => (
                    <article
                        key={edition.id}
                        className="w-56 shrink-0 rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.52),rgba(15,23,42,0.28))] p-4"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Edition
                        </p>

                        <h3 className="mt-2 text-sm font-semibold text-slate-100">
                            {edition.format ?? "Unknown format"}
                        </h3>

                        <div className="mt-2 space-y-1 text-sm text-slate-300">
                            {edition.publishDate ? <p>{edition.publishDate}</p> : null}
                            {edition.publisher ? <p>{edition.publisher}</p> : null}
                            {edition.language ? <p>{edition.language}</p> : null}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BookEditionsSection;
