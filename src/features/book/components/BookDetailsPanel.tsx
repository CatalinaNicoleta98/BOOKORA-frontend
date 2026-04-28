import { useMemo, useState } from "react";

import type { BookDetailsPanelProps } from "../types/book.types";

interface DetailRow {
    label: string;
    value: string;
}

const formatListValue = (values?: string[], limit = 3) => {
    if (!Array.isArray(values)) {
        return undefined;
    }

    const normalizedValues = values
        .map((value) => value.trim())
        .filter((value) => value.length > 0);

    if (normalizedValues.length === 0) {
        return undefined;
    }

    return normalizedValues.slice(0, limit).join(" · ");
};

const BookDetailsPanel = ({
    authorLabel,
    publishLabel,
    pageCount,
    editionCount,
    languages,
    publishers,
    publishPlaces,
    subjectPeople,
    subjectPlaces,
    subjectTimes,
    excerpts,
}: BookDetailsPanelProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const detailRows = useMemo<DetailRow[]>(() => {
        const rows: Array<DetailRow | null> = [
            authorLabel
                ? {
                      label: "Author",
                      value: authorLabel,
                  }
                : null,
            publishLabel
                ? {
                      label: "First published",
                      value: publishLabel,
                  }
                : null,
            typeof pageCount === "number"
                ? {
                      label: "Pages",
                      value: String(pageCount),
                  }
                : null,
            typeof editionCount === "number"
                ? {
                      label: "Editions",
                      value: String(editionCount),
                  }
                : null,
            formatListValue(languages)
                ? {
                      label: "Languages",
                      value: formatListValue(languages)!,
                  }
                : null,
            formatListValue(publishers)
                ? {
                      label: "Publishers",
                      value: formatListValue(publishers)!,
                  }
                : null,
            formatListValue(publishPlaces)
                ? {
                      label: "Published in",
                      value: formatListValue(publishPlaces)!,
                  }
                : null,
            formatListValue(subjectPeople)
                ? {
                      label: "Characters",
                      value: formatListValue(subjectPeople)!,
                  }
                : null,
            formatListValue(subjectPlaces)
                ? {
                      label: "Places",
                      value: formatListValue(subjectPlaces)!,
                  }
                : null,
            formatListValue(subjectTimes)
                ? {
                      label: "Time period",
                      value: formatListValue(subjectTimes)!,
                  }
                : null,
            formatListValue(excerpts, 1)
                ? {
                      label: "Excerpt",
                      value: formatListValue(excerpts, 1)!,
                  }
                : null,
        ];

        return rows.filter((row): row is DetailRow => Boolean(row));
    }, [
        authorLabel,
        publishLabel,
        pageCount,
        editionCount,
        languages,
        publishers,
        publishPlaces,
        subjectPeople,
        subjectPlaces,
        subjectTimes,
        excerpts,
    ]);

    if (detailRows.length === 0) {
        return null;
    }

    const expandedRows = detailRows.slice(0, 6);

    return (
        <section className="w-full border-t border-white/8 pt-6 sm:pt-7">
            <div className="space-y-2">
                <h2 className="text-[1.05rem] font-semibold text-white sm:text-[1.15rem]">
                    Book details
                </h2>

                <button
                    type="button"
                    onClick={() => setIsExpanded((currentValue) => !currentValue)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    aria-expanded={isExpanded}
                >
                    <span>{isExpanded ? "Show less" : "Show details"}</span>
                    <span className={`transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}>
                        ▼
                    </span>
                </button>
            </div>

            {isExpanded ? (
                <dl className="mt-5 space-y-4">
                    {expandedRows.map((row) => (
                        <div
                            key={row.label}
                            className="grid gap-1 border-b border-white/6 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
                        >
                            <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                {row.label}
                            </dt>
                            <dd className="text-sm leading-6 text-slate-200 sm:text-[0.95rem]">
                                {row.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            ) : null}
        </section>
    );
};

export default BookDetailsPanel;
