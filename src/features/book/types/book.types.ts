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
}

// Component props (kept minimal and reusable)

export interface BookCoverPanelProps {
    coverUrl?: string;
    title: string;
    rating: number | null;
    onChangeRating: (rating: number) => void;
}

export interface BookHeroProps {
    title: string;
    authorLabel: string;
    series?: BookSeries;
    seriesPositionLabel?: string;
    averageRating?: number;
    ratingsCount?: number;
    reviewsCount?: number;
}

export interface BookActionsProps {
    onAddToLibrary: () => void;
    onWantToRead: () => void;
    onWriteReview: () => void;
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

export interface BookRatingStarsProps {
    value: number | null; // 0.5 steps
    onChange: (value: number) => void;
    size?: "sm" | "md" | "lg";
    readOnly?: boolean;
}