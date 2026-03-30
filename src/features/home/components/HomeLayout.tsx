import type { HomePageData } from "../types/home.types";
import ReadingSidebar from "./ReadingSidebar";
import ActivityFeed from "./ActivityFeed";

type HomeLayoutProps = {
    data: HomePageData;
};

const HomeLayout = ({ data }: HomeLayoutProps) => {
    return (
        <main className="grid grid-cols-12 gap-6 p-6">
            <ReadingSidebar data={data} />

            <ActivityFeed data={data} />

            {/* Right sidebar */}
            <aside className="col-span-3 space-y-4">
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-slate-400">Recommendations</p>
                    <p className="text-white mt-2">{data.recommendations.length} books</p>
                </div>

                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-slate-400">Trending</p>
                    <p className="text-white mt-2">{data.trendingBooks.length} books</p>
                </div>
            </aside>
        </main>
    );
};

export default HomeLayout;