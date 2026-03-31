import type { HomePageData } from "../types/home.types";
import ReadingSidebar from "./ReadingSidebar";
import ActivityFeed from "./ActivityFeed";
import RecommendationsSidebar from "./RecommendationsSidebar";

type HomeLayoutProps = {
    data: HomePageData;
};

const HomeLayout = ({ data }: HomeLayoutProps) => {
    return (
        <div className="grid grid-cols-12 gap-6 py-6 lg:py-10">
            {/* Left sidebar */}
            <div className="order-2 col-span-12 md:col-span-6 xl:order-1 xl:col-span-3">
                <ReadingSidebar data={data} />
            </div>

            {/* Center feed */}
            <div className="order-1 col-span-12 xl:order-2 xl:col-span-6">
                <ActivityFeed data={data} />
            </div>

            {/* Right sidebar */}
            <div className="order-3 col-span-12 md:col-span-6 xl:col-span-3">
                <RecommendationsSidebar data={data} />
            </div>
        </div>
    );
};

export default HomeLayout;