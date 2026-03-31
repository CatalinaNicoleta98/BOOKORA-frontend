import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";

const AppShell = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.22),_transparent_25%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(244,208,140,0.16),_transparent_25%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(96,165,250,0.16),_transparent_25%)]" />

                {/* Star layers */}
                <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.9)_0.8px,transparent_1px)] [background-size:220px_220px]" />
                <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1.2px)] [background-size:320px_320px]" />

                {/* Glow effects */}
                <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(118,122,201,0.18),transparent_55%)]" />
                <div className="absolute right-[-10rem] top-[10%] h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
                <div className="absolute left-[-10rem] bottom-[10%] h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.15)_100%)]" />
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