

import type { BookAboutSectionProps } from "../types/book.types";

const BookAboutSection = ({
    displayedDescription,
    description,
    descriptionPreview,
    isDescriptionExpanded,
    onToggleDescription,
    subjectChips,
}: BookAboutSectionProps) => {
    return (
        <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020]/70 p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">About this book</h2>
                {description.length > descriptionPreview.length ? (
                    <button
                        type="button"
                        onClick={onToggleDescription}
                        className="text-sm font-medium text-amber-200 transition-colors duration-300 hover:text-amber-100"
                    >
                        {isDescriptionExpanded ? "Show less" : "Show more"}
                    </button>
                ) : null}
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                {displayedDescription}
            </p>

            {subjectChips.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                    {subjectChips.map((subject) => (
                        <span
                            key={subject}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-300"
                        >
                            {subject}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default BookAboutSection;