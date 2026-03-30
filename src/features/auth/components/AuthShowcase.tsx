

const AuthShowcase = () => {
    return (
        <section className="relative hidden min-h-[820px] overflow-hidden border-r border-white/10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(180deg,_rgba(13,18,34,0.65)_0%,_rgba(9,11,20,0.82)_100%)]" />

            <div className="absolute inset-x-10 top-10 flex items-center justify-between xl:inset-x-12 xl:top-12">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-semibold text-amber-100 shadow-inner shadow-white/10">
                        B
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Bookora</p>
                        <p className="text-sm text-slate-300">Personal reading sanctuary</p>
                    </div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-md">
                    Build your library
                </div>
            </div>

            <div className="relative flex h-full flex-col justify-between px-10 pb-10 pt-36 xl:px-14 xl:pb-14 xl:pt-40">
                <div className="max-w-2xl space-y-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-100/8 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-100/80">
                        Begin your reading world
                    </div>

                    <div className="space-y-7">
                        <h1 className="max-w-2xl text-[3.6rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white xl:text-[4.5rem]">
                            Create a home for every book, review, note, and goal you want to keep.
                        </h1>

                        <p className="max-w-xl text-lg leading-8 text-slate-300/90 xl:max-w-xl">
                            Build your library beautifully, track reading and listening separately, and keep your shelves and progress in one elegant place.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 pt-4 xl:grid-cols-3">
                    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Track richly</p>
                        <p className="mt-4 text-lg font-medium text-white">Reading and listening</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Keep physical books, ebooks, and audiobooks organized without losing the nuance of each format.
                        </p>
                    </article>

                    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Review beautifully</p>
                        <p className="mt-4 text-lg font-medium text-white">Notes and half-stars</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Capture your thoughts with refined reviews, notes, and flexible ratings that feel made for readers.
                        </p>
                    </article>

                    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07]">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Grow with goals</p>
                        <p className="mt-4 text-lg font-medium text-white">Progress with clarity</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Follow yearly goals, shelves, and personal reading momentum with a calmer, more curated experience.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default AuthShowcase;