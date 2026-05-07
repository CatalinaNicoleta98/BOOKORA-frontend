import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReaderChallengePanel from "../components/ReaderChallengePanel";
import ReaderEmptyState from "../components/ReaderEmptyState";
import ReaderHero from "../components/ReaderHero";
import ReaderRecentActivity from "../components/ReaderRecentActivity";
import ReaderShelvesPreview from "../components/ReaderShelvesPreview";
import { getPublicReaderProfile } from "../services/socialProfileService";
import type { PublicReaderProfileResponse } from "../types/social.types";
import type { FollowMutationResult } from "../services/followService";

const PublicReaderProfilePage = () => {
    const navigate = useNavigate();
    const { handle } = useParams<{ handle: string }>();
    const [profile, setProfile] = useState<PublicReaderProfileResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUnavailable, setIsUnavailable] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const loadProfile = async () => {
            if (!handle) {
                setIsUnavailable(true);
                setError(null);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setIsUnavailable(false);
                setError(null);

                const response = await getPublicReaderProfile(handle);

                if (!isCancelled) {
                    setProfile(response);
                }
            } catch (loadError) {
                if (isCancelled) {
                    return;
                }

                if (axios.isAxiosError(loadError) && loadError.response) {
                    if (loadError.response.status === 404 || loadError.response.status === 403) {
                        setIsUnavailable(true);
                        setProfile(null);
                        return;
                    }
                }

                if (loadError instanceof Error && loadError.message === "Invalid reader handle.") {
                    setIsUnavailable(true);
                    setProfile(null);
                    return;
                }

                setError("Could not load this reader profile right now.");
                setProfile(null);
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        void loadProfile();

        return () => {
            isCancelled = true;
        };
    }, [handle]);

    const openBook = (externalBookId: string) => {
        navigate(`/books/${encodeURIComponent(externalBookId)}`);
    };

    const handleFollowStateChange = (result: FollowMutationResult) => {
        setProfile((currentProfile) => {
            if (!currentProfile || currentProfile.reader.id !== result.targetUserId) {
                return currentProfile;
            }

            return {
                ...currentProfile,
                reader: {
                    ...currentProfile.reader,
                    isFollowing: result.following,
                    followerCount: result.followerCount,
                    followingCount: result.followingCount
                }
            };
        });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="theme-content-panel rounded-[2rem] px-6 py-5 text-sm text-slate-300">
                    Loading reader profile...
                </div>
            </div>
        );
    }

    if (isUnavailable) {
        return (
            <div className="space-y-6 py-6">
                <ReaderEmptyState
                    title="Reader profile unavailable"
                    description="This reader profile could not be found or is not currently available for public viewing."
                />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="space-y-6 py-6">
                <ReaderEmptyState
                    title="Could not load profile"
                    description={error ?? "Something went wrong while loading this reader profile."}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6 py-5 sm:space-y-8 sm:py-6">
            <ReaderHero
                reader={profile.reader}
                onFollowStateChange={handleFollowStateChange}
            />
            <ReaderChallengePanel summary={profile.summary} />
            <div className="grid gap-5 xl:grid-cols-[minmax(290px,0.78fr)_minmax(0,1.22fr)] xl:gap-6">
                <aside className="order-2 xl:order-1">
                    <ReaderShelvesPreview
                        shelves={profile.shelves}
                        recentActivity={profile.recentActivity}
                        spotlight={profile.spotlight}
                        onOpenBook={openBook}
                    />
                </aside>
                <div className="order-1 space-y-6 xl:order-2">
                    <ReaderRecentActivity items={profile.recentActivity} onOpenBook={openBook} />
                </div>
            </div>
        </div>
    );
};

export default PublicReaderProfilePage;
