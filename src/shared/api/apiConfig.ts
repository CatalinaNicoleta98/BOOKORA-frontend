const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const resolvedApiBaseUrl = rawApiBaseUrl
    ? normalizeBaseUrl(rawApiBaseUrl)
    : import.meta.env.DEV
      ? "http://localhost:4000/api"
      : null;

if (!resolvedApiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is required for production builds.");
}

const rawAssetBaseUrl = import.meta.env.VITE_ASSET_BASE_URL?.trim();
const derivedAssetBaseUrl = rawAssetBaseUrl
    ? normalizeBaseUrl(rawAssetBaseUrl)
    : resolvedApiBaseUrl.endsWith("/api")
      ? resolvedApiBaseUrl.slice(0, -4)
      : resolvedApiBaseUrl;

export const API_CONFIG = {
    BASE_URL: resolvedApiBaseUrl,
    ASSET_BASE_URL: normalizeBaseUrl(derivedAssetBaseUrl)
} as const;

export const getAssetUrl = (value?: string | null) => {
    if (!value) {
        return undefined;
    }

    if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
    }

    const normalizedPath = value.startsWith("/") ? value : `/${value}`;
    return `${API_CONFIG.ASSET_BASE_URL}${normalizedPath}`;
};
