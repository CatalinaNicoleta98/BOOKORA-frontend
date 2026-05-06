import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReaderEmptyState from "../components/ReaderEmptyState";
import ReaderHero from "../components/ReaderHero";
import ReaderRecentActivity from "../components/ReaderRecentActivity";
import ReaderShelvesPreview from "../components/ReaderShelvesPreview";
import ReaderSpotlight from "../components/ReaderSpotlight";
import ReaderStats from "../components/ReaderStats";
import { getPublicReaderProfile } from "../services/socialProfileService";
import type { PublicReaderProfileResponse } from "../types/social.types";

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
        <div className="space-y-8 py-6">
            <ReaderHero reader={profile.reader} />
            <ReaderStats summary={profile.summary} />
            <ReaderShelvesPreview shelves={profile.shelves} />
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <ReaderRecentActivity items={profile.recentActivity} onOpenBook={openBook} />
                <ReaderSpotlight items={profile.spotlight} onOpenBook={openBook} />
            </div>
        </div>
    );
};

export default PublicReaderProfilePage;
