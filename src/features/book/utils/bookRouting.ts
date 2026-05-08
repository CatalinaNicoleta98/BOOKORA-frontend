import { APP_ROUTES } from "../../../shared/navigation/navigation";

export const normalizeBookRouteKey = (value: string) =>
    value.split("/").filter(Boolean).pop()?.trim() ?? value.trim();

export const buildBookDetailsRoute = (bookKey: string) =>
    APP_ROUTES.bookDetails.replace(":id", encodeURIComponent(normalizeBookRouteKey(bookKey)));

export const buildBookActivityRoute = (bookKey: string) =>
    APP_ROUTES.bookActivity.replace(":bookId", encodeURIComponent(normalizeBookRouteKey(bookKey)));

export const getBookKeyFromRouteParam = (bookKeyParam?: string) => {
    if (!bookKeyParam) {
        return undefined;
    }

    return normalizeBookRouteKey(decodeURIComponent(bookKeyParam));
};
