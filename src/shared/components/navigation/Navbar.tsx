import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "../../../features/search/components/NavbarSearch";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { authStorage } from "../../../features/auth/services/authStorage";
import NavLogo from "./NavLogo";
import DesktopNavLinks from "./DesktopNavLinks";
import ProfileMenu from "./ProfileMenu";
import MobileNavMenu from "./MobileNavMenu";

interface NavbarUser {
    id?: string;
    name?: string;
    email?: string;
    avatarUrl?: string | null;
}

interface NavbarProps {
    user?: NavbarUser | null;
}

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

const Navbar = (_props: NavbarProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { state, logout } = useAuth();

    const userDisplayName = useMemo(() => {
        if (!state.user?.name) {
            return "Reader";
        }

        return state.user.name;
    }, [state.user?.name]);

    const userInitials = useMemo(() => getInitials(state.user?.name), [state.user?.name]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((currentValue) => !currentValue);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        authStorage.removeToken();
        logout();
        navigate("/login");
    };

    const navigationItems = [
        { label: "Home", to: "/" },
        { label: "Browse", to: "/browse" },
        { label: "My Library", to: "/library" },
        { label: "Lists", to: "/lists" },
    ];

    

    return (
        <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070a12]/72 backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

            <div className="mx-auto flex w-full max-w-[1440px] items-center px-4 py-3 sm:px-6 lg:px-8">
                <div className="hidden min-w-0 flex-1 items-center gap-4 lg:flex xl:gap-5">
                    <div className="shrink-0">
                        <NavLogo onClick={closeMobileMenu} />
                    </div>

                    <div className="shrink-0">
                        <DesktopNavLinks />
                    </div>
                </div>

                <div className="hidden min-w-0 flex-1 justify-center px-4 lg:flex xl:px-6">
                    <NavbarSearch />
                </div>

                <div className="hidden shrink-0 items-center lg:flex">
                    <ProfileMenu
                        userDisplayName={userDisplayName}
                        userInitials={userInitials}
                        avatarUrl={(state.user as any)?.avatarUrl ?? null}
                        onLogout={handleLogout}
                    />
                </div>

                <div className="flex w-full items-center justify-between lg:hidden">
                    <NavLogo onClick={closeMobileMenu} />

                    <button
                        type="button"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMobileMenu}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-slate-200 transition-all duration-300 hover:border-white/14 hover:bg-white/10 hover:text-white"
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
            </div>

            <MobileNavMenu
                isOpen={isMobileMenuOpen}
                navigationItems={navigationItems}
                onClose={closeMobileMenu}
                onLogout={handleLogout}
                userDisplayName={userDisplayName}
                userInitials={userInitials}
                avatarUrl={(state.user as any)?.avatarUrl ?? null}
            />
        </header>
    );
};

export default Navbar;
