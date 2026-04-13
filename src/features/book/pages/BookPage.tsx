

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface BookData {
    title: string;
    description?: string;
    covers?: number[];
}

const BookPage = () => {
    const { id } = useParams<{ id: string }>();

    const [book, setBook] = useState<BookData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchBook = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const normalizedId = id.replace("/works/", "");

                const response = await fetch(
                    `https://openlibrary.org/works/${normalizedId}.json`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch book");
                }

                const data = await response.json();

                setBook(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Something went wrong";
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (isLoading) {
        return <div className="p-8 text-white">Loading book...</div>;
    }

    if (error) {
        return <div className="p-8 text-red-400">{error}</div>;
    }

    if (!book) {
        return <div className="p-8 text-white">No book found.</div>;
    }

    const coverId = book.covers?.[0];
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : undefined;

    const description =
        typeof book.description === "string"
            ? book.description
            : typeof book.description === "object" && book.description !== null && "value" in book.description
                ? (book.description as { value: string }).value
                : "No description available.";

    return (
        <div className="min-h-screen bg-[#070a12] text-white px-6 py-10">
            <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[260px_1fr]">
                {/* Cover */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={book.title}
                            className="w-full h-auto rounded-xl object-cover"
                        />
                    ) : (
                        <div className="h-[360px] flex items-center justify-center text-slate-400">
                            No cover
                        </div>
                    )}
                </div>

                {/* Content */}
                <div>
                    <h1 className="text-3xl font-semibold">{book.title}</h1>

                    <p className="mt-6 text-slate-300 leading-7 max-w-3xl">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookPage;