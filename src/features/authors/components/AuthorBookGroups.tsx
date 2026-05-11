import AuthorSeriesGroup from "./AuthorSeriesGroup";
import AuthorStandaloneBooks from "./AuthorStandaloneBooks";
import type { AuthorBookCardViewModel, AuthorSeriesGroupViewModel } from "../types/author.types";

interface AuthorBookGroupsProps {
    seriesGroups: AuthorSeriesGroupViewModel[];
    standaloneBooks: AuthorBookCardViewModel[];
}

const AuthorBookGroups = ({ seriesGroups, standaloneBooks }: AuthorBookGroupsProps) => {
    if (!seriesGroups.length && !standaloneBooks.length) {
        return (
            <section className="theme-glass-panel rounded-[2rem] p-8 text-center">
                <p className="theme-title text-lg font-semibold">No books found</p>
                <p className="theme-text-muted mt-3 text-sm leading-7">
                    We could not find any works for this author yet.
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-6">
            {seriesGroups.map((group) => (
                <AuthorSeriesGroup key={group.seriesKey} group={group} />
            ))}

            <AuthorStandaloneBooks books={standaloneBooks} />
        </section>
    );
};

export default AuthorBookGroups;
