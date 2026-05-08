import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookEditionsSection from "./BookEditionsSection";
import BookHero from "./BookHero";
import SearchReasultsCard from "../../search/components/SearchReasultsCard";

describe("book relationship links", () => {
    it("uses editionKey links for edition cards instead of collapsing to the work key", () => {
        render(
            <MemoryRouter>
                <BookEditionsSection
                    currentEditionKey="OL123M"
                    editions={[
                        {
                            editionKey: "OL123M",
                            workKey: "OL999W",
                            title: "Current edition",
                        },
                        {
                            editionKey: "OL124M",
                            workKey: "OL999W",
                            title: "Second edition",
                        },
                    ]}
                />
            </MemoryRouter>
        );

        const currentEditionLink = screen.getByRole("link", { name: /current edition/i });
        const secondEditionLink = screen.getByRole("link", { name: /second edition/i });

        expect(currentEditionLink).toHaveAttribute("href", "/books/OL123M");
        expect(secondEditionLink).toHaveAttribute("href", "/books/OL124M");
        expect(secondEditionLink).not.toHaveAttribute("href", "/books/OL999W");
        expect(screen.getByText("Viewing")).toBeInTheDocument();
    });

    it("uses stable author and series keys when rendering book relationships", () => {
        render(
            <MemoryRouter>
                <>
                    <BookHero
                        title="Example Book"
                        authorLabel="Ignored label"
                        authorCredits={[{ key: "OLAUTH1A", name: "Author Name" }]}
                        series={{ key: "stormlight-archive", name: "Stormlight Archive" }}
                        seriesPositionLabel="#2"
                        communityRating={{ average: 4.5, ratingsCount: 10, reviewsCount: 5 }}
                    />
                    <SearchReasultsCard
                        id="OLWORK1W"
                        title="Search Result"
                        author="Author Name"
                        authorKey="OLAUTH1A"
                    />
                </>
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: "Stormlight Archive #2" })).toHaveAttribute(
            "href",
            "/series/stormlight-archive"
        );
        expect(screen.getAllByRole("link", { name: "Author Name" })[0]).toHaveAttribute(
            "href",
            "/authors/OLAUTH1A"
        );
        expect(screen.getByRole("link", { name: /view book/i })).toHaveAttribute(
            "href",
            "/books/OLWORK1W"
        );
    });
});
