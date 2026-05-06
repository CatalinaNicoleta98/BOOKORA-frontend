import type { PublicReader } from "../types/social.types";
import FollowButton from "./FollowButton";
import type { FollowMutationResult } from "../services/followService";
import { getAssetUrl } from "../../../shared/api/apiConfig";

interface ReaderHeroProps {
    reader: PublicReader;
    onFollowStateChange: (result: FollowMutationResult) => void;
}

const getInitials = (name?: string) => {
    if (!name) {
        return "BK";
    }

    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

    return initials || "BK";
};

const ReaderHero = ({ reader, onFollowStateChange }: ReaderHeroProps) => {
    const avatarSource = getAssetUrl(reader.avatarUrl);
    const coverSource = getAssetUrl(reader.coverImageUrl);
    const profileBio =
        reader.bio?.trim() ||
        "This reader has not added a public bio yet, but their shelves and activity still tell a story.";

    return (
        <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
            <div className="relative h-[15rem] overflow-hidden sm:h-[18rem] lg:h-[21rem]">
                {coverSource ? (
                    <img
                        src={coverSource}
                        alt={`${reader.name} cover`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : null}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,_rgba(250,204,21,0.22),_transparent_24%),radial-gradient(circle_at_82%_24%,_rgba(96,165,250,0.2),_transparent_24%),linear-gradient(135deg,_rgba(10,14,28,0.88),_rgba(20,14,36,0.76),_rgba(7,10,19,0.94))]" />
                <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:74px_74px]" />
                <div className="theme-pill-subtle absolute left-6 top-6 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] sm:left-8 sm:top-8">
                    Reader profile
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070a12] via-[#070a12]/78 to-transparent" />
            </div>

            <div className="relative px-6 pb-8 sm:px-8 lg:px-10">
                <div className="-mt-10 rounded-[2rem] border border-[var(--bookora-border)] bg-[color:var(--bookora-surface-strong)] px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-6 lg:-mt-14 lg:px-7 lg:py-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                            <div className="relative shrink-0">
                                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-200/40 via-fuchsia-200/30 to-sky-200/30 blur-xl" />
                                <div className="relative h-28 w-28 overflow-hidden rounded-[2rem] border border-white/14 shadow-[0_24px_80px_rgba(96,165,250,0.28)] sm:h-32 sm:w-32">
                                    {avatarSource ? (
                                        <img
                                            src={avatarSource}
                                            alt={reader.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-300/90 via-indigo-300/85 to-fuchsia-300/85 text-4xl font-semibold text-slate-950 sm:text-5xl">
                                            {getInitials(reader.name)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="theme-title text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
                                        {reader.name}
                                    </h1>
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                        @{reader.handle}
                                    </span>
                                </div>

                                <p className="theme-text-soft mt-3 max-w-3xl text-sm leading-7 sm:text-[15px]">
                                    {profileBio}
                                </p>

                                <div className="theme-text-muted mt-4 flex flex-wrap items-center gap-4 text-sm">
                                    <span>Public reader profile</span>
                                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                                    <span>Reading activity shown here is shared from public updates only</span>
                                </div>

                                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                        {reader.followerCount} followers
                                    </span>
                                    <span className="theme-pill-subtle rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                        {reader.followingCount} following
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-3 lg:items-end">
                            <FollowButton
                                readerId={reader.id}
                                isFollowing={reader.isFollowing}
                                isOwnProfile={reader.isOwnProfile}
                                onFollowStateChange={onFollowStateChange}
                            />
                            <div className="theme-content-panel-soft rounded-[1.5rem] px-4 py-3 text-sm text-slate-300">
                                A look at this reader&apos;s shelves, recent activity, and current highlights.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export type { ReaderHeroProps };
export default ReaderHero;
