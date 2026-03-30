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
            <div className="min-h-screen flex items-center justify-center bg-[#070a12] text-slate-300">
                Loading your reading space...
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            {/* Header */}
            <header className="relative z-30 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/10">
                        B
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Bookora</p>
                        <p className="text-sm text-slate-300">Welcome back, {firstName}</p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileMenuOpen((v) => !v)}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                    >
                        {firstName}
                    </button>

                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#11182b] border border-white/10 rounded-xl">
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
    );
};

export default HomePage;