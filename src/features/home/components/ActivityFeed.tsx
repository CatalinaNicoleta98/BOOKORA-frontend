

import type { HomePageData } from "../types/home.types";

type ActivityFeedProps = {
    data: HomePageData;
};

const ActivityFeed = ({ data }: ActivityFeedProps) => {
    return (
        <section className="col-span-6 space-y-4">
            {/* Activity */}
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                <h2 className="text-lg font-semibold">Your activity</h2>
                <p className="text-sm text-slate-400 mt-2">
                    {data.recentActivity.length} recent actions
                </p>
            </div>

            {/* Continue reading/listening */}
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                <h2 className="text-lg font-semibold">Continue</h2>
                <p className="text-sm text-slate-400 mt-2">
                    {data.continueItems.length} in progress
                </p>
            </div>
        </section>
    );
};

export default ActivityFeed;