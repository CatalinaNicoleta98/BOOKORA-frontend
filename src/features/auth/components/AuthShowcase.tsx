
import BookoraBrand from "../../../shared/components/branding/BookoraBrand";

const AuthShowcase = () => {
    return (
        <section className="relative hidden min-h-[820px] overflow-hidden border-r border-white/10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(180deg,_rgba(13,18,34,0.65)_0%,_rgba(9,11,20,0.82)_100%)]" />

            <div className="absolute inset-x-10 top-10 flex items-center justify-between xl:inset-x-12 xl:top-12">
                <BookoraBrand tagline="Personal reading sanctuary" />

                <div className="rounded-full border border-[var(--bookora-border)] bg-[var(--bookora-surface)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--bookora-text-soft)] shadow-[0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-md">
                    Build your library
                </div>
            </div>

            <div className="relative flex h-full flex-col justify-between px-10 pb-10 pt-36 xl:px-14 xl:pb-14 xl:pt-40">
                <div className="max-w-2xl space-y-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--bookora-border)] bg-[var(--bookora-surface)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--bookora-accent)]">
                        Begin your reading world
                    </div>

                    <div className="space-y-7">
                        <h1 className="theme-title max-w-2xl text-[3.6rem] font-semibold leading-[0.98] tracking-[-0.05em] xl:text-[4.5rem]">
                            Create a home for every book, review, note, and goal you want to keep.
                        </h1>

                        <p className="theme-text-soft max-w-xl text-lg leading-8 xl:max-w-xl">
                            Build your library beautifully, track reading and listening separately, and keep your shelves and progress in one elegant place.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 pt-4 xl:grid-cols-3">
                    <article className="theme-soft-panel rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1">
                        <p className="theme-eyebrow">Track richly</p>
                        <p className="theme-title mt-4 text-lg font-medium">Reading and listening</p>
                        <p className="theme-text-soft mt-2 text-sm leading-6">
                            Keep physical books, ebooks, and audiobooks organized without losing the nuance of each format.
                        </p>
                    </article>

                    <article className="theme-soft-panel rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1">
                        <p className="theme-eyebrow">Review beautifully</p>
                        <p className="theme-title mt-4 text-lg font-medium">Notes and half-stars</p>
                        <p className="theme-text-soft mt-2 text-sm leading-6">
                            Capture your thoughts with refined reviews, notes, and flexible ratings that feel made for readers.
                        </p>
                    </article>

                    <article className="theme-soft-panel rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1">
                        <p className="theme-eyebrow">Grow with goals</p>
                        <p className="theme-title mt-4 text-lg font-medium">Progress with clarity</p>
                        <p className="theme-text-soft mt-2 text-sm leading-6">
                            Follow yearly goals, shelves, and personal reading momentum with a calmer, more curated experience.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default AuthShowcase;
