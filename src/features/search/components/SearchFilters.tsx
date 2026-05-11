

import { useMemo } from "react";

export type SearchMode = "all" | "title" | "author";

interface SearchFiltersProps {
    mode: SearchMode;
    onChange: (mode: SearchMode) => void;
}

const FILTER_OPTIONS: { label: string; value: SearchMode }[] = [
    { label: "All", value: "all" },
    { label: "Title", value: "title" },
    { label: "Author", value: "author" }
];

const SearchFilters = ({ mode, onChange }: SearchFiltersProps) => {
    const options = useMemo(() => FILTER_OPTIONS, []);

    return (
        <div className="flex flex-wrap items-center gap-2">
            {options.map((option) => {
                const isActive = option.value === mode;

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`inline-flex h-10 items-center justify-center rounded-2xl border px-4 text-sm font-medium transition-all duration-300 ${
                            isActive
                                ? "theme-button-accent shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                                : "theme-button-ghost"
                        }`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default SearchFilters;
