import { APP_ROUTES } from "../../../shared/navigation/navigation";

export const normalizeBookRouteKey = (value?: string | null) => {
    if (!value) {
        return "";
    }

    const normalizedValue = value.trim();

    if (!normalizedValue) {
        return "";
    }

    return normalizedValue.split("/").filter(Boolean).pop()?.trim() ?? normalizedValue;
};

export const buildBookDetailsRoute = (bookKey?: string | null) => {
    const normalizedBookKey = normalizeBookRouteKey(bookKey);

    if (!normalizedBookKey) {
        return APP_ROUTES.home;
    }

    return APP_ROUTES.bookDetails.replace(":id", encodeURIComponent(normalizedBookKey));
};

export const buildBookActivityRoute = (bookKey?: string | null) => {
    const normalizedBookKey = normalizeBookRouteKey(bookKey);

    if (!normalizedBookKey) {
        return APP_ROUTES.home;
    }

    return APP_ROUTES.bookActivity.replace(":bookId", encodeURIComponent(normalizedBookKey));
};

export const getBookKeyFromRouteParam = (bookKeyParam?: string) => {
    if (!bookKeyParam) {
        return undefined;
    }

    return normalizeBookRouteKey(decodeURIComponent(bookKeyParam));
};
