import { APP_ROUTES } from "../../../shared/navigation/navigation";

export const normalizeAuthorKey = (value: string) => value.replace(/^\/authors\//, "").trim();

export const buildAuthorDetailsRoute = (authorKey: string) =>
    APP_ROUTES.authorDetails.replace(
        ":authorKey",
        encodeURIComponent(normalizeAuthorKey(authorKey))
    );

export const getAuthorKeyFromRouteParam = (authorKeyParam?: string) => {
    if (!authorKeyParam) {
        return undefined;
    }

    return normalizeAuthorKey(decodeURIComponent(authorKeyParam));
};
