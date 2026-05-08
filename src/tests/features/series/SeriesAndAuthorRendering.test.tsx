import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AuthorBookGroups from "../../../features/authors/components/AuthorBookGroups";
import SeriesReadingOrder from "../../../features/series/components/SeriesReadingOrder";

describe("author and series rendering", () => {
    it("renders series books in backend-provided order and falls back gracefully when a position is missing", () => {
        render(
            <MemoryRouter>
                <SeriesReadingOrder
                    books={[
                        {
                            key: "OL2W",
                            title: "Second Book",
                            position: "2",
                            authors: [{ name: "Author" }],
                        },
                        {
                            key: "OLXW",
                            title: "Unknown Position Book",
                            authors: [{ name: "Author" }],
                        },
                        {
                            key: "OL1W",
                            title: "First Book",
                            position: "1",
                            authors: [{ name: "Author" }],
                        },
                    ]}
                />
            </MemoryRouter>
        );

        const links = screen
            .getAllByRole("link")
            .filter((node) =>
                ["Second Book", "Unknown Position Book", "First Book"].includes(
                    node.textContent ?? ""
                )
            )
            .map((node) => node.textContent);
        expect(links).toEqual(["Second Book", "Unknown Position Book", "First Book"]);
        expect(screen.getByText("#2")).toBeInTheDocument();
        expect(screen.getByText("Book 2")).toBeInTheDocument();
        expect(screen.getByText("#1")).toBeInTheDocument();
    });

    it("keeps grouped series books and standalone books in separate sections", () => {
        render(
            <MemoryRouter>
                <AuthorBookGroups
                    seriesGroups={[
                        {
                            seriesKey: "mistborn",
                            seriesTitle: "Mistborn",
                            books: [
                                {
                                    key: "OL1W",
                                    title: "The Final Empire",
                                },
                            ],
                        },
                    ]}
                    standaloneBooks={[
                        {
                            key: "OL9W",
                            title: "Warbreaker",
                        },
                    ]}
                />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Mistborn" })).toBeInTheDocument();
        expect(screen.getByText("Standalone books")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /the final empire/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /warbreaker/i })).toBeInTheDocument();
    });

    it("renders a series page without numbering noise when backend omits a position", () => {
        render(
            <MemoryRouter>
                <SeriesReadingOrder
                    books={[
                        {
                            key: "OL5W",
                            title: "Unnumbered Collection",
                            authors: [{ name: "Author" }],
                        },
                    ]}
                />
            </MemoryRouter>
        );

        expect(screen.queryByText(/^#/)).not.toBeInTheDocument();
        expect(screen.getByText("Book 1")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /unnumbered collection/i })).toBeInTheDocument();
    });
});
