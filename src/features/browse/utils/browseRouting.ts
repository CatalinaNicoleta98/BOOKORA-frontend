import { APP_ROUTES } from "../../../shared/navigation/navigation";
import { BROWSE_GENRES } from "./browseGenres";

export const buildBrowseGenreRoute = (genreSlug: string) =>
    APP_ROUTES.browseGenre.replace(":genreSlug", encodeURIComponent(genreSlug.trim().toLowerCase()));

export const getBrowseGenreFromRouteParam = (genreSlugParam?: string) => {
    if (!genreSlugParam) {
        return null;
    }

    const decodedGenreSlug = decodeURIComponent(genreSlugParam).trim().toLowerCase();

    return BROWSE_GENRES.find((genre) => genre.slug === decodedGenreSlug) ?? null;
};
