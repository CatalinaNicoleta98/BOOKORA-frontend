import { httpClient } from "../../../shared/api/httpClient";
import type {
    HomeBookCard,
    HomeBookFormat,
    HomeContinueItem,
    HomePageData,
    HomeReadingStatus,
} from "../types/home.types";

type LibraryEntry = {
    externalBookId?: string;
    _id: string;
    title: string;
    author?: string;
    cover?: string;
    status: string;
    format?: HomeBookFormat;
    formats?: HomeBookFormat[];
    rating?: number;
    notes?: string;
    reviewText?: string;
    createdAt: string;
    updatedAt?: string;
    progressValue?: number;
    progressMax?: number;
    progressUnit?: "pages" | "percent" | "minutes" | "hours";
};

type SearchRecommendationResult = {
    source: "open_library";
    externalBookId: string;
    title: string;
    author?: string;
    cover?: string;
    publishedYear?: number;
};

type SearchRecommendationResponse = {
    results: SearchRecommendationResult[];
    pagination: {
        page: number;
        limit: number;
        numFound: number;
    };
};

type SearchRecommendationEnvelope = {
    error: string | null;
    data: SearchRecommendationResponse;
    message?: string;
};

const getPrimaryFormat = (entry: LibraryEntry): HomeBookFormat | undefined => {
    return entry.formats?.[0] ?? entry.format;
};

const formatStatusLabel = (status: string) => {
    switch (status) {
        case "want_to_read":
            return "Want to Read";
        case "currently_reading":
            return "Currently Reading";
        case "currently_listening":
            return "Currently Listening";
        case "finished_reading":
            return "Read";
        case "finished_listening":
            return "Listened";
        case "on_break":
            return "On Break";
        case "did_not_finish":
            return "Did Not Finish";
        default:
            return status.replace(/_/g, " ");
    }
};

const getProgressLabel = (entry: LibraryEntry) => {
    if (entry.progressUnit === "pages") {
        return `${entry.progressValue ?? 0}/${entry.progressMax ?? 0} pages`;
    }

    if (entry.progressUnit === "minutes") {
        return `${entry.progressValue ?? 0} min`;
    }

    if (entry.progressUnit === "hours") {
        return `${entry.progressValue ?? 0} h`;
    }

    return `${entry.progressValue ?? 0}%`;
};

const toHomeBookCard = (entry: LibraryEntry): HomeBookCard => ({
    id: entry.externalBookId ?? entry._id,
    title: entry.title,
    author: entry.author ?? "Unknown author",
    coverUrl: entry.cover ?? "",
    format: getPrimaryFormat(entry),
    status: entry.status as HomeReadingStatus,
});

const isContinueReadingStatus = (status: string): status is HomeReadingStatus => {
    return ["currently_reading", "currently_listening"].includes(status);
};

const mapContinueItems = (entries: LibraryEntry[]): HomePageData["continueItems"] => {
    return entries
        .filter((entry): entry is LibraryEntry & { status: HomeContinueItem["status"] } =>
            isContinueReadingStatus(entry.status)
        )
        .slice(0, 6)
        .map((entry) => ({
            ...toHomeBookCard(entry),
            progressValue: entry.progressValue ?? 0,
            progressMax: entry.progressMax ?? 100,
            progressUnit: entry.progressUnit ?? "percent",
            progressLabel: getProgressLabel(entry),
            secondaryLabel:
                entry.rating && entry.rating > 0 ? `${entry.rating}★ personal rating` : undefined,
        }));
};

const mapActivity = (entries: LibraryEntry[]): HomePageData["recentActivity"] => {
    return entries.slice(0, 8).map((entry) => {
        const progressLabel =
            entry.progressValue && entry.progressUnit
                ? getProgressLabel(entry)
                : undefined;
        const hasWrittenReview = Boolean(entry.reviewText?.trim());
        let type: HomePageData["recentActivity"][number]["type"] = "progress_updated";
        let title = "Updated your activity";
        let subtitle = `${entry.title} • ${formatStatusLabel(entry.status)}`;

        if (hasWrittenReview) {
            type = "rated_book";
            title = entry.rating ? "Reviewed and rated a book" : "Reviewed a book";
        } else if (entry.status === "finished_reading") {
            type = "finished_book";
            title = "Finished a book";
            subtitle = entry.title;
        } else if (entry.status === "finished_listening") {
            type = "finished_audiobook";
            title = "Finished an audiobook";
            subtitle = entry.title;
        } else if (typeof entry.rating === "number") {
            type = "rated_book";
            title = "Rated a book";
            subtitle = `${entry.title} • ${entry.rating}★`;
        } else if (progressLabel) {
            type = "progress_updated";
            title = "Progress updated";
            subtitle = `${entry.title} • ${progressLabel}`;
        } else if (entry.status === "currently_listening") {
            type = "started_audiobook";
            title = "Started listening";
            subtitle = entry.title;
        } else if (entry.status === "currently_reading") {
            type = "started_book";
            title = "Started reading";
            subtitle = entry.title;
        } else if (entry.status === "want_to_read") {
            type = "added_to_shelf";
            title = "Added to Want to Read";
            subtitle = entry.title;
        }

        return {
            id: entry.externalBookId ?? entry._id,
            type,
            title,
            subtitle,
            createdAt: new Date(entry.updatedAt ?? entry.createdAt).toLocaleDateString(),
            rating: entry.rating,
            progressLabel,
            book: toHomeBookCard(entry),
        };
    });
};

