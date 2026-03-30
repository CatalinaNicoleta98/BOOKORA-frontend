

import type { HomePageData } from "../types/home.types";

type HomeLayoutProps = {
    data: HomePageData;
};

const HomeLayout = ({ data }: HomeLayoutProps) => {
    return (
        <main className="grid grid-cols-12 gap-6 p-6">
            {/* Left sidebar */}
            <aside className="col-span-3 space-y-4">
                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-slate-400">Currently reading</p>
                    <p className="text-white mt-2">{data.continueItems.length} items</p>
                </div>

                <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                    <p className="text-sm text-slate-400">Your shelves</p>
                    <p className="text-white mt-2">{data.shelfSummary.length} shelves</p>
                </div>
            </aside>

            {/* Center */}
            <section className="col-span-6 space-y-4">
                <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="text-lg font-semibold">Your activity</h2>
                    <p className="text-sm text-slate-400 mt-2">
                        {data.recentActivity.length} recent actions
                    </p>
                </div>

                <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                    <h2 className="text-lg font-semibold">Continue</h2>
                    <p className="text-sm text-slate-400 mt-2">
                        {data.continueItems.length} in progress
                    </p>
                </div>
            </section>

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