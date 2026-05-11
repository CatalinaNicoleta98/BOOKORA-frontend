import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buildBookDetailsRoute } from "../utils/bookRouting";

import type { SimilarBooksSectionProps } from "../types/book.types";

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

const SimilarBooksSection = ({ books }: SimilarBooksSectionProps) => {
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
    }, [books]);

    if (!books?.length) {
        return null;
    }

    return (
        <section className="border-t border-white/8 pt-6 sm:pt-7">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                    <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                        Similar books
                    </p>
                    <h2 className="theme-title text-[1.05rem] font-semibold sm:text-[1.15rem]">
                        Readers also enjoyed
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleScroll("left")}
                        disabled={!canScrollLeft}
                        className="theme-button-accent inline-flex h-10 w-10 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(2,6,23,0.14)] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500 disabled:shadow-none disabled:opacity-60"
                        aria-label="Scroll similar books left"
                    >
                        <ChevronIcon direction="left" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleScroll("right")}
                        disabled={!canScrollRight}
                        className="theme-button-accent inline-flex h-10 w-10 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(2,6,23,0.14)] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500 disabled:shadow-none disabled:opacity-60"
                        aria-label="Scroll similar books right"
                    >
                        <ChevronIcon direction="right" />
                    </button>
                </div>
            </div>

            <div className="relative mt-5">
                {canScrollLeft ? (
                    <div className="theme-scroll-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-12" />
                ) : null}
                {canScrollRight ? (
                    <div className="theme-scroll-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-12" />
                ) : null}

                <div
                    ref={scrollContainerRef}
                    onScroll={updateScrollState}
                    className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {books.map((book) => (
                        <Link
                            key={book.id}
                            to={buildBookDetailsRoute(book.id)}
                            className="theme-content-panel w-40 shrink-0 space-y-3 rounded-[1.25rem] p-3 transition-colors hover:border-[color:var(--bookora-border-strong)]"
                        >
                            {book.coverUrl ? (
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="aspect-[3/4] w-full rounded-[0.9rem] object-cover shadow-[0_14px_28px_rgba(2,6,23,0.28)]"
                                />
                            ) : (
                                <div className="theme-cover-shell theme-text-muted flex aspect-[3/4] w-full items-center justify-center rounded-[0.9rem] px-4 text-center text-xs font-medium uppercase tracking-[0.18em]">
                                    No cover
                                </div>
                            )}

                            <div className="space-y-1">
                                <h3 className="theme-text line-clamp-2 text-sm font-semibold">
                                    {book.title}
                                </h3>
                                {book.authors?.length ? (
                                    <p className="theme-text-muted line-clamp-2 text-sm">
                                        {book.authors.join(", ")}
                                    </p>
                                ) : null}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimilarBooksSection;
