export interface BrowseGenreDefinition {
    slug: string;
    title: string;
    query: string;
    description: string;
}

export interface BrowseBookCardViewModel {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    publishedYear?: number;
}

export interface BrowseGenreSectionViewModel {
    genre: BrowseGenreDefinition;
    books: BrowseBookCardViewModel[];
}
