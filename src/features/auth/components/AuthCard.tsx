

import type { ReactNode } from "react";

interface AuthCardProps {
    eyebrow?: string;
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
}

const AuthCard = ({ eyebrow, title, description, children, footer }: AuthCardProps) => {
    return (
        <section className="relative w-full max-w-md">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(187,163,255,0.22),_transparent_60%)] blur-2xl" />

            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.035] px-8 py-10 shadow-[0_30px_80px_rgba(10,14,25,0.6)] backdrop-blur-2xl">
                {eyebrow ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                        {eyebrow}
                    </p>
                ) : null}

                <h1 className="mt-3 text-3xl font-semibold leading-tight text-white">
                    {title}
                </h1>

                {description ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {description}
                    </p>
                ) : null}

                {children}

                {footer ? (
                    <div className="mt-8 text-center text-sm text-slate-400">
                        {footer}
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default AuthCard;