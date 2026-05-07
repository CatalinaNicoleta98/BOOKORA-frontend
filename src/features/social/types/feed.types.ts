export type FeedActivityType =
    | "added_to_shelf"
    | "started_reading"
    | "started_listening"
    | "finished_reading"
    | "finished_listening"
    | "rated_book"
    | "published_review"
    | "updated_review"
    | "reread_logged";

export interface FeedActor {
    id: string;
    handle: string;
    name: string;
    avatarUrl?: string;
}

export interface FeedBookSnapshot {
    source: "open_library" | "custom";
    externalBookId?: string;
    title: string;
    author?: string;
    cover?: string;
    publishedYear?: number;
}

export interface FeedItem {
    id: string;
    type: FeedActivityType;
    createdAt: string;
    actor: FeedActor;
    book: FeedBookSnapshot;
    rating?: number;
    reviewText?: string;
    isSpoiler?: boolean;
    status?: string;
    previousStatus?: string;
}

export interface HomeFeedData {
    items: FeedItem[];
    pageInfo: {
        nextCursor?: string;
        hasMore: boolean;
    };
    meta: {
        followingCount: number;
        includeSelf: boolean;
    };
}

export interface HomeFeedResponse {
    error: string | null;
    data?: HomeFeedData;
}
