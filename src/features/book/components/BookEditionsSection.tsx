import { useEffect, useRef, useState } from "react";

import type { BookEditionsSectionProps } from "../types/book.types";

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
    <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M7 4l6 6-6 6" />
    </svg>
);

const BookEditionsSection = ({ editions }: BookEditionsSectionProps) => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const container = scrollContainerRef.current;

        if (!container) {
            return;
        }

        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        setCanScrollLeft(container.scrollLeft > 8);
        setCanScrollRight(container.scrollLeft < maxScrollLeft - 8);
    };

    const handleScroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;

        if (!container) {
            return;
        }

        const scrollOffset = Math.max(container.clientWidth * 0.8, 220);
        const nextOffset = direction === "left" ? -scrollOffset : scrollOffset;

        container.scrollBy({
            left: nextOffset,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        updateScrollState();

        const handleResize = () => {
            updateScrollState();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [editions]);

    if (!editions?.length) {
        return null;
    }

    return (
        <section className="border-t border-white/8 pt-6 sm:pt-7">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        More editions
                    </p>
                    <h2 className="text-[1.05rem] font-semibold text-white sm:text-[1.15rem]">
                        Other available editions
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleScroll("left")}
                        disabled={!canScrollLeft}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/20 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(148,163,184,0.08))] text-amber-100 shadow-[0_10px_30px_rgba(2,6,23,0.28)] transition-all hover:border-amber-200/35 hover:bg-[linear-gradient(180deg,rgba(251,191,36,0.22),rgba(148,163,184,0.12))] hover:text-white disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500 disabled:shadow-none disabled:opacity-60"
                        aria-label="Scroll editions left"
                    >
                        <ChevronIcon direction="left" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleScroll("right")}
                        disabled={!canScrollRight}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/20 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(148,163,184,0.08))] text-amber-100 shadow-[0_10px_30px_rgba(2,6,23,0.28)] transition-all hover:border-amber-200/35 hover:bg-[linear-gradient(180deg,rgba(251,191,36,0.22),rgba(148,163,184,0.12))] hover:text-white disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500 disabled:shadow-none disabled:opacity-60"
                        aria-label="Scroll editions right"
                    >
                        <ChevronIcon direction="right" />
                    </button>
                </div>
            </div>

            <div className="relative mt-5">
                {canScrollLeft ? (
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#060816] via-[#060816]/70 to-transparent" />
                ) : null}
                {canScrollRight ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#060816] via-[#060816]/70 to-transparent" />
                ) : null}

                <div
                    ref={scrollContainerRef}
                    onScroll={updateScrollState}
                    className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {editions.map((edition) => (
                        <article
                            key={edition.id}
                            className="w-56 shrink-0 rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.52),rgba(15,23,42,0.28))] p-4"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Edition
                            </p>

                            <h3 className="mt-2 text-sm font-semibold text-slate-100">
                                {edition.format ?? "Unknown format"}
                            </h3>

                            <div className="mt-2 space-y-1 text-sm text-slate-300">
                                {edition.publishDate ? <p>{edition.publishDate}</p> : null}
                                {edition.publisher ? <p>{edition.publisher}</p> : null}
                                {edition.language ? <p>{edition.language}</p> : null}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookEditionsSection;
