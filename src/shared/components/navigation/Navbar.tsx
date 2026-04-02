import { useEffect, useMemo, useRef, useState } from "react";
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

const SEARCH_RESULT_LIMIT = 6;
const SEARCH_DEBOUNCE_MS = 300;

const getBookCoverFallback = (title?: string) => {
    if (!title) {
        return "BK";
    }

    return title
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("") || "BK";
};

const getBookMetadata = (result: SearchResult) => {
    const metadata: string[] = [];

    if (result.publishedYear) {
        metadata.push(String(result.publishedYear));
    }

    if (result.isbn) {
        metadata.push(`ISBN ${result.isbn}`);
    }

    return metadata.join(" • ");
};

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
    const latestSearchRequestRef = useRef(0);

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

    const clearSearch = () => {
        latestSearchRequestRef.current += 1;
        setSearchQuery("");
        setSearchResults([]);
        setSearchError(null);
        setIsSearching(false);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        const normalizedQuery = searchQuery.trim();

        if (!normalizedQuery) {
            latestSearchRequestRef.current += 1;
            setSearchResults([]);
            setSearchError(null);
            setIsSearching(false);
            return;
        }

        const requestId = latestSearchRequestRef.current + 1;
        latestSearchRequestRef.current = requestId;

        const timeoutId = window.setTimeout(async () => {
            try {
                setIsSearching(true);
                setSearchError(null);

                const response = await searchBooks({
                    q: normalizedQuery,
                    limit: SEARCH_RESULT_LIMIT,
                });

                if (latestSearchRequestRef.current !== requestId) {
                    return;
                }

                setSearchResults(response.results);
            } catch (_error) {
                if (latestSearchRequestRef.current !== requestId) {
                    return;
                }

                setSearchResults([]);
                setSearchError("Search failed");
            } finally {
                if (latestSearchRequestRef.current === requestId) {
                    setIsSearching(false);
                }
            }
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchQuery]);

    const handleResultClick = (result: SearchResult) => {
        clearSearch();
        navigate(`/book/${result.externalBookId}`);
    };

    const handleViewAllResults = () => {
        const normalized = searchQuery.trim();

        if (!normalized) {
            return;
        }

        navigate(`/search?q=${encodeURIComponent(normalized)}`);
        clearSearch();
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
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search books, authors, series..."
                            className="h-12 w-full rounded-2xl border border-white/10 bg-white/6 pl-4 pr-10 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-200/40 focus:bg-white/8"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                aria-label="Clear search"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}

                        {(searchQuery.trim().length > 0 || isSearching) && (
                            <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/98 shadow-2xl shadow-black/30 backdrop-blur-xl">
                                {isSearching && (
                                    <div className="px-4 py-4 text-sm text-slate-300">Searching...</div>
                                )}

                                {!isSearching && searchError && (
                                    <div className="px-4 py-4 text-sm text-red-300">{searchError}</div>
                                )}

                                {!isSearching && !searchError && searchQuery.trim().length >= 3 && searchResults.length === 0 && (
                                    <div className="px-4 py-4 text-sm text-slate-300">No results found</div>
                                )}

                                {!isSearching && !searchError && searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
                                    <div className="px-4 py-4 text-sm text-slate-300">Type at least 3 characters to search</div>
                                )}

                                {!isSearching && searchResults.length > 0 && (
                                    <div className="max-h-[28rem] overflow-y-auto py-2">
                                        {searchResults.map((result) => {
                                            const metadata = getBookMetadata(result);
                                            const coverFallback = getBookCoverFallback(result.title);

                                            return (
                                                <button
                                                    key={result.externalBookId}
                                                    type="button"
                                                    onClick={() => handleResultClick(result)}
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/8"
                                                >
                                                    <div className="flex h-16 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/6 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                                                        {result.cover ? (
                                                            <img
                                                                src={result.cover}
                                                                alt={`Cover of ${result.title}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <span>{coverFallback}</span>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="truncate text-sm font-medium text-white">{result.title}</div>
                                                        <div className="mt-1 truncate text-xs text-slate-400">{result.author ?? "Unknown author"}</div>
                                                        {metadata ? (
                                                            <div className="mt-2 truncate text-[11px] text-slate-500">{metadata}</div>
                                                        ) : null}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {!isSearching && !searchError && searchResults.length > 0 && (
                                    <div className="border-t border-white/10 px-4 py-3">
                                        <button
                                            type="button"
                                            onClick={handleViewAllResults}
                                            className="w-full text-left text-sm font-medium text-amber-200 transition-colors hover:text-amber-100"
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
