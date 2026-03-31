

import { NavLink } from "react-router-dom";

interface NavigationItem {
    label: string;
    to: string;
}

const navigationItems: NavigationItem[] = [
    { label: "Home", to: "/" },
    { label: "Browse", to: "/browse" },
    { label: "My Library", to: "/library" },
    { label: "Lists", to: "/lists" },
];

const navLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClassName =
        "group relative inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium tracking-[0.02em] transition-all duration-300";

    if (isActive) {
        return `${baseClassName} border-amber-200/20 bg-white/12 text-white shadow-[0_10px_30px_rgba(15,23,42,0.28)] backdrop-blur-xl`;
    }

    return `${baseClassName} border-transparent text-slate-300 hover:border-white/10 hover:bg-white/8 hover:text-white`;
};

const DesktopNavLinks = () => {
    return (
        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {navigationItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClassName}>
                    <span>{item.label}</span>
                    <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-200/0 via-amber-200/80 to-amber-200/0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                </NavLink>
            ))}
        </nav>
    );
};

export default DesktopNavLinks;