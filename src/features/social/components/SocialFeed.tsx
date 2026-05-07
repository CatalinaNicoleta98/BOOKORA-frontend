import type { HomeFeedData } from "../types/feed.types";
import SocialFeedCard from "./SocialFeedCard";
import SocialFeedEmptyState from "./SocialFeedEmptyState";

interface SocialFeedProps {
    feed: HomeFeedData | null;
    error?: string | null;
}

const SocialFeed = ({ feed, error }: SocialFeedProps) => {
    if (error) {
        return (
            <SocialFeedEmptyState
                title="Could not load reader updates"
                description="The social feed is temporarily unavailable, but your reading space is still here."
            />
        );
    }

    if (!feed || feed.meta.followingCount === 0) {
        return (
            <SocialFeedEmptyState
                title="Follow readers to see their updates"
                description="When you follow public reader profiles, their latest reading moments will start showing up here."
            />
        );
    }

    if (feed.items.length === 0) {
        return (
            <SocialFeedEmptyState
                title="No reading updates yet"
                description="You are following readers, but nobody has shared a new public reading update recently."
            />
        );
    }

    return (
        <div className="mt-6 space-y-5">
            {feed.items.map((item) => (
                <SocialFeedCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export type { SocialFeedProps };
export default SocialFeed;
