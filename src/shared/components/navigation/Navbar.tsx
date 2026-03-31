import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface NavbarUser {
    id?: string;
    name?: string;
    email?: string;
    avatarUrl?: string | null;
}

interface NavbarProps {
    user?: NavbarUser | null;
}

interface NavigationItem {
    label: string;
    to: string;
}

const navigationItems: NavigationItem[] = [
    {
        label: "Home",
        to: "/",
    },
    {
        label: "Browse",
        to: "/browse",
    },
    {
        label: "My Library",
        to: "/library",
    },
    {
        label: "Lists",
        to: "/lists",
    },
];

const getInitials = (name?: string) => {
    if (!name) {
        return "BK";
    }

    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

    return initials || "BK";
};

const Navbar = ({ user }: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const userDisplayName = useMemo(() => {
        if (!user?.name) {
            return "Reader";
        }

        return user.name;
    }, [user?.name]);

    const userInitials = useMemo(() => getInitials(user?.name), [user?.name]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((currentValue) => !currentValue);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinkClassName = ({ isActive }: { isActive: boolean }) => {
        const baseClassName =
            "group relative inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium tracking-[0.02em] transition-all duration-300";

        if (isActive) {
            return `${baseClassName} border-amber-200/20 bg-white/12 text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)] backdrop-blur-xl`;
        }

        return `${baseClassName} border-transparent text-slate-300 hover:border-white/10 hover:bg-white/8 hover:text-white`;
    };

    const mobileNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
        const baseClassName =
            "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium tracking-[0.02em] transition-all duration-300";

        if (isActive) {
            return `${baseClassName} border-amber-200/20 bg-white/12 text-white shadow-[0_14px_40px_rgba(15,23,42,0.28)]`;
        }

        return `${baseClassName} border-white/8 bg-white/5 text-slate-300 hover:border-white/12 hover:bg-white/8 hover:text-white`;
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070a12]/72 backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

            <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-3 py-2 transition-all duration-300 hover:border-white/14 hover:bg-white/10"
                    onClick={closeMobileMenu}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200/90 via-orange-300/80 to-rose-300/75 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(251,191,36,0.22)] transition-transform duration-300 group-hover:scale-[1.03]">
                        B
                    </div>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">Bookora</p>
                        <p className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                            Read, track, collect
                        </p>
                    </div>
                </Link>

                <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
                    {navigationItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={navLinkClassName}>
                            <span>{item.label}</span>
                            <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-200/0 via-amber-200/80 to-amber-200/0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto hidden items-center gap-3 lg:flex">
                    <button
                        type="button"
                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/8 bg-white/6 px-4 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/14 hover:bg-white/10 hover:text-white"
                    >
                        Search books
                    </button>

                    <button
                        type="button"
                        className="group inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-3 py-2 text-left transition-all duration-300 hover:border-white/14 hover:bg-white/10"
                    >
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={`${userDisplayName} avatar`}
                                className="h-10 w-10 rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300/80 via-indigo-300/80 to-fuchsia-300/80 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(96,165,250,0.18)]">
                                {userInitials}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">{userDisplayName}</p>
                            <p className="truncate text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                                View profile
                            </p>
                        </div>
                    </button>
                </div>

                <button
                    type="button"
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                    className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-slate-200 transition-all duration-300 hover:border-white/14 hover:bg-white/10 hover:text-white lg:hidden"
                >
                    <div className="relative h-4 w-5">
                        <span
                            className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                                isMobileMenuOpen ? "translate-y-[7px] rotate-45" : "translate-y-0"
                            }`}
                        />
                        <span
                            className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                                isMobileMenuOpen ? "opacity-0" : "opacity-100"
                            }`}
                        />
                        <span
                            className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                                isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : "translate-y-0"
                            }`}
                        />
                    </div>
                </button>
            </div>

            <div
                className={`overflow-hidden border-t border-white/8 bg-[#0b1020]/96 backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden ${
                    isMobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6">
                    <button
                        type="button"
                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/8 bg-white/6 px-4 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/14 hover:bg-white/10 hover:text-white"
                    >
                        Search books
                    </button>

                    <nav className="flex flex-col gap-2">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={mobileNavLinkClassName}
                                onClick={closeMobileMenu}
                            >
                                <span>{item.label}</span>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                    className="h-4 w-4 text-slate-500 transition-colors duration-300"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.5 4.16669L13.3333 10L7.5 15.8334"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        type="button"
                        className="group inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-3 py-3 text-left transition-all duration-300 hover:border-white/14 hover:bg-white/10"
                    >
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={`${userDisplayName} avatar`}
                                className="h-11 w-11 rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300/80 via-indigo-300/80 to-fuchsia-300/80 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(96,165,250,0.18)]">
                                {userInitials}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">{userDisplayName}</p>
                            <p className="truncate text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                                Open profile
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
