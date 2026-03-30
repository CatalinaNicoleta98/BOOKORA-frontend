

import type { HomePageData } from "../types/home.types";

type RecommendationsSidebarProps = {
    data: HomePageData;
};

const RecommendationsSidebar = ({ data }: RecommendationsSidebarProps) => {
    return (
        <aside className="col-span-3 space-y-4">
            {/* Recommendations */}
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-slate-400">Recommendations</p>
                <p className="text-white mt-2">{data.recommendations.length} books</p>
            </div>

            {/* Trending */}
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-slate-400">Trending</p>
                <p className="text-white mt-2">{data.trendingBooks.length} books</p>
            </div>

            {/* New releases */}
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-slate-400">New releases</p>
                <p className="text-white mt-2">{data.newReleases.length} books</p>
            </div>
        </aside>
    );
};

export default RecommendationsSidebar;