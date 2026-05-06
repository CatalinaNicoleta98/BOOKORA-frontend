import { httpClient } from "../../../shared/api/httpClient";
import type { BookDetailApiResponse, BookUserReviewEntry } from "../types/book.types";

interface LibraryEntryApiResponse {
    data: LibraryEntryRecord[];
}

interface LibraryEntryRecord {
    _id: string;
    externalBookId?: string;
    status: string;
    rating?: number;
    notes?: string;
    reviewText?: string;
    isSpoiler?: boolean;
    updatedAt?: string;
}

interface SaveBookReviewInput {
    externalBookId: string;
    title: string;
    author?: string;
    cover?: string;
    publishedYear?: number;
    rating?: number;
    reviewText?: string;
}

const BOOK_BASE_PATH = "/books";
const LIBRARY_BASE_PATH = "/library";
const DEFAULT_IN_PROGRESS_STATUS = "currently_reading";
const DEFAULT_FINISHED_READING_STATUS = "finished_reading";
const DEFAULT_FINISHED_LISTENING_STATUS = "finished_listening";

const mapLibraryEntryToUserReview = (entry: LibraryEntryRecord): BookUserReviewEntry => ({
    id: entry._id,
    status: entry.status,
    rating: entry.rating,
    content: entry.reviewText,
    isSpoiler: entry.isSpoiler ?? false,
    updatedAt: entry.updatedAt,
});

const getStatusForSavedReview = (status?: string, rating?: number): string => {
    if (rating === undefined) {
        return status || DEFAULT_IN_PROGRESS_STATUS;
    }

    if (status === "currently_listening" || status === DEFAULT_FINISHED_LISTENING_STATUS) {
        return DEFAULT_FINISHED_LISTENING_STATUS;
    }

    return DEFAULT_FINISHED_READING_STATUS;
};

export const getBookDetail = async (bookId: string): Promise<BookDetailApiResponse> => {
    const response = await httpClient.get<BookDetailApiResponse>(
        `${BOOK_BASE_PATH}/${encodeURIComponent(bookId)}`
    );

    return response.data;
};

export const getCurrentUserBookReview = async (
    externalBookId: string
): Promise<BookUserReviewEntry | null> => {
    const response = await httpClient.get<LibraryEntryApiResponse>(LIBRARY_BASE_PATH);
    const matchingEntry = response.data.data.find((entry) => entry.externalBookId === externalBookId);

    return matchingEntry ? mapLibraryEntryToUserReview(matchingEntry) : null;
};

export const saveCurrentUserBookReview = async ({
    externalBookId,
    title,
    author,
    cover,
    publishedYear,
    rating,
    reviewText,
}: SaveBookReviewInput): Promise<BookUserReviewEntry> => {
    const existingEntry = await getCurrentUserBookReview(externalBookId);

    if (existingEntry) {
        const response = await httpClient.put<LibraryEntryRecord>(
            `${LIBRARY_BASE_PATH}/${existingEntry.id}`,
            {
                status: getStatusForSavedReview(existingEntry.status, rating),
                rating,
                reviewText,
            }
        );

        return mapLibraryEntryToUserReview(response.data);
    }

    const response = await httpClient.post<LibraryEntryRecord>(
        LIBRARY_BASE_PATH,
        {
            bookSource: "open_library",
            externalBookId,
            title,
            author,
            cover,
            publishedYear,
            status: getStatusForSavedReview(undefined, rating),
            rating,
            reviewText,
        }
    );

    return mapLibraryEntryToUserReview(response.data);
};
