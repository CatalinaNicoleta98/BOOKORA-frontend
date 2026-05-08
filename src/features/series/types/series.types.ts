export interface SeriesBookAuthorViewModel {
    key?: string;
    name: string;
}

export interface SeriesBookViewModel {
    key: string;
    title: string;
    coverUrl?: string;
    firstPublishYear?: number;
    description?: string;
    authors: SeriesBookAuthorViewModel[];
    position?: string | number;
}

export interface SeriesDetailsViewModel {
    key: string;
    title: string;
    description?: string;
    bookCount: number;
    books: SeriesBookViewModel[];
}

export interface SeriesDetailsApiEnvelope {
    error: string | null;
    data?: SeriesDetailsViewModel;
    message?: string;
}
