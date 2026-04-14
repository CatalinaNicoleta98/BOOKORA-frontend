

import type { BookDetailsPanelProps } from "../types/book.types";

const BookDetailsPanel = ({ authorLabel, publishLabel }: BookDetailsPanelProps) => {
    return (
        <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-6">
            <h2 className="text-lg font-semibold text-white">Book details</h2>

            <dl className="mt-5 space-y-4 text-sm text-slate-300">
                <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                    <dt className="text-slate-400">Author</dt>
                    <dd className="text-right text-white">{authorLabel}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                    <dt className="text-slate-400">First published</dt>
                    <dd className="text-right text-white">{publishLabel}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/6 pb-4">
                    <dt className="text-slate-400">Reading format</dt>
                    <dd className="text-right text-white">Physical · Ebook · Audiobook</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                    <dt className="text-slate-400">Bookora rating mode</dt>
                    <dd className="text-right text-white">0.5 star increments</dd>
                </div>
            </dl>
        </div>
    );
};

export default BookDetailsPanel;