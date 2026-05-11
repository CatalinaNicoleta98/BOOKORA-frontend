import { NavLink } from "react-router-dom";
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
    return (
        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {PRIMARY_NAV_ITEMS.map((item) => {
                if (item.to === APP_ROUTES.browse) {
                    return (
                        <div key={item.to} className="group relative">
                            <NavLink to={item.to} className={navLinkClassName}>
                                <span>{item.label}</span>
                                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-200/0 via-amber-200/80 to-amber-200/0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                            </NavLink>

                            <div className="pointer-events-none absolute left-0 top-[calc(100%+0.9rem)] z-30 w-[26rem] translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
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

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {browseGenresPreview.map((genre) => (
                                            <NavLink
                                                key={genre.slug}
                                                to={buildBrowseGenreRoute(genre.slug)}
                                                className="theme-content-panel-soft rounded-[1.2rem] px-4 py-3 text-sm transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                                            >
                                                <p className="theme-title font-semibold">{genre.title}</p>
                                                <p className="theme-text-muted mt-1 line-clamp-2 text-xs leading-5">
                                                    {genre.description}
                                                </p>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
