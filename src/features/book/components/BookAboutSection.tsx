

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
        <div className="theme-content-panel rounded-[1.75rem] p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="theme-title text-lg font-semibold">About this book</h2>
                {description.length > descriptionPreview.length ? (
                    <button
                        type="button"
                        onClick={onToggleDescription}
                        className="theme-accent-text text-sm font-medium transition-colors duration-300 hover:text-[var(--bookora-title)]"
                    >
                        {isDescriptionExpanded ? "Show less" : "Show more"}
                    </button>
                ) : null}
            </div>

            <p className="theme-text-soft mt-4 max-w-3xl text-sm leading-7">
                {displayedDescription}
            </p>

            {subjectChips.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                    {subjectChips.map((subject) => (
                        <span
                            key={subject}
                            className="theme-pill-subtle rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]"
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
