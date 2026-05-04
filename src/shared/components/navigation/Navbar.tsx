import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "../../../features/search/components/NavbarSearch";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { authStorage } from "../../../features/auth/services/authStorage";
import NavLogo from "./NavLogo";
import DesktopNavLinks from "./DesktopNavLinks";
import ProfileMenu from "./ProfileMenu";
import MobileNavMenu from "./MobileNavMenu";
import ThemeToggle from "./ThemeToggle";
import { APP_ROUTES, PRIMARY_NAV_ITEMS } from "../../navigation/navigation";

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

const getImageSource = (imagePath?: string | null) => {
    if (!imagePath) {
        return undefined;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `http://localhost:4000${imagePath}`;
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

    const mobileAvatarSource = useMemo(() => {
        return getImageSource((state.user as any)?.avatarUrl ?? null);
    }, [(state.user as any)?.avatarUrl]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((currentValue) => !currentValue);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        authStorage.removeToken();
        logout();
        navigate(APP_ROUTES.login);
    };

    return (
        <header className="theme-navbar sticky top-0 z-50 border-b backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px" />

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

                <div className="hidden shrink-0 items-center gap-3 lg:flex">
                    <ThemeToggle />
                    <ProfileMenu
                        userDisplayName={userDisplayName}
                        userInitials={userInitials}
                        avatarUrl={(state.user as any)?.avatarUrl ?? null}
                        onLogout={handleLogout}
                    />
                </div>

                <div className="flex w-full items-center justify-between lg:hidden">
                    <NavLogo onClick={closeMobileMenu} />

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            type="button"
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--bookora-border)] bg-[var(--bookora-surface)] text-[var(--bookora-text-soft)] transition-all duration-300 hover:border-[var(--bookora-border-strong)] hover:text-[var(--bookora-title)]"
                        >
                            {isMobileMenuOpen ? (
                                <div className="relative h-5 w-5">
                                    <span className="absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current rotate-45" />
                                    <span className="absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-current -rotate-45" />
                                </div>
                            ) : mobileAvatarSource ? (
                                <img
                                    src={mobileAvatarSource}
                                    alt={`${userDisplayName} avatar`}
                                    className="h-11 w-11 rounded-xl object-cover"
                                />
                            ) : (
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-300/80 via-indigo-300/80 to-fuchsia-300/80 text-base font-semibold text-slate-950">
                                    {userInitials}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <MobileNavMenu
                isOpen={isMobileMenuOpen}
                navigationItems={PRIMARY_NAV_ITEMS}
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
