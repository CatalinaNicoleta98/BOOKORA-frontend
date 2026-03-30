

import type { HomePageData } from "../types/home.types";

// Temporary mock data builder
// This will later be replaced with real API calls

export const getHomePageData = async (): Promise<HomePageData> => {
    // TODO: replace with real API integration

    return {
        userName: "Reader",

        continueItems: [],
        recentActivity: [],

        recommendations: [],
        trendingBooks: [],
        newReleases: [],

        shelfSummary: [],

        challenge: {
            current: 0,
            target: 20,
            label: "2026 Reading Goal",
        },
    };
};