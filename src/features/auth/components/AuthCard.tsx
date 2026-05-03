

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

            <div className="theme-glass-panel relative rounded-[28px] px-8 py-10">
                {eyebrow ? (
                    <p className="theme-eyebrow">
                        {eyebrow}
                    </p>
                ) : null}

                <h1 className="theme-title mt-3 text-3xl font-semibold leading-tight">
                    {title}
                </h1>

                {description ? (
                    <p className="theme-text-soft mt-3 text-sm leading-relaxed">
                        {description}
                    </p>
                ) : null}

                {children}

                {footer ? (
                    <div className="theme-text-soft mt-8 text-center text-sm">
                        {footer}
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default AuthCard;
