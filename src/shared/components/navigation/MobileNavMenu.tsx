import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
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
        "flex items-center justify-between rounded-[1.35rem] border px-4 py-3.5 text-sm font-medium tracking-[0.02em] transition-all duration-300";

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
    const portalRoot = useMemo(() => {
        if (typeof document === "undefined") {
            return null;
        }

        return document.body;
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    const menu = (
        <div
            className={`fixed inset-0 z-[70] lg:hidden ${
                isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
            <button
                type="button"
                aria-label="Close navigation menu"
                onClick={onClose}
                className={`absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            />

            <aside
                className={`absolute right-0 top-0 flex h-full w-[min(88vw,23rem)] flex-col border-l border-[var(--bookora-border)] bg-[var(--bookora-bg-elevated)] shadow-[0_24px_80px_rgba(15,23,42,0.34)] backdrop-blur-2xl transition-transform duration-300 ease-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-label="Mobile navigation"
            >
                <div className="flex items-center justify-between border-b border-[var(--bookora-border)] px-5 py-4">
                    <div>
                        <p className="theme-eyebrow">Navigation</p>
                        <p className="theme-title mt-2 text-lg font-semibold">Bookora menu</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="theme-button-ghost inline-flex h-11 w-11 items-center justify-center rounded-full"
                        aria-label="Close menu"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className="h-4 w-4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 5L15 15M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-5">
                    <div className="theme-content-panel rounded-[1.6rem] p-3.5">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                navigate(APP_ROUTES.profile);
                            }}
                            className="group flex w-full items-center gap-3 rounded-[1.2rem] px-1 py-1 text-left transition-all duration-300"
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
                                <p className="truncate text-xs text-[var(--bookora-text-muted)]">Open profile</p>
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
                    </div>

                    <div className="mt-5">
                        <p className="theme-text-muted px-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                            Go to
                        </p>
                    </div>

                    <nav className="mt-3 flex flex-col gap-2.5">
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
                </div>

                <div className="border-t border-[var(--bookora-border)] bg-[var(--bookora-surface-muted)] px-4 py-4">
                    <button
                        type="button"
                        onClick={onLogout}
                        className="inline-flex h-12 w-full items-center justify-center rounded-[1.35rem] border border-[var(--bookora-border)] bg-[var(--bookora-surface)] px-4 text-sm font-medium text-red-400 transition-all duration-300 hover:border-[var(--bookora-border-strong)] hover:bg-[var(--bookora-surface-strong)]"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </div>
    );

    return portalRoot ? createPortal(menu, portalRoot) : menu;
};

export default MobileNavMenu;
