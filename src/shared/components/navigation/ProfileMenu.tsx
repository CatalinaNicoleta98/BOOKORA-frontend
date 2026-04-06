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
                className="group inline-flex items-center justify-center rounded-xl p-0 transition-transform duration-200 hover:scale-105"
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
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-[rgba(12,17,31,0.96)] shadow-[0_20px_40px_rgba(0,0,0,0.28)] backdrop-blur-lg">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/profile");
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-white/10"
                    >
                        Profile
                    </button>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-300 hover:bg-white/10"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;