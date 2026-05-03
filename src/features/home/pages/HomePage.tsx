import { useState, useEffect } from "react";

import { getHomePageData } from "../services/homeService";
import HomeLayout from "../components/HomeLayout";
import { useAuth } from "../../auth/context/AuthContext";

const HomePage = () => {
    const { state: authState } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<null | import("../types/home.types").HomePageData>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getHomePageData();
                setData({
                    ...result,
                    userName: authState.user?.name ?? result.userName,
                });
            } catch {
                setError("Could not load your home page right now.");
            } finally {
                setIsLoading(false);
            }
        };

        void load();
    }, [authState.user?.name]);

    if (error) {
        return <div className="p-8 text-red-300">{error}</div>;
    }

    if (isLoading || !data) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-slate-300">
                Loading your reading space...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <HomeLayout data={data} />
        </div>
    );
};

export default HomePage;
