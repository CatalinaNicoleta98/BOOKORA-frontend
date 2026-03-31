import { Outlet } from "react-router-dom";

const AppShell = () => {
    return (
        <div className="min-h-screen bg-[#070a12] text-slate-100">
            <div className="relative flex min-h-screen flex-col">
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppShell;