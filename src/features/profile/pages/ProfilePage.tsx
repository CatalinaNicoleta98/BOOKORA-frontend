import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useAuth } from "../../auth/context/AuthContext";

import { getMyProfile, updateMyProfile } from "../services/profileService";
import type { ProfileUser } from "../types/profile.types";
import ProfileStatsGrid, { type ProfileStatItem } from "../components/ProfileStatsGrid";
import ProfileReadingGoals from "../components/ProfileReadingGoals";
import ProfileRecentActivity, { type ProfileActivityItem } from "../components/ProfileRecentActivity";
import ProfileHeader from "../components/ProfileHeader";
import ProfileShelvesSection, { type ProfileShelfItem } from "../components/ProfileShelvesSection";




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
        id: "shelf-1",
        name: "Want to read",
        count: 12,
        description: "A dreamy stack of books waiting for their turn."
    },
    {
        id: "shelf-2",
        name: "Finished",
        count: 8,
        description: "Stories that already made it into your reading history."
    },
    {
        id: "shelf-3",
        name: "On break",
        count: 2,
        description: "Books paused for now, but not forgotten."
    }
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
    const { state, updateUser } = useAuth();
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
            updateUser(updatedProfile);
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
                <ProfileHeader
                    profileName={profileName}
                    profileEmail={profileEmail}
                    profileInitials={profileInitials}
                    profileBio={profileBio}
                    profileAvatarUrl={profileAvatarUrl}
                    profileCoverUrl={profileCoverUrl}
                    isEditingProfile={isEditingProfile}
                    isProfileLoading={isProfileLoading}
                    isSavingProfile={isSavingProfile}
                    profileError={profileError}
                    saveSuccessMessage={saveSuccessMessage}
                    editName={editName}
                    editBio={editBio}
                    avatarInputRef={avatarInputRef}
                    coverInputRef={coverInputRef}
                    onEditNameChange={setEditName}
                    onEditBioChange={setEditBio}
                    onAvatarFileChange={handleAvatarFileChange}
                    onCoverFileChange={handleCoverFileChange}
                    onStartEditing={handleStartEditing}
                    onCancelEditing={handleCancelEditing}
                    onSaveProfile={handleSaveProfile}
                />

                <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-[0_28px_90px_rgba(15,23,42,0.34)] backdrop-blur-xl">
                    <div className="relative px-6 pb-8 sm:px-8 lg:px-10">
                        <ProfileStatsGrid stats={profileStats} />
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-6">
                        <ProfileShelvesSection shelves={profileShelves} />
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