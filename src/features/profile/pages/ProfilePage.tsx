import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { getLibrary } from "../../library/services/libraryService";
import type { LibraryEntry } from "../../library/types/library.types";
import ProfileHeader from "../components/ProfileHeader";
import ProfileLibrarySpotlight from "../components/ProfileLibrarySpotlight";
import ProfileReadingGoals from "../components/ProfileReadingGoals";
import ProfileRecentActivity from "../components/ProfileRecentActivity";
import ProfileShelvesSection from "../components/ProfileShelvesSection";
import ProfileStatsGrid from "../components/ProfileStatsGrid";
import { getMyProfile, updateMyProfile } from "../services/profileService";
import type { ProfileUser } from "../types/profile.types";
import {
    buildProfileDashboardData,
    buildProfileFallback,
    getImageSource,
    getInitials,
    getProfileBio
} from "../utils/profilePage.utils";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { state, updateUser } = useAuth();
    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const coverInputRef = useRef<HTMLInputElement | null>(null);

    const [profile, setProfile] = useState<ProfileUser | null>(null);
    const [libraryEntries, setLibraryEntries] = useState<LibraryEntry[]>([]);
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
        const loadProfilePage = async () => {
            setIsProfileLoading(true);
            setProfileError(null);

            const [profileResult, libraryResult] = await Promise.allSettled([
                getMyProfile(),
                getLibrary()
            ]);

            if (profileResult.status === "fulfilled") {
                setProfile(profileResult.value);
                setEditName(profileResult.value.name ?? "");
                setEditBio(profileResult.value.bio ?? "");
            } else {
                const fallbackMessage =
                    profileResult.reason instanceof Error
                        ? profileResult.reason.message
                        : "Unable to load your profile right now.";
                setProfileError(fallbackMessage);
            }

            if (libraryResult.status === "fulfilled") {
                setLibraryEntries(libraryResult.value);
            } else if (profileResult.status !== "rejected") {
                const fallbackMessage =
                    libraryResult.reason instanceof Error
                        ? libraryResult.reason.message
                        : "Unable to load your library activity right now.";
                setProfileError(fallbackMessage);
            }

            setIsProfileLoading(false);
        };

        loadProfilePage();
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
    const dashboardData = useMemo(() => buildProfileDashboardData(libraryEntries), [libraryEntries]);

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

        if (avatarInputRef.current) {
            avatarInputRef.current.value = "";
        }

        if (coverInputRef.current) {
            coverInputRef.current.value = "";
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

            const selectedAvatarFile = avatarInputRef.current?.files?.[0] ?? avatarFile;
            const selectedCoverFile = coverInputRef.current?.files?.[0] ?? coverFile;

            const updatedProfile = await updateMyProfile({
                name: editName.trim(),
                bio: editBio.trim(),
                avatarFile: selectedAvatarFile,
                coverFile: selectedCoverFile
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

            if (avatarInputRef.current) {
                avatarInputRef.current.value = "";
            }

            if (coverInputRef.current) {
                coverInputRef.current.value = "";
            }
        } catch (error) {
            const fallbackMessage =
                error instanceof Error ? error.message : "Unable to save your profile right now.";
            setProfileError(fallbackMessage);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleShareProfile = async () => {
        const profileUrl = `${window.location.origin}/profile`;

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(profileUrl);
                setSaveSuccessMessage("Profile link copied to clipboard.");
                return;
            }
        } catch {
            // Fall through to the manual copy message.
        }

        setSaveSuccessMessage(`Share this profile link: ${profileUrl}`);
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

        return getProfileBio(fallbackProfile.bio);
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

    const openBook = (bookId: string) => {
        navigate(`/books/${encodeURIComponent(bookId)}`);
    };

    return (
        <div className="theme-page-shell relative min-h-screen">
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <ProfileHeader
                    profileName={profileName}
                    profileEmail={profileEmail}
                    profileInitials={profileInitials}
                    profileBio={profileBio}
                    profileAvatarUrl={profileAvatarUrl}
                    profileCoverUrl={profileCoverUrl}
                    isProfilePublic={fallbackProfile.isProfilePublic ?? true}
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
                    onShareProfile={handleShareProfile}
                />

                <ProfileLibrarySpotlight
                    items={dashboardData.spotlight}
                    onOpenBook={openBook}
                    onBrowseBooks={() => navigate("/search")}
                />

                <section className="theme-glass-panel overflow-hidden rounded-[2.25rem]">
                    <div className="relative px-6 pb-8 sm:px-8 lg:px-10">
                        <ProfileStatsGrid stats={dashboardData.stats} />
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-6">
                        <ProfileShelvesSection
                            shelves={dashboardData.shelves}
                            onManageShelves={() => navigate("/search")}
                            onOpenBook={openBook}
                        />
                    </div>

                    <div className="space-y-6">
                        <ProfileReadingGoals
                            target={dashboardData.goal.target}
                            current={dashboardData.goal.current}
                        />

                        <ProfileRecentActivity
                            items={dashboardData.activity}
                            onOpenBook={openBook}
                            onBrowseBooks={() => navigate("/search")}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;
