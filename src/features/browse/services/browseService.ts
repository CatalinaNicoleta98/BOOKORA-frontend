import { searchBooks } from "../../search/services/searchService";
import type {
    BrowseBookCardViewModel,
    BrowseGenreDefinition,
    BrowseGenreResultsViewModel,
    BrowseGenreSectionViewModel,
} from "../types/browse.types";
import { BROWSE_GENRES } from "../utils/browseGenres";

const BROWSE_SECTION_LIMIT = 6;

const mapSearchResultToBrowseBook = (result: {
    externalBookId: string;
    title: string;
    author?: string;
    cover?: string;
    publishedYear?: number;
}): BrowseBookCardViewModel => ({
    id: result.externalBookId,
    title: result.title,
    author: result.author ?? "Unknown author",
    coverUrl: result.cover,
    publishedYear: result.publishedYear,
});

export const getBrowseSections = async (): Promise<BrowseGenreSectionViewModel[]> => {
    const sectionResults = await Promise.all(
        BROWSE_GENRES.map(async (genre) => {
            const response = await searchBooks({
                q: genre.query,
                limit: BROWSE_SECTION_LIMIT,
                page: 1,
            });

            return {
                genre,
                books: response.results.map(mapSearchResultToBrowseBook),
            };
        })
    );

    return sectionResults;
};

export const getBrowseGenreBooks = async (
    genre: BrowseGenreDefinition,
    page = 1,
    limit = 18
): Promise<BrowseGenreResultsViewModel> => {
    const response = await searchBooks({
        q: genre.query,
        page,
        limit,
    });

    const total = response.pagination.numFound ?? response.results.length;

    return {
        genre,
        books: response.results.map(mapSearchResultToBrowseBook),
        page: response.pagination.page,
        limit: response.pagination.limit,
        total,
        hasMore: response.pagination.page * response.pagination.limit < total,
    };
};
