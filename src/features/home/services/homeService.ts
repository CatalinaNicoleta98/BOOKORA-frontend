import { httpClient } from "../../../shared/api/httpClient";
import type { HomeContinueItem, HomePageData, HomeReadingStatus } from "../types/home.types";

// Backend library entry shape (based on your controller)
type LibraryEntry = {
    _id: string;
    title: string;
    author?: string;
    cover?: string;
    status: string;
    format: "physical" | "ebook" | "audiobook";
    rating?: number;
    notes?: string;
    createdAt: string;

    // progress
    progressValue?: number;
    progressMax?: number;
    progressUnit?: "pages" | "percent" | "minutes" | "hours";
};

const isContinueReadingStatus = (status: string): status is HomeReadingStatus => {
    return [
        "currently_reading",
        "currently_listening",
        "currently_on_ebook",
    ].includes(status);
};

const mapContinueItems = (entries: LibraryEntry[]): HomePageData["continueItems"] => {
    return entries
        .filter((entry): entry is LibraryEntry & { status: HomeContinueItem["status"] } =>
            isContinueReadingStatus(entry.status)
        )
        .slice(0, 6)
        .map((entry) => ({
            id: entry._id,
            title: entry.title,
            author: entry.author ?? "Unknown author",
            coverUrl: entry.cover ?? "",
            format: entry.format,
            status: entry.status,
            progressValue: entry.progressValue ?? 0,
            progressMax: entry.progressMax ?? 100,
            progressUnit: entry.progressUnit ?? "percent",
            progressLabel:
                entry.progressUnit === "pages"
                    ? `${entry.progressValue ?? 0}/${entry.progressMax ?? 0} pages`
                    : entry.progressUnit === "minutes"
                    ? `${entry.progressValue ?? 0} min`
                    : entry.progressUnit === "hours"
                    ? `${entry.progressValue ?? 0} h`
                    : `${entry.progressValue ?? 0}%`,
        }));
};

const mapActivity = (entries: LibraryEntry[]): HomePageData["recentActivity"] => {
    return entries.slice(0, 8).map((entry) => {
        let title = "Updated a book";
        let subtitle = entry.title;

        // Finished
        if (entry.status === "finished") {
            title = "Finished a book";
            subtitle = entry.title;
        }
        // Rating
        else if (entry.rating) {
            title = "Rated a book";
            subtitle = `${entry.title} • ${entry.rating}★`;
        }
        // Progress updates (more interesting than just "started")
        else if (entry.progressValue && entry.progressUnit) {
            title = "Progress updated";

            if (entry.progressUnit === "pages") {
                subtitle = `${entry.title} • ${entry.progressValue}/${entry.progressMax ?? 0} pages`;
            } else if (entry.progressUnit === "minutes") {
                subtitle = `${entry.title} • ${entry.progressValue} min listened`;
            } else if (entry.progressUnit === "hours") {
                subtitle = `${entry.title} • ${entry.progressValue} h listened`;
            } else {
                subtitle = `${entry.title} • ${entry.progressValue}%`;
            }
        }
        // Fallback: started reading/listening
        else if (entry.status.startsWith("currently")) {
            title = "Started reading";
            subtitle = entry.title;
        }

        return {
            id: entry._id,
            type: "progress_updated",
            title,
            subtitle,
            createdAt: new Date(entry.createdAt).toLocaleDateString(),
            book: {
                id: entry._id,
                title: entry.title,
                author: entry.author ?? "Unknown author",
                coverUrl: entry.cover ?? "",
            },
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
        label: status.replace(/_/g, " "),
        count,
    }));
};

export const getHomePageData = async (): Promise<HomePageData> => {
    const response = await httpClient.get("/library");

    const entries: LibraryEntry[] = response.data.data;

    return {
        userName: "Reader",

        continueItems: mapContinueItems(entries),
        recentActivity: mapActivity(entries),

        // still mocked for now
        recommendations: [],
        trendingBooks: [],
        newReleases: [],

        shelfSummary: mapShelves(entries),

        challenge: {
            current: entries.filter((e) => e.status === "finished").length,
            target: 20,
            label: "2026 Reading Goal",
        },
    };
};