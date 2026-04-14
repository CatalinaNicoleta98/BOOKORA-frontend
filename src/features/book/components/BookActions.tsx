import type { BookActionsProps } from "../types/book.types";

const BookActions = ({ onAddToLibrary, onWantToRead, onWriteReview }: BookActionsProps) => {
    return (
        <div className="mt-6 flex flex-wrap gap-3">
            <button
                type="button"
                onClick={onAddToLibrary}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 px-5 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/14"
            >
                Add to library
            </button>
            <button
                type="button"
                onClick={onWantToRead}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-5 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
            >
                Want to read
            </button>
            <button
                type="button"
                onClick={onWriteReview}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-5 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
            >
                Write review
            </button>
        </div>
    );
};

export default BookActions;
