
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
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                        Featured shelves
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">A quick look into your reading moods</h2>
                </div>
                <button
                    type="button"
                    onClick={onManageShelves}
                    className="text-sm font-medium text-amber-100 transition-colors duration-300 hover:text-amber-50"
                >
                    Browse library
                </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
                {shelves.map((shelf) => (
                    <article
                        key={shelf.id}
                        className="flex h-full min-h-[18rem] flex-col rounded-[1.6rem] border border-white/10 bg-[#0b1020]/76 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.24)]"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="max-w-[14rem] text-[1.55rem] font-semibold leading-tight text-white">
                                    {shelf.name}
                                </h3>
                                <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">{shelf.description}</p>
                            </div>
                            <span className="shrink-0 rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
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
                                        className="group h-24 w-16 overflow-hidden rounded-[0.9rem] border border-white/10 bg-white/6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/16"
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
                            <div className="mt-auto rounded-[1rem] border border-dashed border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-500">
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
