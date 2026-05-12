import { Link } from "react-router-dom";
import { getAssetUrl } from "../../../shared/api/apiConfig";
import type { ReaderSearchResult } from "../types/search.types";

interface ReaderSearchResultsListProps {
    results: ReaderSearchResult[];
    compact?: boolean;
    onResultClick?: () => void;
}

const getReaderInitials = (name: string) => {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

    return initials || "BR";
};

const ReaderSearchResultsList = ({
    results,
    compact = false,
    onResultClick
}: ReaderSearchResultsListProps) => {
    if (!results.length) {
        return null;
    }

    if (compact) {
        return (
            <div className="py-2">
                {results.map((reader) => {
                    const avatarSource = getAssetUrl(reader.avatarUrl);

                    return (
                        <Link
                            key={reader.id}
                            to={`/readers/${encodeURIComponent(reader.handle)}`}
                            onClick={onResultClick}
                            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[var(--bookora-surface)]"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--bookora-border)] bg-[var(--bookora-surface)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bookora-text-soft)]">
                                {avatarSource ? (
                                    <img
                                        src={avatarSource}
                                        alt={reader.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span>{getReaderInitials(reader.name)}</span>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="theme-title truncate text-sm font-medium">{reader.name}</div>
                                <div className="theme-text-muted mt-1 truncate text-xs">@{reader.handle}</div>
                                {reader.bio ? (
                                    <div className="theme-text-muted mt-1 line-clamp-2 text-[11px] leading-5 opacity-90">
                                        {reader.bio}
                                    </div>
                                ) : null}
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {results.map((reader) => {
                const avatarSource = getAssetUrl(reader.avatarUrl);

                return (
                    <article
                        key={reader.id}
                        className="theme-glass-panel overflow-hidden rounded-[2rem] p-5 transition-all duration-300 hover:border-[var(--bookora-border-strong)]"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--bookora-border)] bg-[var(--bookora-surface)] text-lg font-semibold uppercase tracking-[0.12em] text-[var(--bookora-text-soft)]">
                                {avatarSource ? (
                                    <img
                                        src={avatarSource}
                                        alt={reader.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span>{getReaderInitials(reader.name)}</span>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="text-xl font-semibold text-white">{reader.name}</h2>
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-slate-200">
                                        @{reader.handle}
                                    </span>
                                </div>

                                {reader.bio ? (
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                                        {reader.bio}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-sm leading-7 text-slate-400">
                                        No public bio yet.
                                    </p>
                                )}

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Link
                                        to={`/readers/${encodeURIComponent(reader.handle)}`}
                                        className="theme-button-primary inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-all duration-300"
                                    >
                                        View reader
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default ReaderSearchResultsList;
