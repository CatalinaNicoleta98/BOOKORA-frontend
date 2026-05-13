import { useState, useEffect } from "react";

import { getHomePageData } from "../services/homeService";
import HomeLayout from "../components/HomeLayout";
import { useAuth } from "../../auth/context/AuthContext";
import { getHomeFeed } from "../../social/services/feedService";
import type { HomeFeedData } from "../../social/types/feed.types";
import { useDocumentTitle } from "../../../shared/hooks/useDocumentTitle";

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

const isWithinLastWeek = (value: string) => {
    const timestamp = Date.parse(value);

    if (Number.isNaN(timestamp)) {
        return false;
    }

    return Date.now() - timestamp <= ONE_WEEK_IN_MS;
};

const HomePage = () => {
    useDocumentTitle("Bookora | Home");
    const { state: authState } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<null | import("../types/home.types").HomePageData>(null);
    const [error, setError] = useState<string | null>(null);
    const [feed, setFeed] = useState<HomeFeedData | null>(null);
    const [feedError, setFeedError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const [homeResult, feedResult] = await Promise.allSettled([
                getHomePageData(),
                getHomeFeed({ includeSelf: false })
            ]);

            try {
                if (homeResult.status === "fulfilled") {
                    setData({
                        ...homeResult.value,
                        userName: authState.user?.name ?? homeResult.value.userName,
                    });
                    setError(null);
                } else {
                    setError("Could not load your home page right now.");
                }

                if (feedResult.status === "fulfilled") {
                    const filteredFeedItems =
                        authState.user?.id
                            ? feedResult.value.items.filter((item) => item.actor.id !== authState.user?.id)
                            : feedResult.value.items;

                    const recentFeed: HomeFeedData = {
                        ...feedResult.value,
                        items: filteredFeedItems.filter((item) => isWithinLastWeek(item.createdAt)),
                    };

                    setFeed(recentFeed);
                    setFeedError(null);
                } else {
                    setFeed(null);
                    setFeedError("Could not load reader updates right now.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        void load();
    }, [authState.user?.id, authState.user?.name]);

    if (error) {
        return <div className="p-8 text-red-300">{error}</div>;
    }

    if (isLoading || !data) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-slate-300">
                Loading your reading space...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <HomeLayout data={data} feed={feed} feedError={feedError} />
        </div>
    );
};

export default HomePage;
