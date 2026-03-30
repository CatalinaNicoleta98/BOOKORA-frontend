

export type HomeBookFormat = "physical" | "ebook" | "audiobook";

export type HomeReadingStatus =
    | "want_to_read"
    | "currently_reading"
    | "currently_listening"
    | "currently_on_ebook"
    | "finished_reading"
    | "finished_listening"
    | "on_break"
    | "did_not_finish";

export type HomeProgressUnit = "pages" | "percent" | "minutes" | "hours";

export type HomeBookCard = {
    id: string;
    title: string;
    author: string;
    coverUrl: string | null;
    description?: string;
    genres?: string[];
    format?: HomeBookFormat;
    status?: HomeReadingStatus;
};

export type HomeContinueItem = HomeBookCard & {
    progressValue: number;
    progressMax: number;
    progressUnit: HomeProgressUnit;
    progressLabel: string;
    secondaryLabel?: string;
};

export type HomeActivityType =
    | "progress_updated"
    | "started_book"
    | "started_audiobook"
    | "started_ebook"
    | "finished_book"
    | "finished_audiobook"
    | "rated_book"
    | "added_to_library"
    | "added_to_shelf";

export type HomeActivityItem = {
    id: string;
    type: HomeActivityType;
    createdAt: string;
    title: string;
    subtitle: string;
    book: HomeBookCard;
    rating?: number;
    progressLabel?: string;
};

export type HomeShelfSummaryItem = {
    id: string;
    label: string;
    count: number;
};

export type HomeChallengeSummary = {
    current: number;
    target: number;
    label: string;
};

export type HomeRecommendationItem = HomeBookCard & {
    reason: string;
    ctaLabel: string;
};

export type HomeDiscoverySection = {
    id: string;
    title: string;
    description?: string;
    books: HomeBookCard[];
};

export type HomePageData = {
    userName: string;
    continueItems: HomeContinueItem[];
    recentActivity: HomeActivityItem[];
    recommendations: HomeRecommendationItem[];
    trendingBooks: HomeBookCard[];
    newReleases: HomeBookCard[];
    shelfSummary: HomeShelfSummaryItem[];
    challenge: HomeChallengeSummary;
};