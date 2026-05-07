import type { HomePageData } from "../types/home.types";
import ReadingSidebar from "./ReadingSidebar";
import ActivityFeed from "./ActivityFeed";
import RecommendationsSidebar from "./RecommendationsSidebar";
import type { HomeFeedData } from "../../social/types/feed.types";

type HomeLayoutProps = {
    data: HomePageData;
    feed: HomeFeedData | null;
    feedError?: string | null;
};

const HomeLayout = ({ data, feed, feedError }: HomeLayoutProps) => {
    return (
        <div className="py-6 lg:py-10">
            <div className="grid grid-cols-12 gap-6 xl:gap-7">
                <div className="order-2 col-span-12 md:col-span-6 xl:order-1 xl:col-span-3">
                    <ReadingSidebar data={data} />
                </div>

                <div className="order-1 col-span-12 xl:order-2 xl:col-span-6">
                    <ActivityFeed data={data} feed={feed} feedError={feedError} />
                </div>

                <div className="order-3 col-span-12 md:col-span-6 xl:col-span-3">
                    <RecommendationsSidebar data={data} />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
