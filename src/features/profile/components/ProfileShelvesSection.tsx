
import type { ProfileShelfItem } from "../types/profile.types";

interface ProfileShelvesSectionProps {
    shelves: ProfileShelfItem[];
    onManageShelves: () => void;
    onOpenBook: (bookId: string) => void;
}

const ProfileShelvesSection = ({
    shelves,
    onManageShelves,
    onOpenBook
}: ProfileShelvesSectionProps) => {
    return (
        <section className="theme-glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="theme-eyebrow">
                        Featured shelves
                    </p>
                    <h2 className="theme-title mt-2 text-2xl font-semibold">A quick look into your reading moods</h2>
                </div>
                <button
                    type="button"
                    onClick={onManageShelves}
                    className="theme-accent-text self-start text-sm font-medium transition-colors duration-300 hover:text-[var(--bookora-title)]"
                >
                    Browse library
                </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
                {shelves.map((shelf) => (
                    <article
                        key={shelf.id}
                        id={shelf.id}
                        className="theme-content-panel-soft flex h-full min-h-[20rem] flex-col rounded-[1.6rem] p-5 sm:p-6"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="theme-title max-w-[12rem] text-[1.4rem] font-semibold leading-tight sm:text-[1.55rem]">
                                    {shelf.name}
                                </h3>
                                <p className="theme-text-muted mt-3 max-w-[28rem] text-sm leading-6 sm:leading-7">
                                    {shelf.description}
                                </p>
                            </div>
                            <span className="theme-pill-subtle shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                                {shelf.count} books
                            </span>
                        </div>

                        {shelf.previewBooks.length > 0 ? (
                            <div className="mt-6">
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {shelf.previewBooks.map((book) => (
                                        <button
                                            key={book.id}
                                            type="button"
                                            onClick={() => onOpenBook(book.id)}
                                            className="group flex min-w-0 flex-col gap-2 text-left"
                                            aria-label={`Open ${book.title}`}
                                            title={book.title}
                                        >
                                            <div className="theme-cover-shell aspect-[2/3] w-full overflow-hidden rounded-[1rem] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--bookora-border-strong)]">
                                                {book.coverUrl ? (
                                                    <img
                                                        src={book.coverUrl}
                                                        alt={book.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                                        {book.title}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="theme-text-muted line-clamp-2 text-xs leading-5">
                                                {book.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="theme-content-panel-muted mt-6 rounded-[1rem] border-dashed px-4 py-3 text-sm text-slate-500">
                                Nothing shelved here yet.
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
};

export type { ProfileShelvesSectionProps };
export default ProfileShelvesSection;
