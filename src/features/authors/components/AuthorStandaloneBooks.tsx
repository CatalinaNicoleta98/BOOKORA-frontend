import AuthorBookCard from "./AuthorBookCard";
import type { AuthorBookCardViewModel } from "../types/author.types";

interface AuthorStandaloneBooksProps {
    books: AuthorBookCardViewModel[];
}

const AuthorStandaloneBooks = ({ books }: AuthorStandaloneBooksProps) => {
    if (!books.length) {
        return null;
    }

    return (
        <section className="theme-glass-panel rounded-[2rem] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                        Standalone books
                    </p>
                    <h2 className="theme-title mt-2 text-xl font-semibold">Single-title works</h2>
                </div>
                <span className="theme-pill-subtle rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                    {books.length} book{books.length === 1 ? "" : "s"}
                </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {books.map((book) => (
                    <AuthorBookCard key={book.key} book={book} />
                ))}
            </div>
        </section>
    );
};

export default AuthorStandaloneBooks;
