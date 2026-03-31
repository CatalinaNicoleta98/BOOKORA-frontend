import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../../../features/search/services/searchService";
import type { SearchResult } from "../../../features/search/services/searchService";
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

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

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

    const handleSearchChange = async (value: string) => {
        setSearchQuery(value);

        const normalized = value.trim();

        if (!normalized) {
            setSearchResults([]);
            setSearchError(null);
            return;
        }

        try {
            setIsSearching(true);
            setSearchError(null);

            const response = await searchBooks({ q: normalized, limit: 6 });

            setSearchResults(response.results);
        } catch (error) {
            setSearchResults([]);
            setSearchError("Search failed");
        } finally {
            setIsSearching(false);
        }
    };

    const handleResultClick = (result: SearchResult) => {
        setSearchQuery("");
        setSearchResults([]);
        navigate(`/book/${result.externalBookId}`);
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

            <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
                <NavLogo onClick={closeMobileMenu} />

                <DesktopNavLinks />

                <div className="ml-auto hidden items-center gap-3 lg:flex">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search books"
                            className="h-12 w-full rounded-2xl border border-white/8 bg-white/6 pl-4 pr-10 text-sm text-white outline-none"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                aria-label="Clear search"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSearchResults([]);
                                    setSearchError(null);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white"
                            >
                                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}

                        {(searchQuery.trim().length > 0 || isSearching) && (
                          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-xl border border-white/10 bg-[#0b1020]">
                            {isSearching && (
                              <div className="px-4 py-3 text-sm text-slate-300">Searching...</div>
                            )}

                            {!isSearching && searchError && (
                              <div className="px-4 py-3 text-sm text-red-300">{searchError}</div>
                            )}

                            {!isSearching && !searchError && searchResults.length === 0 && (
                              <div className="px-4 py-3 text-sm text-slate-300">No results</div>
                            )}

                            {!isSearching && searchResults.length > 0 && (
                              <div>
                                {searchResults.map((result) => (
                                  <button
                                    key={result.externalBookId}
                                    onClick={() => handleResultClick(result)}
                                    className="w-full text-left px-4 py-3 hover:bg-white/10"
                                  >
                                    <div className="text-sm text-white">{result.title}</div>
                                    <div className="text-xs text-slate-400">{result.author ?? "Unknown"}</div>
                                  </button>
                                ))}
                              </div>
                            )}

                            {!isSearching && !searchError && searchResults.length > 0 && (
                                <div className="border-t border-white/10 px-4 py-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                                            setSearchResults([]);
                                        }}
                                        className="w-full text-left text-sm font-medium text-amber-200 hover:text-amber-100"
                                    >
                                        View all results
                                    </button>
                                </div>
                            )}
                          </div>
                        )}
                    </div>

                    <ProfileMenu
                        userDisplayName={userDisplayName}
                        userInitials={userInitials}
                        avatarUrl={(state.user as any)?.avatarUrl ?? null}
                        onLogout={handleLogout}
                    />
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
