import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "../../auth/context/AuthContext";

import { getMyProfile, updateMyProfile } from "../services/profileService";
import type { ProfileUser } from "../types/profile.types";
import ProfileStatsGrid, { type ProfileStatItem } from "../components/ProfileStatsGrid";
import ProfileReadingGoals from "../components/ProfileReadingGoals";
import ProfileRecentActivity, { type ProfileActivityItem } from "../components/ProfileRecentActivity";


interface ProfileShelfPreviewBook {
    id: string;
    title: string;
    coverUrl: string;
}

interface ProfileShelfItem {
    label: string;
    value: number;
    helperText: string;
    accent: string;
    ctaLabel: string;
    books: ProfileShelfPreviewBook[];
}


const profileStats: ProfileStatItem[] = [
    {
        label: "Books in library",
        value: "24",
        helperText: "Across physical, ebook, and audiobook formats.",
    },
    {
        label: "Finished this year",
        value: "6",
        helperText: "You are steadily building your 2026 reading streak.",
    },
    {
        label: "Currently reading",
        value: "1",
        helperText: "Your active reading progress lives here.",
    },
    {
        label: "Currently listening",
        value: "0",
        helperText: "Audiobook sessions will appear separately.",
    },
];

const profileShelves: ProfileShelfItem[] = [
    {
        label: "Want to read",
        value: 12,
        helperText: "A dreamy stack of books waiting for their turn.",
        accent: "from-amber-200/30 via-orange-200/20 to-pink-200/25",
        ctaLabel: "Open shelf",
        books: [
            {
                id: "shelf-wtr-1",
                title: "Fourth Wing",
                coverUrl: "https://covers.openlibrary.org/b/id/12883814-M.jpg",
            },
            {
                id: "shelf-wtr-2",
                title: "The Priory of the Orange Tree",
                coverUrl: "https://covers.openlibrary.org/b/id/10521270-M.jpg",
            },
            {
                id: "shelf-wtr-3",
                title: "Divine Rivals",
                coverUrl: "https://covers.openlibrary.org/b/id/14637495-M.jpg",
            },
        ],
    },
    {
        label: "Finished",
        value: 8,
        helperText: "Stories that already made it into your reading history.",
        accent: "from-emerald-200/25 via-teal-200/15 to-sky-200/20",
        ctaLabel: "View history",
        books: [
            {
                id: "shelf-finished-1",
                title: "Harry Potter and the Philosopher's Stone",
                coverUrl: "https://covers.openlibrary.org/b/id/10523338-M.jpg",
            },
            {
                id: "shelf-finished-2",
                title: "Caraval",
                coverUrl: "https://covers.openlibrary.org/b/id/10586792-M.jpg",
            },
            {
                id: "shelf-finished-3",
                title: "The Cruel Prince",
                coverUrl: "https://covers.openlibrary.org/b/id/9259256-M.jpg",
            },
        ],
    },
    {
        label: "On break",
        value: 2,
        helperText: "Books paused for now, but not forgotten.",
        accent: "from-indigo-200/25 via-violet-200/20 to-fuchsia-200/20",
        ctaLabel: "Resume later",
        books: [
            {
                id: "shelf-break-1",
                title: "The Name of the Wind",
                coverUrl: "https://covers.openlibrary.org/b/id/8231856-M.jpg",
            },
            {
                id: "shelf-break-2",
                title: "A Court of Silver Flames",
                coverUrl: "https://covers.openlibrary.org/b/id/11153238-M.jpg",
            },
            {
                id: "shelf-break-3",
                title: "Lore",
                coverUrl: "https://covers.openlibrary.org/b/id/11119857-M.jpg",
            },
        ],
    },
    {
        label: "Did not finish",
        value: 1,
        helperText: "Even unfinished books are part of the journey.",
        accent: "from-rose-200/20 via-pink-200/15 to-slate-200/10",
        ctaLabel: "Review notes",
        books: [
            {
                id: "shelf-dnf-1",
                title: "Crescent City",
                coverUrl: "https://covers.openlibrary.org/b/id/11148691-M.jpg",
            },
            {
                id: "shelf-dnf-2",
                title: "Lore Olympus",
                coverUrl: "https://covers.openlibrary.org/b/id/12616312-M.jpg",
            },
            {
                id: "shelf-dnf-3",
                title: "Belladonna",
                coverUrl: "https://covers.openlibrary.org/b/id/12874473-M.jpg",
            },
        ],
    },
];

