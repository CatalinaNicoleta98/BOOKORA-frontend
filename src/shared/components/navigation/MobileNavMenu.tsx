

import { NavLink, useNavigate } from "react-router-dom";

interface NavigationItem {
    label: string;
    to: string;
}

interface MobileNavMenuProps {
    isOpen: boolean;
    navigationItems: NavigationItem[];
    onClose: () => void;
    onLogout: () => void;
    userDisplayName: string;
    userInitials: string;
    avatarUrl?: string | null;
}

const mobileNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClassName =
        "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium tracking-[0.02em] transition-all duration-300";

    if (isActive) {
        return `${baseClassName} border-amber-200/20 bg-white/12 text-white shadow-[0_14px_40px_rgba(15,23,42,0.28)]`;
    }

    return `${baseClassName} border-white/8 bg-white/5 text-slate-300 hover:border-white/12 hover:bg-white/8 hover:text-white`;
};

const MobileNavMenu = ({
    isOpen,
    navigationItems,
    onClose,
    onLogout,
    userDisplayName,
    userInitials,
    avatarUrl,
}: MobileNavMenuProps) => {
    const navigate = useNavigate();

    return (
        <div
            className={`overflow-hidden border-t border-white/8 bg-[#0b1020]/96 backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden ${
                isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
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
                            onClick={onClose}
                        >
                            <span>{item.label}</span>
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                className="h-4 w-4 text-slate-500"
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
                    onClick={() => {
                        onClose();
                        navigate("/profile");
                    }}
                    className="group inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-3 py-3 text-left transition-all duration-300 hover:border-white/14 hover:bg-white/10"
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
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
                        <p className="truncate text-xs text-slate-400">Open profile</p>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/8 bg-white/6 px-4 text-sm font-medium text-red-300 transition-all duration-300 hover:border-white/14 hover:bg-white/10"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MobileNavMenu;