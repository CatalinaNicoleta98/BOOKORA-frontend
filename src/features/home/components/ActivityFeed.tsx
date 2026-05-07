import { useNavigate } from "react-router-dom";

import type { HomePageData } from "../types/home.types";
import SocialFeed from "../../social/components/SocialFeed";
import type { HomeFeedData } from "../../social/types/feed.types";

type ActivityFeedProps = {
    data: HomePageData;
    feed: HomeFeedData | null;
    feedError?: string | null;
};

const ActivityFeed = ({ data, feed, feedError }: ActivityFeedProps) => {
    const navigate = useNavigate();
    const feedItemCount = feed?.items.length ?? 0;
    const followingCount = feed?.meta.followingCount ?? 0;

    return (
        <section className="space-y-6">
            <div className="theme-content-panel rounded-[1.9rem] p-5 sm:p-6">
                <div className="theme-content-panel-soft overflow-hidden rounded-[1.55rem] p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-2">
                            <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.2em]">
                                Reader updates
                            </p>
                            <h2 className="theme-title text-2xl font-semibold tracking-[-0.03em]">
                                Your social reading feed
                            </h2>
                            <p className="theme-text-soft text-sm leading-7">
                                Reviews, ratings, started books, and finished reads from the people in your reading circle.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                {followingCount} following
                            </span>
                            <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                {feedItemCount} updates
                            </span>
                            {feed?.meta.includeSelf ? (
                                <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    Self included
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                        <p className="theme-text-soft text-sm leading-7">
                            {data.continueItems.length > 0
                                ? "Keep your own stack moving on the left while this center stream stays focused on what readers around you are doing."
                                : "Start following readers or tracking books to make this dashboard feel more alive over time."}
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/search")}
                            className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium"
                        >
                            Find more books
                        </button>
                    </div>
                </div>

                <SocialFeed feed={feed} error={feedError} />
            </div>
        </section>
    );
};

export default ActivityFeed;
