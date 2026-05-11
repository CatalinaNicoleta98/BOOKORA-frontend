import AuthorBookCard from "./AuthorBookCard";
import type { AuthorSeriesGroupViewModel } from "../types/author.types";

interface AuthorSeriesGroupProps {
    group: AuthorSeriesGroupViewModel;
    isSeriesNavigationEnabled?: boolean;
}

const AuthorSeriesGroup = ({
    group,
    isSeriesNavigationEnabled = false,
}: AuthorSeriesGroupProps) => {
    return (
        <section className="theme-glass-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-2">
                    <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                        Series
                    </p>
                    <h2 className="theme-title mt-2 text-xl font-semibold">{group.seriesTitle}</h2>
                    <p className="theme-text-soft text-sm">
                        Reading order collected for this author's books in the series.
                    </p>
                </div>
                <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
                        isSeriesNavigationEnabled
                            ? "theme-button-ghost"
                            : "theme-pill-subtle"
                    }`}
                >
                    {group.books.length} book{group.books.length === 1 ? "" : "s"}
                </span>
            </div>

            <div className="mt-5 grid gap-3.5 min-[480px]:grid-cols-2 xl:grid-cols-4">
                {group.books.map((book) => (
                    <AuthorBookCard key={book.key} book={book} />
                ))}
            </div>
        </section>
    );
};

export default AuthorSeriesGroup;
