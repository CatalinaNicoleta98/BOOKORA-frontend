

export interface SearchResultItem {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    publishYear?: string;
    description?: string;
    averageRating?: number;
    ratingsCount?: number;
    readsCount?: number;
}

export interface SearchPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const getBookId = (rawBook: Record<string, unknown>, index: number) => {
    if (typeof rawBook.key === "string") return rawBook.key;
    if (typeof rawBook.externalBookId === "string") return rawBook.externalBookId;
    if (typeof rawBook.id === "string") return rawBook.id;
    return `book-${index}`;
};

const getBookAuthor = (rawBook: Record<string, unknown>) => {
    if (typeof rawBook.author === "string") return rawBook.author;

    if (Array.isArray(rawBook.author_name) && typeof rawBook.author_name[0] === "string") {
        return rawBook.author_name[0];
    }

    return "Unknown author";
};

export const getBookCoverUrl = (rawBook: Record<string, unknown>) => {
    if (typeof rawBook.cover === "string" && rawBook.cover.trim().length > 0) {
        return rawBook.cover;
    }

    if (typeof rawBook.coverUrl === "string" && rawBook.coverUrl.trim().length > 0) {
        return rawBook.coverUrl;
    }

    const coverId =
        typeof rawBook.cover_i === "number"
            ? rawBook.cover_i
            : typeof rawBook.coverId === "number"
                ? rawBook.coverId
                : typeof rawBook.cover_id === "number"
                    ? rawBook.cover_id
                    : undefined;

    if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }

    return undefined;
};

export const getBookDescription = (rawBook: Record<string, unknown>) => {
    const descriptionValue = rawBook.description;
    const firstSentenceValue = rawBook.first_sentence;

    const text =
        typeof descriptionValue === "string"
            ? descriptionValue
            : descriptionValue &&
              typeof descriptionValue === "object" &&
              typeof (descriptionValue as { value?: unknown }).value === "string"
                ? (descriptionValue as { value: string }).value
                : typeof firstSentenceValue === "string"
                    ? firstSentenceValue
                    : Array.isArray(firstSentenceValue) && typeof firstSentenceValue[0] === "string"
                        ? firstSentenceValue[0]
                        : typeof rawBook.subtitle === "string"
                            ? rawBook.subtitle
                            : undefined;

    if (!text || text.trim().length === 0) {
        return undefined;
    }

    const normalizedText = text.trim();

    return normalizedText.length > 220
        ? `${normalizedText.slice(0, 220).trimEnd()}...`
        : normalizedText;
};

export const normalizeSearchResults = (rawResponse: unknown): SearchResultItem[] => {
    if (!rawResponse || typeof rawResponse !== "object") {
        return [];
    }

    const responseRecord = rawResponse as Record<string, unknown>;
    const responseData =
        responseRecord.data && typeof responseRecord.data === "object"
            ? (responseRecord.data as Record<string, unknown>)
            : undefined;

    const rawItems = Array.isArray(responseRecord.results)
        ? responseRecord.results
        : Array.isArray(responseRecord.data)
            ? responseRecord.data
            : Array.isArray(responseRecord.docs)
                ? responseRecord.docs
                : Array.isArray(responseData?.docs)
                    ? (responseData.docs as unknown[])
                    : Array.isArray(responseData?.books)
                        ? (responseData.books as unknown[])
                        : [];

    return rawItems
        .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
        .map((item, index) => ({
            id: getBookId(item, index),
            title:
                typeof item.title === "string" && item.title.trim().length > 0
                    ? item.title
                    : "Untitled book",
            author: getBookAuthor(item),
            coverUrl: getBookCoverUrl(item),
            publishYear:
                typeof item.first_publish_year === "number"
                    ? String(item.first_publish_year)
                    : typeof item.publishYear === "string"
                        ? item.publishYear
                        : undefined,
            description: getBookDescription(item),
            averageRating:
                typeof item.averageRating === "number"
                    ? item.averageRating
                    : typeof item.ratings_average === "number"
                        ? item.ratings_average
                        : undefined,
            ratingsCount:
                typeof item.ratingsCount === "number"
                    ? item.ratingsCount
                    : typeof item.ratings_count === "number"
                        ? item.ratings_count
                        : undefined,
            readsCount:
                typeof item.readsCount === "number"
                    ? item.readsCount
                    : typeof item.want_to_read_count === "number"
                        ? item.want_to_read_count
                        : undefined
        }));
};

export const normalizeSearchPagination = (
    rawResponse: unknown,
    fallbackPage: number,
    fallbackLimit: number,
    resultsLength: number
): SearchPagination => {
    if (!rawResponse || typeof rawResponse !== "object") {
        return {
            page: fallbackPage,
            limit: fallbackLimit,
            total: resultsLength,
            totalPages: resultsLength > 0 ? 1 : 0
        };
    }

    const responseRecord = rawResponse as Record<string, unknown>;
    const paginationRecord =
        responseRecord.pagination && typeof responseRecord.pagination === "object"
            ? (responseRecord.pagination as Record<string, unknown>)
            : undefined;

    const resolvedPage =
        typeof paginationRecord?.page === "number" && Number.isFinite(paginationRecord.page)
            ? paginationRecord.page
            : fallbackPage;

    const resolvedLimit =
        typeof paginationRecord?.limit === "number" && Number.isFinite(paginationRecord.limit)
            ? paginationRecord.limit
            : fallbackLimit;

    const resolvedTotal =
        typeof paginationRecord?.total === "number" && Number.isFinite(paginationRecord.total)
            ? paginationRecord.total
            : typeof paginationRecord?.numFound === "number" && Number.isFinite(paginationRecord.numFound)
                ? paginationRecord.numFound
                : resultsLength;

    const resolvedTotalPages =
        typeof paginationRecord?.totalPages === "number" && Number.isFinite(paginationRecord.totalPages)
            ? paginationRecord.totalPages
            : resolvedLimit > 0
                ? Math.ceil(resolvedTotal / resolvedLimit)
                : 0;

    return {
        page: Math.max(1, resolvedPage),
        limit: Math.max(1, resolvedLimit),
        total: Math.max(0, resolvedTotal),
        totalPages: Math.max(0, resolvedTotalPages)
    };
};