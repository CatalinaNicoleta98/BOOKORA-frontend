

export interface ProfileShelfItem {
    id: string;
    name: string;
    count: number;
    description: string;
}

interface ProfileShelvesSectionProps {
    shelves: ProfileShelfItem[];
}

const ProfileShelvesSection = ({ shelves }: ProfileShelvesSectionProps) => {
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
                    className="text-sm font-medium text-amber-100 transition-colors duration-300 hover:text-amber-50"
                >
                    Manage shelves
                </button>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {shelves.map((shelf) => (
                    <article
                        key={shelf.id}
                        className="rounded-[1.6rem] border border-white/10 bg-[#0b1020]/76 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.24)]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{shelf.name}</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-400">{shelf.description}</p>
                            </div>
                            <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                                {shelf.count} books
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export type { ProfileShelvesSectionProps };
export default ProfileShelvesSection;