const mapShelves = (entries: LibraryEntry[]) => {
    const counts: Record<string, number> = {};

    entries.forEach((entry) => {
        counts[entry.status] = (counts[entry.status] || 0) + 1;
    });

    return Object.entries(counts).map(([status, count]) => ({
        id: status,
        label: formatStatusLabel(status),
        count,
    }));
};

const getNormalizedTitle = (title: string) => title.trim().toLowerCase();

const getUniqueRecommendationSeedAuthors = (entries: LibraryEntry[]) => {
    const weightedEntries = [...entries].sort((left, right) => {
        const leftScore = (left.rating ?? 0) + (left.status.startsWith("finished_") ? 1 : 0);
        const rightScore = (right.rating ?? 0) + (right.status.startsWith("finished_") ? 1 : 0);

        return rightScore - leftScore;
    });

    return weightedEntries
        .map((entry) => entry.author?.trim())
        .filter((author): author is string => Boolean(author))
        .filter((author, index, authors) => authors.findIndex((value) => value === author) === index)
        .slice(0, 4);
};

const mapSearchResultToRecommendation = (
    result: SearchRecommendationResult,
    reason: string
): HomePageData["recommendations"][number] => ({
    id: result.externalBookId,
    title: result.title,
    author: result.author ?? "Unknown author",
    coverUrl: result.cover ?? "",
    reason,
    ctaLabel: "Open book",
});

const getFallbackRecommendations = (
    sortedEntries: LibraryEntry[],
    excludedIds: Set<string>
): HomePageData["recommendations"] =>
    sortedEntries
        .filter((entry) => !excludedIds.has(entry.externalBookId ?? entry._id))
        .slice(0, 6)
        .map((entry) => ({
            ...toHomeBookCard(entry),
            reason:
                typeof entry.rating === "number" && entry.rating >= 4
                    ? "A highly rated favorite worth revisiting"
                    : "Pulled from your recent library activity",
            ctaLabel: "Open book",
        }));

const getAuthorBasedRecommendations = async (
    entries: LibraryEntry[]
): Promise<HomePageData["recommendations"]> => {
    const existingBookIds = new Set(entries.map((entry) => entry.externalBookId ?? entry._id));
    const existingTitles = new Set(entries.map((entry) => getNormalizedTitle(entry.title)));
    const seedAuthors = getUniqueRecommendationSeedAuthors(entries);

    if (seedAuthors.length === 0) {
        return [];
    }

    const searchResponses = await Promise.allSettled(
        seedAuthors.map(async (author) => {
            const response = await httpClient.get<SearchRecommendationEnvelope>("/books/search", {
                params: {
                    author,
                    limit: 8,
                },
            });

            if (response.data.error) {
                throw new Error(response.data.message ?? "Failed to fetch recommendations");
            }

            return {
                author,
                results: response.data.data.results,
            };
        })
    );

    const recommendations: HomePageData["recommendations"] = [];
    const seenRecommendationIds = new Set<string>();

    for (const response of searchResponses) {
        if (response.status !== "fulfilled") {
            continue;
        }

        for (const result of response.value.results) {
            const normalizedTitle = getNormalizedTitle(result.title);

            if (
                existingBookIds.has(result.externalBookId) ||
                existingTitles.has(normalizedTitle) ||
                seenRecommendationIds.has(result.externalBookId)
            ) {
                continue;
            }

            recommendations.push(
                mapSearchResultToRecommendation(result, `Because you read ${response.value.author}`)
            );
            seenRecommendationIds.add(result.externalBookId);

            if (recommendations.length >= 6) {
                return recommendations;
            }
        }
    }

    return recommendations;
};

export const getHomePageData = async (): Promise<HomePageData> => {
    const response = await httpClient.get("/library");
    const entries: LibraryEntry[] = response.data.data;
    const sortedEntries = [...entries].sort((left, right) => {
        const leftTime = Date.parse(left.updatedAt ?? left.createdAt);
        const rightTime = Date.parse(right.updatedAt ?? right.createdAt);

        return rightTime - leftTime;
    });
    const highlyRatedEntries = sortedEntries
        .filter((entry) => typeof entry.rating === "number" && entry.rating >= 4)
        .sort((left, right) => (right.rating ?? 0) - (left.rating ?? 0));
    const wantToReadEntries = sortedEntries.filter((entry) => entry.status === "want_to_read");
    const completedEntries = sortedEntries.filter((entry) =>
        ["finished_reading", "finished_listening"].includes(entry.status)
    );
    const recommendations = await getAuthorBasedRecommendations(sortedEntries);
    const fallbackExclusions = new Set([
        ...sortedEntries
            .filter((entry) =>
                ["finished_reading", "finished_listening", "currently_reading", "currently_listening"].includes(
                    entry.status
                )
            )
            .map((entry) => entry.externalBookId ?? entry._id),
    ]);

    return {
        userName: "Reader",
        continueItems: mapContinueItems(sortedEntries),
        recentActivity: mapActivity(sortedEntries),
        recommendations:
            recommendations.length > 0
                ? recommendations
                : getFallbackRecommendations(
                      highlyRatedEntries.length > 0 ? highlyRatedEntries : sortedEntries,
                      fallbackExclusions
                  ),
        trendingBooks: sortedEntries
            .filter((entry) => entry.status !== "want_to_read")
            .slice(0, 6)
            .map(toHomeBookCard),
        newReleases: (wantToReadEntries.length > 0 ? wantToReadEntries : completedEntries)
            .slice(0, 6)
            .map(toHomeBookCard),
        shelfSummary: mapShelves(entries),
        challenge: {
            current: entries.filter((entry) =>
                ["finished_reading", "finished_listening"].includes(entry.status)
            ).length,
            target: 20,
            label: "2026 Reading Goal",
        },
    };
};
