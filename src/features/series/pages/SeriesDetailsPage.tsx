import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SeriesHero from "../components/SeriesHero";
import SeriesPageState from "../components/SeriesPageState";
import SeriesReadingOrder from "../components/SeriesReadingOrder";
import { getSeriesDetails } from "../services/seriesService";
import type { SeriesDetailsViewModel } from "../types/series.types";
import { getSeriesKeyFromRouteParam } from "../utils/seriesRouting";

const SeriesDetailsPage = () => {
    const { seriesKey: seriesKeyParam } = useParams<{ seriesKey: string }>();
    const seriesKey = getSeriesKeyFromRouteParam(seriesKeyParam);

    const [series, setSeries] = useState<SeriesDetailsViewModel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!seriesKey) {
            setSeries(null);
            setError("Series key is missing.");
            return;
        }

        let isActive = true;

        const loadSeries = async () => {
            try {
                setIsLoading(true);
                setError(null);
                setSeries(null);

                const nextSeries = await getSeriesDetails(seriesKey);

                if (!isActive) {
                    return;
                }

                setSeries(nextSeries);
            } catch (err) {
                if (!isActive) {
                    return;
                }

                const message = err instanceof Error ? err.message : "Failed to load series details.";
                setError(message);
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void loadSeries();

        return () => {
            isActive = false;
        };
    }, [seriesKey]);

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                {isLoading ? (
                    <SeriesPageState
                        title="Loading series page..."
                        description="We are gathering the books and reading order for this series."
                    />
                ) : null}

                {!isLoading && error ? (
                    <SeriesPageState title="Could not load this series" description={error} tone="error" />
                ) : null}

                {!isLoading && !error && series ? (
                    <>
                        <SeriesHero series={series} />
                        <SeriesReadingOrder books={series.books} />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default SeriesDetailsPage;
