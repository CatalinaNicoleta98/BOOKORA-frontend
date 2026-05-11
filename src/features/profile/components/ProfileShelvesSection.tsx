
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
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="theme-eyebrow">
                        Featured shelves
                    </p>
                    <h2 className="theme-title mt-2 text-2xl font-semibold">A quick look into your reading moods</h2>
                </div>
                <button
                    type="button"
                    onClick={onManageShelves}
                    className="theme-accent-text text-sm font-medium transition-colors duration-300 hover:text-[var(--bookora-title)]"
                >
                    Browse library
                </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
                {shelves.map((shelf) => (
                    <article
                        key={shelf.id}
                        id={shelf.id}
                        className="theme-content-panel-soft flex h-full min-h-[18rem] flex-col rounded-[1.6rem] p-5"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="theme-title max-w-[14rem] text-[1.55rem] font-semibold leading-tight">
                                    {shelf.name}
                                </h3>
                                <p className="theme-text-muted mt-3 max-w-md text-sm leading-7">{shelf.description}</p>
                            </div>
                            <span className="theme-pill-subtle shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                                {shelf.count} books
                            </span>
                        </div>

                        {shelf.previewBooks.length > 0 ? (
                            <div className="mt-auto pt-6">
                                <div className="flex flex-wrap gap-3">
                                {shelf.previewBooks.map((book) => (
                                    <button
                                        key={book.id}
                                        type="button"
                                        onClick={() => onOpenBook(book.id)}
                                        className="theme-cover-shell group h-24 w-16 overflow-hidden rounded-[0.9rem] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--bookora-border-strong)]"
                                        aria-label={`Open ${book.title}`}
                                        title={book.title}
                                    >
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
                                    </button>
                                ))}
                                </div>
                            </div>
                        ) : (
                            <div className="theme-content-panel-muted mt-auto rounded-[1rem] border-dashed px-4 py-3 text-sm text-slate-500">
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
