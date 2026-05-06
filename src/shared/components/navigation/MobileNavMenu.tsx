import { NavLink, useNavigate } from "react-router-dom";
import { APP_ROUTES, type NavigationItem } from "../../navigation/navigation";
import { getAssetUrl } from "../../api/apiConfig";

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
        "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-medium tracking-[0.02em] transition-all duration-300";

    if (isActive) {
        return `${baseClassName} border-[var(--bookora-border-strong)] bg-[var(--bookora-surface)] text-[var(--bookora-title)] shadow-[0_14px_40px_rgba(15,23,42,0.18)]`;
    }

    return `${baseClassName} border-[var(--bookora-border)] bg-[var(--bookora-surface)] text-[var(--bookora-text-muted)] hover:border-[var(--bookora-border-strong)] hover:bg-[var(--bookora-surface-strong)] hover:text-[var(--bookora-title)]`;
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
    const avatarSource = getAssetUrl(avatarUrl);

    return (
        <div
            className={`overflow-hidden border-t border-[var(--bookora-border)] bg-[var(--bookora-bg-elevated)] backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden ${
                isOpen ? "max-h-[44rem] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-5 sm:px-6">
                <div className="rounded-3xl border border-[var(--bookora-border)] bg-[var(--bookora-surface)] p-3 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            navigate(APP_ROUTES.profile);
                        }}
                        className="group flex w-full items-center gap-3 rounded-2xl px-1 py-1 text-left transition-all duration-300"
                    >
                        {avatarSource ? (
                            <img
                                src={avatarSource}
                                alt={`${userDisplayName} avatar`}
                                className="h-12 w-12 rounded-2xl object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300/80 via-indigo-300/80 to-fuchsia-300/80 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(96,165,250,0.18)]">
                                {userInitials}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[var(--bookora-title)]">{userDisplayName}</p>
                            <p className="truncate text-xs text-[var(--bookora-text-muted)]">View profile</p>
                        </div>

                        <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className="h-4 w-4 shrink-0 text-slate-500 transition-colors duration-300 group-hover:text-slate-300"
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
                    </button>

                    <div className="mt-3 border-t border-white/8 pt-3">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                navigate(APP_ROUTES.search);
                            }}
                            className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[var(--bookora-border)] bg-[var(--bookora-surface)] px-4 text-sm font-medium text-[var(--bookora-text)] transition-all duration-300 hover:border-[var(--bookora-border-strong)] hover:bg-[var(--bookora-surface-strong)] hover:text-[var(--bookora-title)]"
                        >
                            Search books
                        </button>
                    </div>
                </div>

                <nav className="flex flex-col gap-2.5">
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

                <div className="border-t border-[var(--bookora-border)] pt-1">
                    <button
                        type="button"
                        onClick={onLogout}
                        className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[var(--bookora-border)] bg-[var(--bookora-surface)] px-4 text-sm font-medium text-red-400 transition-all duration-300 hover:border-[var(--bookora-border-strong)] hover:bg-[var(--bookora-surface-strong)]"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileNavMenu;
