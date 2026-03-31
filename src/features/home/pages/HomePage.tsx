import { useState, useEffect } from "react";

import { getHomePageData } from "../services/homeService";
import HomeLayout from "../components/HomeLayout";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<null | import("../types/home.types").HomePageData>(null);

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