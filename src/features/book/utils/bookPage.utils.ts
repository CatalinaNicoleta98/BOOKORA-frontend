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
    editionKey: edition.editionKey,
    workKey: edition.workKey,
    title: edition.title,
    format: edition.format,
    publishDate: edition.publishDate,
    publishedYear: edition.publishedYear,
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

    const normalizedSeriesName = getNormalizedText(seriesName);

    const series = normalizedSeriesName
        ? {
              key: normalizedSeriesName,
              name: normalizedSeriesName,
          }
        : undefined;

    const seriesPositionLabel = rawSeriesPosition
        ? `Book ${rawSeriesPosition}`
        : undefined;

    return {
        id,
        routeKey: id,
        title: book.title,
        description: getBookDescription(book.description),
        coverUrl: getCoverUrl(book.covers?.[0]),
        authors,
        authorCredits: authors.map((authorName) => ({ name: authorName })),
        publishDate: book.first_publish_date ?? "Unknown publication date",
        subjects: getDisplaySubjects(book.subjects),
        series,
        seriesPositionLabel,
        communityRating: EMPTY_COMMUNITY_RATING,

        // prepared sections (no data yet)
        seriesBooks: undefined,
        selectedEdition: undefined,
        editions: undefined,
        authorDetails: undefined,
        similarBooks: undefined,
        reviews: undefined,
    };
};

export const mapBookDetailToViewModel = (payload: BookDetailApiPayload): BookViewModel => {
    const normalizedAuthors = Array.isArray(payload.authors) ? payload.authors : [];

    const authorNames = normalizedAuthors
        .map((author) => getNormalizedText(author.name))
        .filter((authorName): authorName is string => Boolean(authorName));
    const authorCredits = normalizedAuthors
        .map((author) => {
            const normalizedName = getNormalizedText(author.name);

            if (!normalizedName) {
                return undefined;
            }

            return {
                name: normalizedName,
                key: getNormalizedText(author.key),
            };
        })
        .filter((author): author is NonNullable<typeof author> => Boolean(author));

    return {
        id: payload.workKey,
        routeKey: payload.requestedKey,
        editionKey: payload.editionKey,
        title: payload.title,
        description: getNormalizedText(payload.description) ?? "No description available yet.",
        coverUrl: payload.cover ?? undefined,
        authors: authorNames,
        authorCredits,
        publishDate: payload.firstPublishDate ?? "Unknown publication date",
        subjects: getDisplaySubjects(payload.subjects ?? []),
        series: payload.series,
        seriesPositionLabel: payload.seriesPosition ? `#${payload.seriesPosition}` : undefined,
        averageRating: payload.rating?.average,
        ratingsCount: payload.rating?.count,
        reviewsCount: payload.reviewsCount,
        communityRating: mapCommunityRating(payload.communityRating),
        pageCount: payload.pageCount,
        editionCount: payload.editionCount,
        languages: payload.languages ?? [],
        publishers: payload.publishers ?? [],
        publishPlaces: payload.publishPlaces ?? [],
        subjectPeople: payload.subjectPeople ?? [],
        subjectPlaces: payload.subjectPlaces ?? [],
        subjectTimes: payload.subjectTimes ?? [],
        excerpts: payload.excerpts ?? [],
        selectedEdition: payload.selectedEdition ? mapEditionSummary(payload.selectedEdition) : undefined,
        editions: payload.editions?.map(mapEditionSummary) ?? [],
        authorDetails: mapAuthorDetails(payload.authorDetails),
        similarBooks: payload.similarBooks?.map(mapBookSummary) ?? [],
        reviews: payload.reviews?.map(mapReview) ?? [],
    };
};

// Create description preview (for collapsed state)
export const createDescriptionPreview = (description: string, maxLength = 420): string => {
    if (description.length <= maxLength) {
        return description;
    }

    return `${description.slice(0, maxLength).trimEnd()}...`;
};
