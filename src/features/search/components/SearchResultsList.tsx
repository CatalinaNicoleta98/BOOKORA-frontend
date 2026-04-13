

import SearchReasultsCard from "./SearchReasultsCard";

interface SearchResultItem {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    publishYear?: string;
    averageRating?: number;
    ratingsCount?: number;
    readsCount?: number;
}

interface SearchResultsListProps {
    results: SearchResultItem[];
}

const SearchResultsList = ({ results }: SearchResultsListProps) => {
    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-4">
            {results.map((result) => (
                <SearchReasultsCard
                    key={result.id}
                    id={result.id}
                    title={result.title}
                    author={result.author}
                    coverUrl={result.coverUrl}
                    publishYear={result.publishYear}
                    averageRating={result.averageRating}
                    ratingsCount={result.ratingsCount}
                    readsCount={result.readsCount}
                />
            ))}
        </div>
    );
};

export default SearchResultsList;