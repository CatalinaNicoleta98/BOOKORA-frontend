import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BROWSE_GENRES } from "../../../features/browse/utils/browseGenres";
import { buildBrowseGenreRoute } from "../../../features/browse/utils/browseRouting";
import { APP_ROUTES, PRIMARY_NAV_ITEMS } from "../../navigation/navigation";

const navLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClassName =
        "group relative inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium tracking-[0.02em] transition-all duration-300";

    if (isActive) {
        return `${baseClassName} border-[var(--bookora-border-strong)] bg-[var(--bookora-surface)] text-[var(--bookora-title)] shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl`;
    }

    return `${baseClassName} border-transparent text-[var(--bookora-text-muted)] hover:border-[var(--bookora-border)] hover:bg-[var(--bookora-surface)] hover:text-[var(--bookora-title)]`;
};

const browseGenresPreview = BROWSE_GENRES.slice(0, 6);

const DesktopNavLinks = () => {
    const location = useLocation();
    const browseMenuRef = useRef<HTMLDivElement | null>(null);
    const [isBrowseMenuOpen, setIsBrowseMenuOpen] = useState(false);
    const isBrowseActive = location.pathname === APP_ROUTES.browse || location.pathname.startsWith("/browse/");

    useEffect(() => {
        setIsBrowseMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isBrowseMenuOpen) {
            return;
        }

        const handlePointerDown = (event: MouseEvent) => {
            if (!browseMenuRef.current?.contains(event.target as Node)) {
                setIsBrowseMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsBrowseMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isBrowseMenuOpen]);

    return (
        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {PRIMARY_NAV_ITEMS.map((item) => {
                if (item.to === APP_ROUTES.browse) {
                    return (
                        <div key={item.to} ref={browseMenuRef} className="relative">
                            <button
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={isBrowseMenuOpen}
                                onClick={() => setIsBrowseMenuOpen((currentValue) => !currentValue)}
                                className={navLinkClassName({ isActive: isBrowseActive })}
                            >
                                <span>{item.label}</span>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${isBrowseMenuOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 7.5L10 12.5L15 7.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className={`absolute inset-x-3 bottom-1 h-px origin-left bg-gradient-to-r from-amber-200/0 via-amber-200/80 to-amber-200/0 transition-all duration-300 ${isBrowseMenuOpen || isBrowseActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} />
                            </button>

                            {isBrowseMenuOpen ? (
                                <div className="absolute left-0 top-[calc(100%+0.9rem)] z-30 w-[26rem]">
                                    <div className="theme-glass-panel rounded-[1.8rem] p-3 shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
                                    <div className="px-3 py-2">
                                        <p className="theme-eyebrow">Browse</p>
                                        <p className="theme-title mt-2 text-lg font-semibold">
                                            Explore by genre
                                        </p>
                                        <p className="theme-text-soft mt-2 text-sm leading-6">
                                            Jump into a few popular shelves from the new browse experience.
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <Link
                                            to={APP_ROUTES.browse}
                                            className="theme-content-panel-soft block rounded-[1.2rem] px-4 py-3 text-sm transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                                        >
                                            <p className="theme-title font-semibold">All genres</p>
                                            <p className="theme-text-muted mt-1 text-xs leading-5">
                                                Open the full browse page and explore every category.
                                            </p>
                                        </Link>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {browseGenresPreview.map((genre) => (
                                            <Link
                                                key={genre.slug}
                                                to={buildBrowseGenreRoute(genre.slug)}
                                                className="theme-content-panel-soft rounded-[1.2rem] px-4 py-3 text-sm transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                                            >
                                                <p className="theme-title font-semibold">{genre.title}</p>
                                                <p className="theme-text-muted mt-1 line-clamp-2 text-xs leading-5">
                                                    {genre.description}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                </div>
                            ) : null}
                        </div>
                    );
                }

                return (
                    <NavLink key={item.to} to={item.to} className={navLinkClassName}>
                        <span>{item.label}</span>
                        <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-200/0 via-amber-200/80 to-amber-200/0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default DesktopNavLinks;
