

import type { ChangeEvent, RefObject } from "react";

interface ProfileHeaderProps {
    profileName: string;
    profileEmail: string;
    profileInitials: string;
    profileBio: string;
    profileAvatarUrl?: string;
    profileCoverUrl?: string;
    isProfilePublic: boolean;
    isEditingProfile: boolean;
    isProfileLoading: boolean;
    isSavingProfile: boolean;
    profileError: string | null;
    saveSuccessMessage: string | null;
    editName: string;
    editBio: string;
    avatarInputRef: RefObject<HTMLInputElement | null>;
    coverInputRef: RefObject<HTMLInputElement | null>;
    onEditNameChange: (value: string) => void;
    onEditBioChange: (value: string) => void;
    onAvatarFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCoverFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onStartEditing: () => void;
    onCancelEditing: () => void;
    onSaveProfile: () => void;
}

const ProfileHeader = ({
    profileName,
    profileEmail,
    profileInitials,
    profileBio,
    profileAvatarUrl,
    profileCoverUrl,
    isProfilePublic,
    isEditingProfile,
    isProfileLoading,
    isSavingProfile,
    profileError,
    saveSuccessMessage,
    editName,
    editBio,
    avatarInputRef,
    coverInputRef,
    onEditNameChange,
    onEditBioChange,
    onAvatarFileChange,
    onCoverFileChange,
    onStartEditing,
    onCancelEditing,
    onSaveProfile
}: ProfileHeaderProps) => {
    return (
        <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
            <input
                ref={avatarInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={onAvatarFileChange}
            />
            <input
                ref={coverInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={onCoverFileChange}
            />

            <div className="relative h-[13rem] overflow-hidden sm:h-[19rem] lg:h-[22rem]">
                {profileCoverUrl ? (
                    <img
                        src={profileCoverUrl}
                        alt={`${profileName} cover`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : null}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_rgba(250,204,21,0.22),_transparent_22%),radial-gradient(circle_at_80%_22%,_rgba(192,132,252,0.28),_transparent_26%),radial-gradient(circle_at_50%_72%,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(135deg,_rgba(12,18,35,0.8),_rgba(22,12,41,0.72),_rgba(6,10,18,0.94))]" />
                <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
                <div className="theme-pill-subtle absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] backdrop-blur-lg sm:left-8 sm:top-8 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.3em]">
                    Reader profile
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070a12] via-[#070a12]/78 to-transparent" />
            </div>

            <div className="relative px-4 pb-6 sm:px-8 sm:pb-8 lg:px-10">
                <div className="-mt-8 rounded-[2rem] border border-[var(--bookora-border)] bg-[color:var(--bookora-surface-strong)] px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-6 sm:py-5 lg:-mt-14 lg:px-7 lg:py-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="relative shrink-0">
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-200/40 via-fuchsia-200/30 to-sky-200/30 blur-xl" />
                            <div className="relative h-24 w-24 overflow-hidden rounded-[1.6rem] border border-white/14 shadow-[0_24px_80px_rgba(96,165,250,0.28)] sm:h-32 sm:w-32 sm:rounded-[2rem]">
                                {profileAvatarUrl ? (
                                    <img
                                        src={profileAvatarUrl}
                                        alt={profileName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-300/90 via-indigo-300/85 to-fuchsia-300/85 text-3xl font-semibold text-slate-950 sm:text-5xl">
                                        {profileInitials}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                {isEditingProfile ? (
                                    <div className="w-full min-w-0 sm:min-w-[min(100%,28rem)]">
                                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                            Display name
                                        </label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(event) => onEditNameChange(event.target.value)}
                                            className="theme-input w-full rounded-[1.4rem] px-4 py-3 text-lg font-semibold transition-colors duration-300 sm:text-xl"
                                            placeholder="Your display name"
                                        />
                                    </div>
                                ) : (
                                    <h1 className="theme-title text-[1.9rem] font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
                                        {profileName}
                                    </h1>
                                )}
                                <span className="theme-pill-subtle max-w-full rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    @{profileName.toLowerCase().replace(/\s+/g, "")}
                                </span>
                                <span className="theme-button-accent rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                                    {isProfilePublic ? "Public profile" : "Private profile"}
                                </span>
                            </div>

                            {isEditingProfile ? (
                                <div className="mt-4 max-w-3xl">
                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                        Bio
                                    </label>
                                    <textarea
                                        value={editBio}
                                        onChange={(event) => onEditBioChange(event.target.value)}
                                        rows={4}
                                        className="theme-input w-full rounded-[1.4rem] px-4 py-3 text-sm leading-7 transition-colors duration-300"
                                        placeholder="Tell readers a little about your reading taste."
                                    />
                                </div>
                            ) : (
                                <p className="theme-text-soft mt-3 max-w-3xl text-sm leading-6 sm:text-[15px] sm:leading-7">
                                    {profileBio}
                                </p>
                            )}

                            <div className="theme-text-muted mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                <span>{profileEmail}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-500" />
                                <span>{isProfilePublic ? "Visible to Bookora readers" : "Only visible to you"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:flex sm:flex-wrap lg:justify-end">
                        {isEditingProfile ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => coverInputRef.current?.click()}
                                    className="theme-button-ghost inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-medium sm:w-auto"
                                >
                                    Edit cover
                                </button>
                                <button
                                    type="button"
                                    onClick={() => avatarInputRef.current?.click()}
                                    className="theme-button-ghost inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-medium sm:w-auto"
                                >
                                    Change avatar
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancelEditing}
                                    className="theme-button-ghost inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-medium sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={onSaveProfile}
                                    disabled={isSavingProfile}
                                    className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 text-sm font-medium text-emerald-100 transition-all duration-300 hover:border-emerald-300/30 hover:bg-emerald-300/14 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >
                                    {isSavingProfile ? "Saving..." : "Save profile"}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={onStartEditing}
                                className="theme-button-ghost inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-sm font-medium sm:w-auto"
                            >
                                Edit profile
                            </button>
                        )}
                    </div>
                </div>
                </div>

                {(isProfileLoading || profileError || saveSuccessMessage) ? (
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                        {isProfileLoading ? (
                            <span className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-slate-300">
                                Loading profile...
                            </span>
                        ) : null}
                        {profileError ? (
                            <span className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1.5 text-rose-100">
                                {profileError}
                            </span>
                        ) : null}
                        {saveSuccessMessage ? (
                            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-emerald-100">
                                {saveSuccessMessage}
                            </span>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export type { ProfileHeaderProps };
export default ProfileHeader;
