export const APP_ROUTES = {
    home: "/",
    browse: "/browse",
    browseGenre: "/browse/:genreSlug",
    login: "/login",
    register: "/register",
    profile: "/profile",
    readerProfile: "/readers/:handle",
    search: "/search",
    library: "/library",
    authorDetails: "/authors/:authorKey",
    seriesDetails: "/series/:seriesKey",
    bookDetails: "/books/:id",
    bookActivity: "/books/:bookId/activity",
} as const;

export interface NavigationItem {
    label: string;
    to: string;
}

export const PRIMARY_NAV_ITEMS: NavigationItem[] = [
    { label: "Home", to: APP_ROUTES.home },
    { label: "Browse", to: APP_ROUTES.browse },
    { label: "Profile", to: APP_ROUTES.profile },
    { label: "Shelves", to: APP_ROUTES.library },
];