const recentActivity: ProfileActivityItem[] = [
    {
        id: "activity-1",
        title: "Progress updated on Harry Potter and the Philosopher's Stone",
        description: "You moved forward to page 50 and kept the reading streak alive.",
        timestamp: "Today",
    },
    {
        id: "activity-2",
        title: "A new title was added to Want to Read",
        description: "Your future TBR stack is starting to look like a real fantasy tower.",
        timestamp: "Yesterday",
    },
    {
        id: "activity-3",
        title: "Profile challenge progress increased",
        description: "You are now 30% of the way toward your yearly reading target.",
        timestamp: "This week",
    },
];

const readingGoalTarget = 20;
const readingGoalCurrent = 6;

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

const getImageSource = (imagePath?: string) => {
    if (!imagePath) {
        return undefined;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `http://localhost:4000${imagePath}`;
};

const buildProfileFallback = (user: ProfileUser | null, authUser: { name?: string; email?: string; avatarUrl?: string; coverImageUrl?: string; bio?: string } | null) => {
    if (user) {
        return user;
    }

    return {
        id: "",
        name: authUser?.name ?? "Bookora Reader",
        email: authUser?.email ?? "reader@bookora.app",
        avatarUrl: authUser?.avatarUrl,
        coverImageUrl: authUser?.coverImageUrl,
        bio: authUser?.bio ?? "",
        isProfilePublic: true,
        role: "user"
    } satisfies ProfileUser;
};

const ProfilePage = () => {
    const { state } = useAuth();
    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const coverInputRef = useRef<HTMLInputElement | null>(null);

    const [profile, setProfile] = useState<ProfileUser | null>(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editBio, setEditBio] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
    const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setIsProfileLoading(true);
                setProfileError(null);

                const currentProfile = await getMyProfile();

                setProfile(currentProfile);
                setEditName(currentProfile.name ?? "");
                setEditBio(currentProfile.bio ?? "");
            } catch (error) {
                const fallbackMessage = error instanceof Error ? error.message : "Unable to load your profile right now.";
                setProfileError(fallbackMessage);
            } finally {
                setIsProfileLoading(false);
            }
        };

        loadProfile();
    }, []);

    useEffect(() => {
        return () => {
            if (avatarPreviewUrl) {
                URL.revokeObjectURL(avatarPreviewUrl);
            }

            if (coverPreviewUrl) {
                URL.revokeObjectURL(coverPreviewUrl);
            }
        };
    }, [avatarPreviewUrl, coverPreviewUrl]);

    const fallbackProfile = buildProfileFallback(profile, state.user ?? null);

    const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] ?? null;

        if (avatarPreviewUrl) {
            URL.revokeObjectURL(avatarPreviewUrl);
        }

        setAvatarFile(selectedFile);
        setAvatarPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
        setSaveSuccessMessage(null);
    };

    const handleCoverFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] ?? null;

        if (coverPreviewUrl) {
            URL.revokeObjectURL(coverPreviewUrl);
        }

        setCoverFile(selectedFile);
        setCoverPreviewUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
        setSaveSuccessMessage(null);
    };

    const handleStartEditing = () => {
        setIsEditingProfile(true);
        setSaveSuccessMessage(null);
        setProfileError(null);
        setEditName(fallbackProfile.name ?? "");
        setEditBio(fallbackProfile.bio ?? "");
    };

    const handleCancelEditing = () => {
        if (avatarPreviewUrl) {
            URL.revokeObjectURL(avatarPreviewUrl);
        }

        if (coverPreviewUrl) {
            URL.revokeObjectURL(coverPreviewUrl);
        }

        setIsEditingProfile(false);
        setAvatarFile(null);
        setCoverFile(null);
        setAvatarPreviewUrl(null);
        setCoverPreviewUrl(null);
        setEditName(fallbackProfile.name ?? "");
        setEditBio(fallbackProfile.bio ?? "");
        setSaveSuccessMessage(null);
        setProfileError(null);
    };

    const handleSaveProfile = async () => {
        try {
            setIsSavingProfile(true);
            setProfileError(null);
            setSaveSuccessMessage(null);

            const updatedProfile = await updateMyProfile({
                name: editName.trim(),
                bio: editBio.trim(),
                avatarFile,
                coverFile
            });

            if (avatarPreviewUrl) {
                URL.revokeObjectURL(avatarPreviewUrl);
            }

            if (coverPreviewUrl) {
                URL.revokeObjectURL(coverPreviewUrl);
            }

            setProfile(updatedProfile);
            setEditName(updatedProfile.name ?? "");
            setEditBio(updatedProfile.bio ?? "");
            setAvatarFile(null);
            setCoverFile(null);
            setAvatarPreviewUrl(null);
            setCoverPreviewUrl(null);
            setIsEditingProfile(false);
            setSaveSuccessMessage("Profile updated successfully.");
        } catch (error) {
            const fallbackMessage = error instanceof Error ? error.message : "Unable to save your profile right now.";
            setProfileError(fallbackMessage);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const profileName = useMemo(() => {
        if (isEditingProfile) {
            return editName.trim() || "Bookora Reader";
        }

        return fallbackProfile.name || "Bookora Reader";
    }, [editName, fallbackProfile.name, isEditingProfile]);

    const profileEmail = useMemo(() => {
        return fallbackProfile.email || "reader@bookora.app";
    }, [fallbackProfile.email]);

    const profileInitials = useMemo(() => getInitials(profileName), [profileName]);

    const profileBio = useMemo(() => {
        if (isEditingProfile) {
            return editBio;
        }

        return fallbackProfile.bio?.trim() || "Curating fantasy worlds, cozy reads, and future obsessions, all in one place.";
    }, [editBio, fallbackProfile.bio, isEditingProfile]);

    const profileAvatarUrl = useMemo(() => {
        if (avatarPreviewUrl) {
            return avatarPreviewUrl;
        }

        return getImageSource(fallbackProfile.avatarUrl);
    }, [avatarPreviewUrl, fallbackProfile.avatarUrl]);

    const profileCoverUrl = useMemo(() => {
        if (coverPreviewUrl) {
            return coverPreviewUrl;
        }

        return getImageSource(fallbackProfile.coverImageUrl);
    }, [coverPreviewUrl, fallbackProfile.coverImageUrl]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.14),_transparent_24%),radial-gradient(circle_at_82%_14%,_rgba(244,208,140,0.10),_transparent_20%),linear-gradient(to_bottom,_rgba(8,11,22,0.92),_rgba(7,10,18,1))]" />
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0.8px,_transparent_0.8px)] [background-size:28px_28px]" />

            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleAvatarFileChange}
                />
                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleCoverFileChange}
                />
                <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-[0_28px_90px_rgba(15,23,42,0.34)] backdrop-blur-xl">
                    <div className="relative h-[16rem] overflow-hidden sm:h-[19rem] lg:h-[22rem]">
                        {profileCoverUrl ? (
                            <img
                                src={profileCoverUrl}
                                alt={`${profileName} cover`}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : null}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_rgba(250,204,21,0.22),_transparent_22%),radial-gradient(circle_at_80%_22%,_rgba(192,132,252,0.28),_transparent_26%),radial-gradient(circle_at_50%_72%,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(135deg,_rgba(12,18,35,0.8),_rgba(22,12,41,0.72),_rgba(6,10,18,0.94))]" />
                        <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
                        <div className="absolute left-6 top-6 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200 backdrop-blur-lg sm:left-8 sm:top-8">
                            Reader profile
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070a12] via-[#070a12]/78 to-transparent" />
                    </div>

                    <div className="relative px-6 pb-8 sm:px-8 lg:px-10">
                        <div className="-mt-16 flex flex-col gap-6 lg:-mt-20 lg:flex-row lg:items-end lg:justify-between">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                                <div className="relative shrink-0">
                                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-200/40 via-fuchsia-200/30 to-sky-200/30 blur-xl" />
                                    <div className="relative h-28 w-28 overflow-hidden rounded-[2rem] border border-white/14 shadow-[0_24px_80px_rgba(96,165,250,0.28)] sm:h-32 sm:w-32">
                                        {profileAvatarUrl ? (
                                            <img
                                                src={profileAvatarUrl}
                                                alt={profileName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-300/90 via-indigo-300/85 to-fuchsia-300/85 text-4xl font-semibold text-slate-950 sm:text-5xl">
                                                {profileInitials}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {isEditingProfile ? (
                                            <div className="min-w-[min(100%,28rem)]">
                                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                                    Display name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(event) => setEditName(event.target.value)}
                                                    className="w-full rounded-[1.4rem] border border-white/12 bg-[#0b1020]/76 px-4 py-3 text-lg font-semibold text-white outline-none transition-colors duration-300 placeholder:text-slate-500 focus:border-amber-200/30 sm:text-xl"
                                                    placeholder="Your display name"
                                                />
                                            </div>
                                        ) : (
                                            <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
                                                {profileName}
                                            </h1>
                                        )}
                                        <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                            @{profileName.toLowerCase().replace(/\s+/g, "")}
                                        </span>
                                    </div>
                                    {isEditingProfile ? (
                                        <div className="mt-4 max-w-3xl">
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                                Bio
                                            </label>
                                            <textarea
                                                value={editBio}
                                                onChange={(event) => setEditBio(event.target.value)}
                                                rows={4}
                                                className="w-full rounded-[1.4rem] border border-white/12 bg-[#0b1020]/76 px-4 py-3 text-sm leading-7 text-slate-100 outline-none transition-colors duration-300 placeholder:text-slate-500 focus:border-amber-200/30"
                                                placeholder="Tell readers a little about your reading taste."
                                            />
                                        </div>
                                    ) : (
                                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-[15px]">
                                            {profileBio}
                                        </p>
                                    )}
                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                        <span>{profileEmail}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-500" />
                                        <span>Esbjerg, Denmark</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-500" />
                                        <span>Joined 2026</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 lg:justify-end">
                                <button
                                    type="button"
                                    onClick={() => coverInputRef.current?.click()}
                                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                >
                                    Edit cover
                                </button>
                                {isEditingProfile ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => avatarInputRef.current?.click()}
                                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                        >
                                            Change avatar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelEditing}
                                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveProfile}
                                            disabled={isSavingProfile}
                                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 text-sm font-medium text-emerald-100 transition-all duration-300 hover:border-emerald-300/30 hover:bg-emerald-300/14 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isSavingProfile ? "Saving..." : "Save profile"}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleStartEditing}
                                        className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/16 hover:bg-white/12"
                                    >
                                        Edit profile
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-200/10 px-4 text-sm font-medium text-amber-100 transition-all duration-300 hover:border-amber-200/30 hover:bg-amber-200/14"
                                >
                                    Share profile
                                </button>
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

                        <ProfileStatsGrid stats={profileStats} />
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-6">
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                                        Featured shelves
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">A more visual library view</h2>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm font-medium text-amber-100 transition-colors duration-300 hover:text-amber-50"
                                >
                                    Open library
                                </button>
                            </div>

                            <div className="mt-8 grid gap-4 xl:grid-cols-2">
                                {profileShelves.map((item) => (
                                    <article
                                        key={item.label}
                                        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1020]/74 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.24)]"
                                    >
                                        <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${item.accent}`} />
                                        <div className="relative">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-200">{item.label}</p>
                                                    <p className="mt-3 text-4xl font-semibold text-white">{item.value}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors duration-300 hover:bg-white/12"
                                                >
                                                    {item.ctaLabel}
                                                </button>
                                            </div>

                                            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{item.helperText}</p>

                                            <div className="mt-6 flex items-end gap-3 overflow-hidden">
                                                {item.books.map((book, index) => (
                                                    <div
                                                        key={book.id}
                                                        className={`group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_12px_28px_rgba(15,23,42,0.26)] ${
                                                            index === 0 ? "mt-0 h-28 w-20" : index === 1 ? "mt-4 h-24 w-[4.3rem]" : "mt-7 h-20 w-[3.85rem]"
                                                        }`}
                                                        title={book.title}
                                                    >
                                                        <img
                                                            src={book.coverUrl}
                                                            alt={book.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <ProfileReadingGoals
                            target={readingGoalTarget}
                            current={readingGoalCurrent}
                        />

                        <ProfileRecentActivity items={recentActivity} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;