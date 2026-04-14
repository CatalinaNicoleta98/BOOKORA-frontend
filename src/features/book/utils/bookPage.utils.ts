
import type { BookData, BookDescriptionValue, BookViewModel } from "../types/book.types";

// Normalize description from Open Library
export const getBookDescription = (
    description?: string | BookDescriptionValue
): string => {
    if (typeof description === "string" && description.trim().length > 0) {
        return description.trim();
    }

    if (
        description &&
        typeof description === "object" &&
        typeof description.value === "string" &&
        description.value.trim().length > 0
    ) {
        return description.value.trim();
    }

    return "No description available yet for this book.";
};

// Build cover URL from Open Library cover id
export const getCoverUrl = (coverId?: number): string | undefined => {
    if (!coverId) {
        return undefined;
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
};

// Map raw API response to frontend-safe view model
export const mapBookToViewModel = (
    id: string,
    book: BookData,
    authors: string[]
): BookViewModel => {
    return {
        id,
        title: book.title,
        description: getBookDescription(book.description),
        coverUrl: getCoverUrl(book.covers?.[0]),
        authors,
        publishDate: book.first_publish_date ?? "Unknown publication date",
        subjects: (book.subjects ?? []).slice(0, 8),
    };
};

// Create description preview (for collapsed state)
export const createDescriptionPreview = (description: string, maxLength = 420): string => {
    if (description.length <= maxLength) {
        return description;
    }

    return `${description.slice(0, maxLength).trimEnd()}...`;
};