import type { AuthorDetailsViewModel } from "../types/author.types";

interface AuthorHeroProps {
    author: AuthorDetailsViewModel;
}

const AuthorHero = ({ author }: AuthorHeroProps) => {
    const lifeDates = [author.birthDate, author.deathDate].filter(Boolean).join(" - ");

    return (
        <section className="theme-glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                <div className="theme-cover-shell mx-auto w-full max-w-[220px] overflow-hidden rounded-[1.75rem]">
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

                <div className="min-w-0 space-y-5">
                    <div className="space-y-3">
                        <p className="theme-accent-text text-sm font-semibold uppercase tracking-[0.22em]">
                            Author profile
                        </p>
                        <h1 className="theme-title font-serif text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-[3.1rem]">
                            {author.name}
                        </h1>
                        {lifeDates ? (
                            <p className="theme-text-soft text-base sm:text-lg">{lifeDates}</p>
                        ) : null}
                    </div>

                    {author.bio ? (
                        <p className="theme-text-soft max-w-4xl text-sm leading-7 sm:text-[15px]">
                            {author.bio}
                        </p>
                    ) : (
                        <p className="theme-text-muted text-sm">
                            Biography details are not available for this author yet.
                        </p>
                    )}

                    {author.topSubjects.length ? (
                        <div className="flex flex-wrap gap-2.5">
                            {author.topSubjects.map((subject) => (
                                <span
                                    key={subject}
                                    className="theme-pill-subtle rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
                                >
                                    {subject}
                                </span>
                            ))}
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
