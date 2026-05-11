import { httpClient } from "../../../shared/api/httpClient";
import type { SeriesDetailsApiEnvelope, SeriesDetailsViewModel } from "../types/series.types";

export const getSeriesDetails = async (seriesKey: string): Promise<SeriesDetailsViewModel> => {
    const response = await httpClient.get<SeriesDetailsApiEnvelope>(
        `/series/${encodeURIComponent(seriesKey)}`
    );

    if (response.data.error || !response.data.data) {
        throw new Error(response.data.message ?? "Failed to fetch series details.");
    }

    return response.data.data;
};
