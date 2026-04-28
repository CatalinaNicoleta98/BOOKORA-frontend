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

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {editions.map((edition) => (
                    <article
                        key={edition.id}
                        className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4"
                    >
                        <h3 className="text-sm font-semibold text-slate-100">
                            {edition.format ?? "Edition"}
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
