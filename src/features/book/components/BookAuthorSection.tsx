import { Link } from "react-router-dom";
import { buildAuthorDetailsRoute } from "../../authors/utils/authorRouting";
import { buildBookDetailsRoute } from "../utils/bookRouting";

import type { BookAuthorSectionProps } from "../types/book.types";

const BookAuthorSection = ({ authorDetails }: BookAuthorSectionProps) => {
    if (!authorDetails) {
        return null;
    }

    return (
        <section className="border-t border-white/8 pt-6 sm:pt-7">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Author
                </p>
                <h2 className="text-[1.05rem] font-semibold text-white sm:text-[1.15rem]">
                    About {authorDetails.name}
                </h2>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
                {authorDetails.photoUrl ? (
                    <img
                        src={authorDetails.photoUrl}
                        alt={authorDetails.name}
                        className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10"
                    />
                ) : null}

                <div className="min-w-0 space-y-3">
                    <p className="text-[1.05rem] font-medium text-slate-100">
                        <Link
                            to={buildAuthorDetailsRoute(authorDetails.id)}
                            className="transition-colors hover:text-white"
                        >
                            {authorDetails.name}
                        </Link>
                    </p>

                    {authorDetails.bio ? (
                        <p className="max-w-3xl text-sm leading-7 text-slate-300">
                            {authorDetails.bio}
                        </p>
                    ) : null}

                    {authorDetails.topWorks?.length ? (
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Top works
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {authorDetails.topWorks.map((work) => (
                                    <Link
                                        key={work.id}
                                        to={buildBookDetailsRoute(work.id)}
                                        className="inline-flex items-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.5),rgba(15,23,42,0.24))] px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                        {work.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default BookAuthorSection;
