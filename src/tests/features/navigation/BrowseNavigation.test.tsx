import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DesktopNavLinks from "../../../shared/components/navigation/DesktopNavLinks";
import NavbarSearch from "../../../features/search/components/NavbarSearch";

const searchBooksMock = vi.fn();
const searchAllMock = vi.fn();

vi.mock("../../../features/search/services/searchService", () => ({
    searchBooks: (...args: unknown[]) => searchBooksMock(...args),
    searchAll: (...args: unknown[]) => searchAllMock(...args),
}));

const LocationProbe = () => {
    const location = useLocation();

    return <div data-testid="location-probe">{`${location.pathname}${location.search}`}</div>;
};

describe("browse navigation", () => {
    beforeEach(() => {
        searchBooksMock.mockReset();
        searchAllMock.mockReset();
    });

    it("opens browse genres on click and includes All genres", () => {
        render(
            <MemoryRouter>
                <DesktopNavLinks />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /browse/i }));

        expect(screen.getByRole("link", { name: /all genres/i })).toHaveAttribute("href", "/browse");
        expect(screen.getByRole("link", { name: /fantasy/i })).toHaveAttribute("href", "/browse/fantasy");
    });

    it("closes the browse menu when clicked again", () => {
        render(
            <MemoryRouter>
                <DesktopNavLinks />
            </MemoryRouter>
        );

        const browseButton = screen.getByRole("button", { name: /browse/i });

        fireEvent.click(browseButton);
        expect(screen.getByRole("link", { name: /all genres/i })).toBeInTheDocument();

        fireEvent.click(browseButton);
        expect(screen.queryByRole("link", { name: /all genres/i })).not.toBeInTheDocument();
    });

    it("keeps View all results pointing to /search", async () => {
        searchAllMock.mockResolvedValue({
            books: {
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
            },
            readers: []
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
            expect(searchAllMock).toHaveBeenCalled();
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
