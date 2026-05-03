

interface SearchPaginationProps {
    currentPage: number;
    totalPages: number;
    visiblePages: number[];
    onPageChange: (page: number) => void;
}

const SearchPagination = ({
    currentPage,
    totalPages,
    visiblePages,
    onPageChange
}: SearchPaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            {visiblePages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    onClick={() => onPageChange(pageNumber)}
                    aria-current={pageNumber === currentPage ? "page" : undefined}
                    className={`inline-flex h-11 min-w-11 items-center justify-center rounded-2xl border px-4 text-sm font-medium transition-all duration-300 ${
                        pageNumber === currentPage
                            ? "border-amber-200/30 bg-amber-200/12 text-amber-100"
                            : "theme-button-ghost"
                    }`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

export default SearchPagination;
