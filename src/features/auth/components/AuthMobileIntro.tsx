

import BookoraBrand from "../../../shared/components/branding/BookoraBrand";

type AuthMobileIntroProps = {
    title: string;
    subtitle: string;
};

const AuthMobileIntro = ({ title, subtitle }: AuthMobileIntroProps) => {
    return (
        <div className="mb-10 space-y-5 lg:hidden">
            <BookoraBrand tagline="Personal reading sanctuary" />

            <h1 className="theme-title max-w-md text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.05em]">
                {title}
            </h1>

            <p className="theme-text-soft text-sm leading-6">
                {subtitle}
            </p>
        </div>
    );
};

export default AuthMobileIntro;
