

import type { HomePageData } from "../types/home.types";

type ReadingSidebarProps = {
    data: HomePageData;
};

const ReadingSidebar = ({ data }: ReadingSidebarProps) => {
    return (
        <aside className="col-span-3 space-y-4">
            {/* Currently reading / listening / ebook */}
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-slate-400">Currently reading</p>
                <p className="text-white mt-2">{data.continueItems.length} items</p>
            </div>

            {/* Shelves summary */}
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-slate-400">Your shelves</p>
                <p className="text-white mt-2">{data.shelfSummary.length} shelves</p>
            </div>

            {/* Reading challenge */}
            <div className="p-4 border border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-slate-400">Reading goal</p>
                <p className="text-white mt-2">
                    {data.challenge.current} / {data.challenge.target}
                </p>
                <p className="text-xs text-slate-500 mt-1">{data.challenge.label}</p>
            </div>
        </aside>
    );
};

export default ReadingSidebar;