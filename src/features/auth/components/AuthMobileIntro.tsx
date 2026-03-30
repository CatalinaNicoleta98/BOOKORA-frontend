

type AuthMobileIntroProps = {
    title: string;
    subtitle: string;
};

const AuthMobileIntro = ({ title, subtitle }: AuthMobileIntroProps) => {
    return (
        <div className="mb-10 space-y-5 lg:hidden">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-semibold text-amber-100 shadow-inner shadow-white/10">
                    B
                </div>
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Bookora</p>
                    <p className="text-sm text-slate-300">Personal reading sanctuary</p>
                </div>
            </div>

            <h1 className="max-w-md text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                {title}
            </h1>

            <p className="text-sm leading-6 text-slate-300">
                {subtitle}
            </p>
        </div>
    );
};

export default AuthMobileIntro;