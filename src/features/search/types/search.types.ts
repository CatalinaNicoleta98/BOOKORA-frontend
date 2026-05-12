export interface SearchParams {
    q?: string;
    author?: string;
    isbn?: string;
    page?: number;
    limit?: number;
}

export interface SearchBookResult {
    source: "open_library";
    externalBookId: string;
    title: string;
    author?: string;
    authorKey?: string;
    cover?: string;
    publishedYear?: number;
    isbn?: string[];
}

export interface SearchBooksResponse {
    results: SearchBookResult[];
    pagination: {
        page: number;
        limit: number;
        numFound: number;
    };
}

export interface ReaderSearchResult {
    id: string;
    handle: string;
    name: string;
    avatarUrl?: string;
    bio?: string;
    matchField: "handle" | "name";
}

export interface ReaderSearchResponse {
    query: string;
    readers: ReaderSearchResult[];
}

export interface CombinedSearchResponse {
    books: SearchBooksResponse;
    readers: ReaderSearchResult[];
}
