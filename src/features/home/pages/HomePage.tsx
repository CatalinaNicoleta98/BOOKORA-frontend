import { useState, useEffect } from "react";

import { getHomePageData } from "../services/homeService";
import HomeLayout from "../components/HomeLayout";
import { useAuth } from "../../auth/context/AuthContext";
import { getHomeFeed } from "../../social/services/feedService";
import type { HomeFeedData } from "../../social/types/feed.types";

const HomePage = () => {
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
                    const filteredFeed =
                        authState.user?.id
                            ? {
                                  ...feedResult.value,
                                  items: feedResult.value.items.filter(
                                      (item) => item.actor.id !== authState.user?.id
                                  ),
                              }
                            : feedResult.value;

                    setFeed(filteredFeed);
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
