import { APP_ROUTES } from "../../../shared/navigation/navigation";

export const normalizeSeriesKey = (value: string) => value.replace(/^\/series\//, "").trim();

export const buildSeriesDetailsRoute = (seriesKey: string) =>
    APP_ROUTES.seriesDetails.replace(":seriesKey", encodeURIComponent(normalizeSeriesKey(seriesKey)));

export const getSeriesKeyFromRouteParam = (seriesKeyParam?: string) => {
    if (!seriesKeyParam) {
        return undefined;
    }

    return normalizeSeriesKey(decodeURIComponent(seriesKeyParam));
};
