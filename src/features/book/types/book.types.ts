

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

export interface BookViewModel {
    id: string;
    title: string;
    description: string;
    coverUrl?: string;
    authors: string[];
    publishDate: string;
    subjects: string[];
}

// Component props (kept minimal and reusable)

export interface BookCoverPanelProps {
    coverUrl?: string;
    title: string;
    ratingOptions: number[];
    selectedRating: number | null;
    onSelectRating: (rating: number) => void;
}

export interface BookHeroProps {
    title: string;
    authorLabel: string;
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
}