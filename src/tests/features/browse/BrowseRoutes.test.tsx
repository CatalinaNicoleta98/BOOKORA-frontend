import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BrowseBookCard from "../../../features/browse/components/BrowseBookCard";
import BrowsePage from "../../../features/browse/pages/BrowsePage";
import BrowseGenrePage from "../../../features/browse/pages/BrowseGenrePage";

const getBrowseSectionsMock = vi.fn();
const getBrowseGenreBooksMock = vi.fn();

vi.mock("../../../features/browse/services/browseService", () => ({
    getBrowseSections: (...args: unknown[]) => getBrowseSectionsMock(...args),
    getBrowseGenreBooks: (...args: unknown[]) => getBrowseGenreBooksMock(...args),
}));

describe("browse routes", () => {
    beforeEach(() => {
        getBrowseSectionsMock.mockReset();
        getBrowseGenreBooksMock.mockReset();
    });

    it("renders the browse page route", async () => {
        getBrowseSectionsMock.mockResolvedValue([]);

        render(
            <MemoryRouter initialEntries={["/browse"]}>
                <Routes>
                    <Route path="/browse" element={<BrowsePage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: /browse by shelf/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(getBrowseSectionsMock).toHaveBeenCalled();
        });
    });

    it("renders the browse genre page from the route slug", async () => {
        getBrowseGenreBooksMock.mockResolvedValue({
            genre: {
                slug: "fantasy",
                title: "Fantasy",
                query: "fantasy",
                description: "Sweeping worlds, mythic quests, and magical intrigue.",
            },
            books: [],
            page: 1,
            limit: 18,
            total: 0,
            hasMore: false,
        });

        render(
            <MemoryRouter initialEntries={["/browse/fantasy"]}>
                <Routes>
                    <Route path="/browse/:genreSlug" element={<BrowseGenrePage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Fantasy" })).toBeInTheDocument();

        await waitFor(() => {
            expect(getBrowseGenreBooksMock).toHaveBeenCalled();
        });
    });

    it("links browse book cards to the existing book details route", () => {
        render(
            <MemoryRouter>
                <BrowseBookCard
                    book={{
                        id: "/works/OL123W",
                        title: "The Left Hand of Darkness",
                        author: "Ursula K. Le Guin",
                        publishedYear: 1969,
                    }}
                />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /the left hand of darkness/i })).toHaveAttribute(
            "href",
            "/books/OL123W"
        );
    });
});
