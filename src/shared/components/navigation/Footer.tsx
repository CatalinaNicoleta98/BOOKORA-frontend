

import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-16 border-t border-white/8 bg-[#070a12]/80 backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

            <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200/90 via-orange-300/80 to-rose-300/75 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(251,191,36,0.22)]">
                                B
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">Bookora</p>
                                <p className="text-xs text-slate-400">Read, track, collect</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400">
                            Your personal reading universe. Track books, discover stories, and build your own library across formats.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Navigation
                        </p>

                        <Link to="/" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/browse" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                            Browse
                        </Link>
                        <Link to="/library" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                            My Library
                        </Link>
                        <Link to="/lists" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                            Lists
                        </Link>
                    </div>

                    {/* Future / Placeholder */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            About
                        </p>

                        <p className="text-sm text-slate-400">
                            Built with a focus on modern reading habits, including audiobooks, ebooks, and community-driven content.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
                    <p>© {currentYear} Bookora. All rights reserved.</p>

                    <div className="flex items-center gap-4">
                        <span className="hover:text-white transition-colors duration-200 cursor-pointer">
                            Privacy
                        </span>
                        <span className="hover:text-white transition-colors duration-200 cursor-pointer">
                            Terms
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;