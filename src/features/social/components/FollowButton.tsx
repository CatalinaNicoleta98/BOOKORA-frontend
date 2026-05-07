import { useState } from "react";
import { followReader, unfollowReader, type FollowMutationResult } from "../services/followService";

interface FollowButtonProps {
    readerId: string;
    isFollowing: boolean;
    isOwnProfile: boolean;
    onFollowStateChange: (result: FollowMutationResult) => void;
}

const FollowButton = ({
    readerId,
    isFollowing,
    isOwnProfile,
    onFollowStateChange
}: FollowButtonProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggleFollow = async () => {
        const normalizedReaderId = readerId.trim();

        if (!normalizedReaderId) {
            setError("Reader profile is missing a valid id.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const result = isFollowing
                ? await unfollowReader(normalizedReaderId)
                : await followReader(normalizedReaderId);

            onFollowStateChange(result);
        } catch (toggleError) {
            setError(
                toggleError instanceof Error
                    ? toggleError.message
                    : "Could not update follow status right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isOwnProfile) {
        return (
            <div className="space-y-2">
                <button
                    type="button"
                    disabled
                    className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium opacity-70"
                >
                    Your profile
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <button
                type="button"
                onClick={handleToggleFollow}
                disabled={isSubmitting}
                className={`inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                    isFollowing
                        ? "theme-button-ghost"
                        : "theme-button-accent"
                }`}
            >
                {isSubmitting ? "Updating..." : isFollowing ? "Following" : "Follow"}
            </button>
            {error ? (
                <p className="max-w-[14rem] text-xs leading-6 text-rose-200">{error}</p>
            ) : null}
        </div>
    );
};

export type { FollowButtonProps };
export default FollowButton;
