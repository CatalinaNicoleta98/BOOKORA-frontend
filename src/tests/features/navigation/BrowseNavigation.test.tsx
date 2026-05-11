import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DesktopNavLinks from "../../../shared/components/navigation/DesktopNavLinks";
import NavbarSearch from "../../../features/search/components/NavbarSearch";

const searchBooksMock = vi.fn();

vi.mock("../../../features/search/services/searchService", () => ({
    searchBooks: (...args: unknown[]) => searchBooksMock(...args),
}));

const LocationProbe = () => {
    const location = useLocation();

    return <div data-testid="location-probe">{`${location.pathname}${location.search}`}</div>;
};

describe("browse navigation", () => {
    beforeEach(() => {
        searchBooksMock.mockReset();
    });

    it("points the Browse nav link to /browse", () => {
        render(
            <MemoryRouter>
                <DesktopNavLinks />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: "Browse" })).toHaveAttribute("href", "/browse");
    });

    it("keeps View all results pointing to /search", async () => {
        searchBooksMock.mockResolvedValue({
            results: [
                {
                    source: "open_library",
                    externalBookId: "/works/OL1W",
                    title: "Dune",
                    author: "Frank Herbert",
                },
            ],
            pagination: {
                page: 1,
                limit: 6,
                numFound: 1,
            },
        });

        render(
            <MemoryRouter initialEntries={["/"]}>
                <NavbarSearch />
                <LocationProbe />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/search books, authors, series/i), {
            target: { value: "dune" },
        });

        await waitFor(() => {
            expect(searchBooksMock).toHaveBeenCalled();
        });

        await waitFor(
            () => {
            expect(screen.getByRole("button", { name: /view all results/i })).toBeInTheDocument();
            },
            { timeout: 1500 }
        );

        fireEvent.click(screen.getByRole("button", { name: /view all results/i }));

        expect(screen.getByTestId("location-probe")).toHaveTextContent("/search?q=dune");
    });
});
