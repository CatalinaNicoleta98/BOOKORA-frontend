import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

import { getHomePageData } from "../services/homeService";
import HomeLayout from "../components/HomeLayout";

const HomePage = () => {
    const navigate = useNavigate();
    const { state, logout } = useAuth();

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<null | import("../types/home.types").HomePageData>(null);

    const firstName = state.user?.name?.split(" ")[0] ?? "Reader";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getHomePageData();
                setData(result);
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, []);

    if (isLoading || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(78,88,150,0.16),transparent_22%),linear-gradient(180deg,#0b1020_0%,#0a0f1d_36%,#070b16_100%)] text-slate-300">
                Loading your reading space...
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            {/* Atmospheric background layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(78,88,150,0.18),transparent_22%),linear-gradient(180deg,#0b1020_0%,#0a0f1d_36%,#070b16_100%)]" />

            {/* Soft star field */}
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.9)_0.8px,transparent_1px)] [background-size:220px_220px]" />
            <div className="absolute inset-0 opacity-12 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1.2px)] [background-size:320px_320px]" />

            {/* Gentle cinematic glow */}
            <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(118,122,201,0.16),transparent_52%)]" />
            <div className="absolute right-[-8rem] top-[10%] h-72 w-72 rounded-full bg-amber-200/6 blur-3xl" />
            <div className="absolute left-[-8rem] bottom-[8%] h-72 w-72 rounded-full bg-violet-400/8 blur-3xl" />

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.12)_100%)]" />

            {/* Content layer */}
            <div className="relative z-10">
                {/* Header */}
                <header className="relative z-30 flex items-center justify-between border-b border-white/10 bg-[rgba(8,12,24,0.72)] px-6 py-5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-amber-100 shadow-inner shadow-white/10">
                            B
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bookora</p>
                            <p className="text-sm text-slate-200">Welcome back, {firstName}</p>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileMenuOpen((v) => !v)}
                            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-slate-100 backdrop-blur-md transition hover:bg-white/[0.08]"
                        >
                            {firstName}
                        </button>

                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[rgba(12,17,31,0.92)] shadow-[0_20px_40px_rgba(0,0,0,0.28)] backdrop-blur-lg">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-white/10"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <HomeLayout data={data} />
            </div>
        </div>
    );
};

export default HomePage;