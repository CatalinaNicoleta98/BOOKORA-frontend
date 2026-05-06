// Core Open Library response types

export interface BookDescriptionValue {
    value: string;
}

export interface BookAuthorReference {
    author?: {
        key?: string;
    };
}

export interface BookData {
    title: string;
    description?: string | BookDescriptionValue;
    covers?: number[];
    authors?: BookAuthorReference[];
    first_publish_date?: string;
    subjects?: string[];
}

// View model types (frontend-safe, normalized)

export interface BookSeries {
    key: string;
    name: string;
}

export interface CommunityRatingSummary {
    average: number;
    ratingsCount: number;
    reviewsCount: number;
}

// Reusable summary types for upcoming sections

export interface BookSummary {
    id: string;
    title: string;
    coverUrl?: string;
    authors?: string[];
    averageRating?: number;
}

export interface EditionSummary {
    id: string;
    title: string;
    coverUrl?: string;
    format?: string; // hardcover, paperback, ebook, audiobook
    publishDate?: string;
    publisher?: string;
    language?: string;
}

export interface AuthorDetails {
    id: string;
    name: string;
    bio?: string;
    photoUrl?: string;
    topWorks?: BookSummary[];
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    content: string;
    createdAt: string;
    source?: "open_library" | "bookora";
    avatarUrl?: string;
    handle?: string;
    author?: {
        id?: string;
        name?: string;
        avatarUrl?: string;
        handle?: string;
    };
    isSpoiler?: boolean;
}

export interface BookReviewCurrentUser {
    id: string;
    name: string;
    avatarUrl?: string;
}

export interface BookUserReviewEntry {
    id: string;
    status: string;
    rating?: number;
    content?: string;
    isSpoiler?: boolean;
    updatedAt?: string;
}

export interface BookViewModel {
    id: string;
    title: string;
    description: string;
    coverUrl?: string;
    authors: string[];
    publishDate: string;
    subjects: string[];
    series?: BookSeries;
    seriesPositionLabel?: string; // e.g. "Book 1"
    averageRating?: number;
    ratingsCount?: number;
    reviewsCount?: number;
    communityRating: CommunityRatingSummary;

    // extended metadata
    pageCount?: number;
    editionCount?: number;
    languages?: string[];
    publishers?: string[];
    publishPlaces?: string[];
    subjectPeople?: string[];
    subjectPlaces?: string[];
    subjectTimes?: string[];
    excerpts?: string[];

    // future sections (Goodreads-style)

    seriesBooks?: BookSummary[];
    editions?: EditionSummary[];
    authorDetails?: AuthorDetails;
    similarBooks?: BookSummary[];
    reviews?: Review[];
}

// Book detail API shapes

export interface BookDetailApiAuthor {
    name: string;
    key?: string;
}

export interface BookDetailApiSeries {
    key: string;
    name: string;
}

export interface BookDetailApiRating {
    average?: number;
    count?: number;
}

export interface BookDetailApiPayload {
    externalBookId: string;
    title: string;
    description?: string;
    cover?: string;
    authors: BookDetailApiAuthor[];
    firstPublishDate?: string;
    subjects: string[];
    series?: BookDetailApiSeries;
    seriesPosition?: string;
    rating?: BookDetailApiRating;
    communityRating?: CommunityRatingSummary;
    reviewsCount?: number;
    pageCount?: number;
    editionCount?: number;
    languages?: string[];
    publishers?: string[];
    publishPlaces?: string[];
    subjectPeople?: string[];
    subjectPlaces?: string[];
    subjectTimes?: string[];
    excerpts?: string[];
    editions?: EditionSummary[];
    authorDetails?: AuthorDetails;
    similarBooks?: BookSummary[];
    reviews?: Review[];
}

export interface BookDetailApiResponse {
    error: string | null;
    data?: BookDetailApiPayload;
}

// Component props (kept minimal and reusable)

export interface BookCoverPanelProps {
    coverUrl?: string;
    title: string;
    rating: number | null;
    readingStatus?: string;
    onChangeRating: (rating: number) => void;
    onEditActivity: () => void;
    onUpdateReadingStatus: (status: string) => Promise<void> | void;
    onRemoveFromLibrary: () => Promise<void> | void;
    isSavingReadingStatus?: boolean;
}

export interface BookHeroProps {
    title: string;
    authorLabel: string;
    series?: BookSeries;
    seriesPositionLabel?: string;
    communityRating: CommunityRatingSummary;
}

export interface BookActionsProps {
    currentStatus?: string;
    onAddToLibrary: (status: string) => Promise<void> | void;
    onWantToRead: () => Promise<void> | void;
    onRemoveFromLibrary: () => Promise<void> | void;
    onWriteReview: () => void;
    isSaving?: boolean;
}

export interface BookAboutSectionProps {
    displayedDescription: string;
    description: string;
    descriptionPreview: string;
    isDescriptionExpanded: boolean;
    onToggleDescription: () => void;
    subjectChips: string[];
}

export interface BookDetailsPanelProps {
    authorLabel: string;
    publishLabel: string;
    pageCount?: number;
    editionCount?: number;
    languages?: string[];
    publishers?: string[];
    publishPlaces?: string[];
    subjectPeople?: string[];
    subjectPlaces?: string[];
    subjectTimes?: string[];
    excerpts?: string[];
}

export interface BookEditionsSectionProps {
    editions?: EditionSummary[];
}

export interface BookAuthorSectionProps {
    authorDetails?: AuthorDetails;
}

export interface SimilarBooksSectionProps {
    books?: BookSummary[];
}

export interface BookReviewsSectionProps {
    reviews?: Review[];
    communityRating: CommunityRatingSummary;
    currentUser?: BookReviewCurrentUser;
    currentUserRating?: number | null;
    currentUserReview?: BookUserReviewEntry;
    onCurrentUserRatingChange: (value: number) => void;
    onOpenReviewEditor: () => void;
}

export interface BookRatingStarsProps {
    value: number | null; // 0.5 steps
    onChange: (value: number) => void;
    size?: "sm" | "md" | "lg";
    readOnly?: boolean;
}
