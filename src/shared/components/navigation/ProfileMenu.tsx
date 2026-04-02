import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className="group inline-flex items-center justify-center rounded-2xl border border-white/8 bg-white/6 p-2 transition-all duration-300 hover:border-white/14 hover:bg-white/10"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={`${userDisplayName} avatar`}
                        className="h-10 w-10 rounded-xl object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-300/80 via-indigo-300/80 to-fuchsia-300/80 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(96,165,250,0.18)]">
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