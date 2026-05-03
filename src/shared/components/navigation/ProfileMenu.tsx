import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getImageSource = (imagePath?: string | null) => {
    if (!imagePath) {
        return undefined;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `http://localhost:4000${imagePath}`;
};

interface ProfileMenuProps {
    userDisplayName: string;
    userInitials: string;
    avatarUrl?: string | null;
    onLogout: () => void;
}

const ProfileMenu = ({
    userDisplayName,
    userInitials,
    avatarUrl,
    onLogout,
}: ProfileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const avatarSource = getImageSource(avatarUrl);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className="group inline-flex items-center justify-center rounded-2xl border border-[var(--bookora-border)] bg-[var(--bookora-surface)] p-1 transition-transform duration-200 hover:scale-[1.02] hover:border-[var(--bookora-border-strong)]"
            >
                {avatarSource ? (
                    <img
                        src={avatarSource}
                        alt={`${userDisplayName} avatar`}
                        className="h-11 w-11 rounded-xl object-cover"
                    />
                ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-300/80 via-indigo-300/80 to-fuchsia-300/80 text-base font-semibold text-slate-950">
                        {userInitials}
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-[var(--bookora-border)] bg-[var(--bookora-surface-strong)] shadow-[0_20px_40px_rgba(0,0,0,0.18)] backdrop-blur-lg">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/profile");
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-[var(--bookora-text)] hover:bg-[var(--bookora-surface)]"
                    >
                        Profile
                    </button>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-[var(--bookora-surface)]"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
