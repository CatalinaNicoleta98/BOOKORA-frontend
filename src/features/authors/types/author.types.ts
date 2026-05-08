export interface AuthorBookCardViewModel {
    key: string;
    title: string;
    coverUrl?: string;
    firstPublishYear?: number;
    description?: string;
    seriesTitle?: string;
    seriesPosition?: string | number;
}

export interface AuthorSeriesGroupViewModel {
    seriesKey: string;
    seriesTitle: string;
    books: AuthorBookCardViewModel[];
}

export interface AuthorDetailsViewModel {
    key: string;
    name: string;
    photoUrl?: string;
    bio?: string;
    birthDate?: string;
    deathDate?: string;
    topSubjects: string[];
    links: {
        openLibrary?: string;
        wikipedia?: string;
    };
    seriesGroups: AuthorSeriesGroupViewModel[];
    standaloneBooks: AuthorBookCardViewModel[];
}

export interface AuthorDetailsApiEnvelope {
    error: string | null;
    data?: AuthorDetailsViewModel;
    message?: string;
}
