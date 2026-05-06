import type {
    AuthorDetails,
    BookData,
    BookDescriptionValue,
    BookDetailApiPayload,
    BookSummary,
    BookViewModel,
    EditionSummary,
    Review,
    CommunityRatingSummary,
} from "../types/book.types";

interface BookDataWithSeries extends BookData {
    series?: string[] | string;
    series_position?: string | number;
}

const slugify = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

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

const getNormalizedText = (value?: string) => {
    const normalizedValue = value?.trim();
    return normalizedValue && normalizedValue.length > 0 ? normalizedValue : undefined;
};

const getDisplaySubjects = (subjects?: string[]) =>
    Array.isArray(subjects)
        ? subjects
              .filter((subject) => !subject.toLowerCase().startsWith("series:"))
              .slice(0, 8)
        : [];

const mapBookSummary = (summary: BookSummary): BookSummary => ({
    id: summary.id,
    title: summary.title,
    coverUrl: summary.coverUrl,
    authors: summary.authors,
    averageRating: summary.averageRating,
});

const mapEditionSummary = (edition: EditionSummary): EditionSummary => ({
    id: edition.id,
    title: edition.title,
    format: edition.format,
    publishDate: edition.publishDate,
    publisher: edition.publisher,
    language: edition.language,
    coverUrl: edition.coverUrl,
});

const mapAuthorDetails = (authorDetails?: AuthorDetails): AuthorDetails | undefined => {
    if (!authorDetails) {
        return undefined;
    }

    return {
        id: authorDetails.id,
        name: authorDetails.name,
        bio: authorDetails.bio,
        photoUrl: authorDetails.photoUrl,
        topWorks: authorDetails.topWorks?.map(mapBookSummary),
    };
};

const mapReview = (review: Review): Review => ({
    id: review.id,
    userName: review.userName || review.author?.name || "Bookora Reader",
    rating: review.rating,
    content: review.content,
    createdAt: review.createdAt,
    source: review.source,
    avatarUrl: review.avatarUrl ?? review.author?.avatarUrl,
    handle: review.handle ?? review.author?.handle,
    author: review.author,
    isSpoiler: review.isSpoiler,
});

export const EMPTY_COMMUNITY_RATING: CommunityRatingSummary = {
    average: 0,
    ratingsCount: 0,
    reviewsCount: 0,
};

const mapCommunityRating = (
    communityRating?: Partial<CommunityRatingSummary>
): CommunityRatingSummary => ({
    average: typeof communityRating?.average === "number" ? communityRating.average : 0,
    ratingsCount:
        typeof communityRating?.ratingsCount === "number" ? communityRating.ratingsCount : 0,
    reviewsCount:
        typeof communityRating?.reviewsCount === "number" ? communityRating.reviewsCount : 0,
});

export const applyUserRatingToCommunityRating = (
    communityRating: CommunityRatingSummary,
    previousRating: number | undefined,
    nextRating: number
): CommunityRatingSummary => {
    const normalizedPreviousRating =
        typeof previousRating === "number" ? previousRating : undefined;
    const nextRatingsCount =
        normalizedPreviousRating === undefined
            ? communityRating.ratingsCount + 1
            : communityRating.ratingsCount;
    const adjustedRatingsTotal =
        communityRating.average * communityRating.ratingsCount -
        (normalizedPreviousRating ?? 0) +
        nextRating;

    return {
        ...communityRating,
        average: nextRatingsCount > 0 ? adjustedRatingsTotal / nextRatingsCount : 0,
        ratingsCount: nextRatingsCount,
    };
};

// Map raw API response to frontend-safe view model
export const mapBookToViewModel = (
    id: string,
    book: BookData,
    authors: string[]
): BookViewModel => {
    const bookWithSeries = book as BookDataWithSeries;
    const rawSeries = bookWithSeries.series;
    const rawSeriesPosition = bookWithSeries.series_position;

    const seriesName = Array.isArray(rawSeries)
        ? rawSeries[0]
        : typeof rawSeries === "string"
        ? rawSeries
        : undefined;

    const series = seriesName
        ? {
              key: slugify(seriesName),
              name: seriesName,
          }
        : undefined;

    const seriesPositionLabel = rawSeriesPosition
        ? `Book ${rawSeriesPosition}`
        : undefined;

    return {
        id,
        title: book.title,
        description: getBookDescription(book.description),
        coverUrl: getCoverUrl(book.covers?.[0]),
        authors,
        publishDate: book.first_publish_date ?? "Unknown publication date",
        subjects: getDisplaySubjects(book.subjects),
        series,
        seriesPositionLabel,
        communityRating: EMPTY_COMMUNITY_RATING,

        // prepared sections (no data yet)
        seriesBooks: undefined,
        editions: undefined,
        authorDetails: undefined,
        similarBooks: undefined,
        reviews: undefined,
    };
};

export const mapBookDetailToViewModel = (payload: BookDetailApiPayload): BookViewModel => {
    const authorNames = payload.authors
        .map((author) => getNormalizedText(author.name))
        .filter((authorName): authorName is string => Boolean(authorName));

    return {
        id: payload.externalBookId,
        title: payload.title,
        description: getNormalizedText(payload.description) ?? "No description available yet.",
        coverUrl: payload.cover ?? undefined,
        authors: authorNames,
        publishDate: payload.firstPublishDate ?? "Unknown publication date",
        subjects: getDisplaySubjects(payload.subjects),
        series: payload.series,
        seriesPositionLabel: payload.seriesPosition ? `#${payload.seriesPosition}` : undefined,
        averageRating: payload.rating?.average,
        ratingsCount: payload.rating?.count,
        reviewsCount: payload.reviewsCount,
        communityRating: mapCommunityRating(payload.communityRating),
        pageCount: payload.pageCount,
        editionCount: payload.editionCount,
        languages: payload.languages,
        publishers: payload.publishers,
        publishPlaces: payload.publishPlaces,
        subjectPeople: payload.subjectPeople,
        subjectPlaces: payload.subjectPlaces,
        subjectTimes: payload.subjectTimes,
        excerpts: payload.excerpts,
        editions: payload.editions?.map(mapEditionSummary),
        authorDetails: mapAuthorDetails(payload.authorDetails),
        similarBooks: payload.similarBooks?.map(mapBookSummary),
        reviews: payload.reviews?.map(mapReview),
    };
};

// Create description preview (for collapsed state)
export const createDescriptionPreview = (description: string, maxLength = 420): string => {
    if (description.length <= maxLength) {
        return description;
    }

    return `${description.slice(0, maxLength).trimEnd()}...`;
};
