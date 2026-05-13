import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBookGroups from "../components/AuthorBookGroups";
import AuthorHero from "../components/AuthorHero";
import AuthorPageState from "../components/AuthorPageState";
import { getAuthorDetails } from "../services/authorService";
import type { AuthorDetailsViewModel } from "../types/author.types";
import { getAuthorKeyFromRouteParam } from "../utils/authorRouting";
import { useDocumentTitle } from "../../../shared/hooks/useDocumentTitle";

const AuthorDetailsPage = () => {
    const { authorKey: authorKeyParam } = useParams<{ authorKey: string }>();
    const authorKey = getAuthorKeyFromRouteParam(authorKeyParam);

    const [author, setAuthor] = useState<AuthorDetailsViewModel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useDocumentTitle(author ? `Bookora | ${author.name}` : "Bookora | Author");

    useEffect(() => {
        if (!authorKey) {
            setAuthor(null);
            setError("Author key is missing.");
            return;
        }

        let isActive = true;

        const loadAuthor = async () => {
            try {
                setIsLoading(true);
                setError(null);
                setAuthor(null);

                const nextAuthor = await getAuthorDetails(authorKey);

                if (!isActive) {
                    return;
                }

                setAuthor(nextAuthor);
            } catch (err) {
                if (!isActive) {
                    return;
                }

                const message = err instanceof Error ? err.message : "Failed to load author details.";
                setError(message);
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        void loadAuthor();

        return () => {
            isActive = false;
        };
    }, [authorKey]);

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-5 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                {isLoading ? (
                    <AuthorPageState
                        title="Loading author profile..."
                        description="We are gathering the author's details and bibliography."
                    />
                ) : null}

                {!isLoading && error ? (
                    <AuthorPageState title="Could not load this author" description={error} tone="error" />
                ) : null}

                {!isLoading && !error && author ? (
                    <>
                        <AuthorHero author={author} />
                        <AuthorBookGroups
                            seriesGroups={author.seriesGroups}
                            standaloneBooks={author.standaloneBooks}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default AuthorDetailsPage;
