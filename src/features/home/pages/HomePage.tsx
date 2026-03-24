import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

const HomePage = () => {
    const navigate = useNavigate();
    const { state, logout } = useAuth();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const firstName = useMemo(() => {
        if (!state.user?.name) {
            return "Reader";
        }

        return state.user.name.split(" ")[0];
    }, [state.user?.name]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.18),_transparent_24%),radial-gradient(circle_at_86%_16%,_rgba(244,208,140,0.12),_transparent_18%),linear-gradient(180deg,_#0b1020_0%,_#090d18_42%,_#060811_100%)]" />
            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.18)_0.7px,transparent_0.7px)] [background-size:30px_30px]" />
            <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(255,255,255,0.36)_1.1px,transparent_1.1px)] [background-size:150px_150px] animate-[pulse_12s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_18%,transparent_38%)] animate-[pulse_14s_ease-in-out_infinite]" />
            <div className="absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl animate-[pulse_16s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-amber-300/10 blur-3xl animate-[pulse_18s_ease-in-out_infinite]" />

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
                <header className="relative z-30 rounded-[1.75rem] border border-white/10 bg-white/[0.025] px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-semibold text-amber-100 shadow-inner shadow-white/10">
                                B
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Bookora</p>
                                <p className="mt-1 text-sm text-slate-300">Your personal reading sanctuary</p>
                            </div>
                        </div>

                        <nav className="relative z-40 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-4">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(255,255,255,0.04)] transition hover:border-white/15 hover:bg-white/[0.1]"
                                >
                                    Home
                                </button>
                                <button
                                    type="button"
                                    className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                                >
                                    Library
                                </button>
                                <button
                                    type="button"
                                    className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                                >
                                    Goals
                                </button>
                                <button
                                    type="button"
                                    className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                                >
                                    Discover
                                </button>
                            </div>

                            <div className="relative z-50">
                                <button
                                    type="button"
                                    onClick={() => setIsProfileMenuOpen((currentValue) => !currentValue)}
                                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-left transition hover:border-white/12 hover:bg-white/[0.06]"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)] text-sm font-semibold text-slate-950">
                                        {firstName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{state.user?.name ?? "Guest user"}</p>
                                        <p className="text-xs text-slate-400">Profile</p>
                                    </div>
                                </button>

                                {isProfileMenuOpen ? (
                                    <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[70] w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#11182b]/92 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                                        <button
                                            type="button"
                                            className="flex w-full items-center rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
                                        >
                                            Visit profile
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex w-full items-center rounded-xl px-4 py-3 text-sm text-rose-100 transition hover:bg-rose-400/10 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="relative z-0 flex-1 py-6 lg:py-8">
                    <section className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02] shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
                        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-10 xl:px-10">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-100/8 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-100/80">
                                    Welcome back
                                </div>

                                <div className="space-y-4">
                                    <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-[3.4rem] xl:text-[4.25rem]">
                                        {state.user
                                            ? `${firstName}, your next great reading journey starts here.`
                                            : "Your next great reading journey starts here."}
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                                        Keep your reading and listening life in one elegant place, from shelves and reviews to
                                        goals, notes, and beautifully tracked progress.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        className="rounded-2xl bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(187,163,255,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_18px_45px_rgba(187,163,255,0.24)]"
                                    >
                                        Explore books
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
                                    >
                                        Open my library
                                    </button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <article className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/12 hover:bg-white/[0.04]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current focus</p>
                                        <p className="mt-4 text-2xl font-semibold text-white">2 books</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Continue your active reads and listens from one calm dashboard.
                                        </p>
                                    </article>

                                    <article className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/12 hover:bg-white/[0.04]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Yearly goal</p>
                                        <p className="mt-4 text-2xl font-semibold text-white">32 / 50</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Stay on track with reading goals that feel motivating, not overwhelming.
                                        </p>
                                    </article>

                                    <article className="rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/12 hover:bg-white/[0.04]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Latest review</p>
                                        <p className="mt-4 text-2xl font-semibold text-white">4.5 stars</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Capture thoughts, notes, and ratings in a space made for readers.
                                        </p>
                                    </article>
                                </div>
                            </div>

                            <aside className="space-y-4">
                                <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.025] p-6 backdrop-blur-xl">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Your profile</p>
                                    <div className="mt-5 flex items-start gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f1dfb1_0%,#d8c494_48%,#bba3ff_100%)] text-lg font-semibold text-slate-950">
                                            {firstName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-white">{state.user?.name ?? "Guest user"}</p>
                                            <p className="mt-1 text-sm text-slate-300">{state.user?.email ?? "No active user loaded"}</p>
                                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                                Your profile space will soon hold shelves, reading stats, public reviews, and
                                                personal reading identity.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.025] p-6 backdrop-blur-xl">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">What comes next</p>
                                    <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                                        <li className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                                            Browse books with real external API data
                                        </li>
                                        <li className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                                            Build your library and manage statuses
                                        </li>
                                        <li className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                                            Add ratings, reviews, notes, and goals
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </section>
                </main>

                <footer className="mt-2 border-t border-white/8 px-2 py-6 text-center text-sm text-slate-400">
                    © 2026 Bookora. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default HomePage;