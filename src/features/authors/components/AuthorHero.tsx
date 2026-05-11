import type { AuthorDetailsViewModel } from "../types/author.types";

interface AuthorHeroProps {
    author: AuthorDetailsViewModel;
}

const AuthorHero = ({ author }: AuthorHeroProps) => {
    const lifeDates = [author.birthDate, author.deathDate].filter(Boolean).join(" - ");

    return (
        <section className="theme-glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_45%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_36%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                <div className="theme-cover-shell mx-auto w-full max-w-[220px] overflow-hidden rounded-[1.75rem] shadow-[0_24px_50px_rgba(15,23,42,0.2)]">
                    {author.photoUrl ? (
                        <img
                            src={author.photoUrl}
                            alt={author.name}
                            className="aspect-[4/5] w-full object-cover"
                        />
                    ) : (
                        <div className="theme-text-muted flex aspect-[4/5] w-full items-center justify-center px-6 text-center text-sm font-semibold uppercase tracking-[0.22em]">
                            Author profile
                        </div>
                    )}
                </div>

                <div className="min-w-0 space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <p className="theme-accent-text text-sm font-semibold uppercase tracking-[0.22em]">
                                Author profile
                            </p>
                            {lifeDates ? (
                                <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    {lifeDates}
                                </span>
                            ) : null}
                        </div>

                        <div className="space-y-3">
                            <h1 className="theme-title font-serif text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.03em] sm:text-[3.3rem]">
                                {author.name}
                            </h1>
                            <p className="theme-text-soft max-w-3xl text-sm leading-7 sm:text-[15px]">
                                {author.bio ??
                                    "Biography details are not available for this author yet, but you can still explore their books, series, and subjects below."}
                            </p>
                        </div>
                    </div>

                    {author.topSubjects.length ? (
                        <div className="theme-content-panel-soft rounded-[1.5rem] p-4 sm:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                                        Signature subjects
                                    </p>
                                    <p className="theme-text-soft mt-2 text-sm">
                                        Themes and areas that show up most often in this author's catalog.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2.5">
                                {author.topSubjects.map((subject) => (
                                    <span
                                        key={subject}
                                        className="theme-pill-subtle rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
                                    >
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {(author.links.openLibrary || author.links.wikipedia) ? (
                        <div className="flex flex-wrap gap-3">
                            {author.links.openLibrary ? (
                                <a
                                    href={author.links.openLibrary}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="theme-button-primary inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium"
                                >
                                    Open Library
                                </a>
                            ) : null}
                            {author.links.wikipedia ? (
                                <a
                                    href={author.links.wikipedia}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium"
                                >
                                    Wikipedia
                                </a>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default AuthorHero;
