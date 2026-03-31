

import { Link } from "react-router-dom";

interface NavLogoProps {
    onClick?: () => void;
}

const NavLogo = ({ onClick }: NavLogoProps) => {
    return (
        <Link
            to="/"
            onClick={onClick}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-3 py-2 transition-all duration-300 hover:border-white/14 hover:bg-white/10"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200/90 via-orange-300/80 to-rose-300/75 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(251,191,36,0.22)] transition-transform duration-300 group-hover:scale-[1.03]">
                B
            </div>

            <div className="min-w-0">
                <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
                    Bookora
                </p>
                <p className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    Read, track, collect
                </p>
            </div>
        </Link>
    );
};

export default NavLogo;