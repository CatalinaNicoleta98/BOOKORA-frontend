import { useState } from "react";

import type { BookRatingStarsProps } from "../types/book.types";

const TOTAL_STARS = 5;

const sizeClassMap: Record<NonNullable<BookRatingStarsProps["size"]>, string> = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-9 w-9",
};

const gapClassMap: Record<NonNullable<BookRatingStarsProps["size"]>, string> = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
};

const StarSvg = ({ className }: { className: string }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 2.75l2.91 5.9 6.51.95-4.71 4.59 1.11 6.49L12 17.62l-5.82 3.06 1.11-6.49-4.71-4.59 6.51-.95L12 2.75z" />
        </svg>
    );
};

const getStarFillPercentage = (value: number, starNumber: number): number => {
    if (value >= starNumber) {
        return 100;
    }

    if (value >= starNumber - 0.5) {
        return 50;
    }

    return 0;
};

const BookRatingStars = ({
    value,
    onChange,
    size = "md",
    readOnly = false,
}: BookRatingStarsProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const resolvedSizeClass = sizeClassMap[size];
    const resolvedGapClass = gapClassMap[size];
    const selectedValue = value ?? 0;
    const displayValue = hoverValue ?? selectedValue;

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverValue(null);
        }
    };

    return (
        <div
            className={`inline-flex items-center ${resolvedGapClass}`}
            onMouseLeave={handleMouseLeave}
            role={readOnly ? undefined : "radiogroup"}
            aria-label={readOnly ? `Rating: ${selectedValue} stars` : "Rate this book"}
        >
            {Array.from({ length: TOTAL_STARS }, (_, index) => {
                const starNumber = index + 1;
                const fillPercentage = getStarFillPercentage(displayValue, starNumber);
                const leftValue = starNumber - 0.5;
                const rightValue = starNumber;

                return (
                    <div key={starNumber} className={`relative ${resolvedSizeClass}`}>
                        <StarSvg className="theme-star-base absolute inset-0 h-full w-full" />

                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                        >
                            <StarSvg className="theme-star-fill h-full w-full" />
                        </div>

                        <div className="relative h-full w-full opacity-0">
                            <StarSvg className="h-full w-full" />
                        </div>

                        {!readOnly ? (
                            <>
                                <button
                                    type="button"
                                    aria-label={`Rate ${leftValue} ${leftValue === 1 ? "star" : "stars"}`}
                                    onMouseEnter={() => setHoverValue(leftValue)}
                                    onClick={() => onChange(leftValue)}
                                    className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
                                />
                                <button
                                    type="button"
                                    aria-label={`Rate ${rightValue} ${rightValue === 1 ? "star" : "stars"}`}
                                    onMouseEnter={() => setHoverValue(rightValue)}
                                    onClick={() => onChange(rightValue)}
                                    className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
                                />
                            </>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default BookRatingStars;
