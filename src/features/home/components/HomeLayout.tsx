import type { HomePageData } from "../types/home.types";
import ReadingSidebar from "./ReadingSidebar";
import ActivityFeed from "./ActivityFeed";
import RecommendationsSidebar from "./RecommendationsSidebar";

type HomeLayoutProps = {
    data: HomePageData;
};

const HomeLayout = ({ data }: HomeLayoutProps) => {
    return (
        <main className="grid grid-cols-12 gap-6 p-6">
            <ReadingSidebar data={data} />

            <ActivityFeed data={data} />

            <RecommendationsSidebar data={data} />
        </main>
    );
};

export default HomeLayout;