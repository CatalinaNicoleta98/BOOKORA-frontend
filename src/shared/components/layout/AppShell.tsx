import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";

const AppShell = () => {
    return (
        <div className="min-h-screen bg-[#070a12] text-slate-100">
            <div className="relative flex min-h-screen flex-col">
                <Navbar />

                <main className="flex-1 pt-16">
                    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppShell;