import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookDetailsPanel from "../../../features/book/components/BookDetailsPanel";

describe("book details panel", () => {
    it("shows selected edition metadata when the page is opened for a specific edition", () => {
        render(
            <BookDetailsPanel
                authorLabel="Author Name"
                publishLabel="1998"
                selectedEdition={{
                    editionKey: "OL123M",
                    workKey: "OL999W",
                    title: "Illustrated Edition",
                    publishDate: "2005",
                    publisher: "Bloomsbury",
                }}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /show details/i }));

        expect(screen.getByText("Viewing edition")).toBeInTheDocument();
        expect(screen.getByText("Illustrated Edition · 2005 · Bloomsbury")).toBeInTheDocument();
    });
});
