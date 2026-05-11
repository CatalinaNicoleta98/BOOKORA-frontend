import { describe, expect, it } from "vitest";
import {
    buildBookActivityRoute,
    buildBookDetailsRoute,
    getBookKeyFromRouteParam,
} from "../../../features/book/utils/bookRouting";
import {
    buildAuthorDetailsRoute,
    getAuthorKeyFromRouteParam,
} from "../../../features/authors/utils/authorRouting";
import {
    buildSeriesDetailsRoute,
    getSeriesKeyFromRouteParam,
} from "../../../features/series/utils/seriesRouting";

describe("route helpers", () => {
    it("preserves work and edition identifiers when building and reading book routes", () => {
        expect(buildBookDetailsRoute("/books/OL123M")).toBe("/books/OL123M");
        expect(buildBookDetailsRoute("/works/OL999W")).toBe("/books/OL999W");
        expect(buildBookActivityRoute("/books/OL123M")).toBe("/books/OL123M/activity");
        expect(getBookKeyFromRouteParam(encodeURIComponent("/books/OL123M"))).toBe("OL123M");
        expect(getBookKeyFromRouteParam(encodeURIComponent("/works/OL999W"))).toBe("OL999W");
    });

    it("uses stable author and series keys when encoding and decoding relationship routes", () => {
        expect(buildAuthorDetailsRoute("/authors/OLAUTH1A")).toBe("/authors/OLAUTH1A");
        expect(buildSeriesDetailsRoute("/series/stormlight-archive")).toBe(
            "/series/stormlight-archive"
        );
        expect(getAuthorKeyFromRouteParam(encodeURIComponent("/authors/OLAUTH1A"))).toBe(
            "OLAUTH1A"
        );
        expect(getSeriesKeyFromRouteParam(encodeURIComponent("/series/stormlight-archive"))).toBe(
            "stormlight-archive"
        );
    });
});
