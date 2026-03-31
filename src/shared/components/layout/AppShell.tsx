import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";

const AppShell = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.18),_transparent_25%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(244,208,140,0.12),_transparent_25%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(96,165,250,0.12),_transparent_25%)]" />
            </div>
            <div className="relative z-10 flex min-h-screen flex-col">
                <Navbar />

                <main className="flex-1 pt-16">
                    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default AppShell;