

interface ProfileReadingGoalsProps {
    target: number;
    current: number;
}

const ProfileReadingGoals = ({ target, current }: ProfileReadingGoalsProps) => {
    const progress = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
    const remaining = Math.max(target - current, 0);
    const helperText =
        remaining === 0
            ? "Reading goal reached. Everything from here is bonus momentum."
            : `${remaining} ${remaining === 1 ? "book" : "books"} left to hit this year's target.`;

    return (
        <section className="rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Reading goal</h2>
                <span className="text-sm text-slate-400">
                    {current} / {target}
                </span>
            </div>

            <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mt-3 text-sm text-slate-400">
                {progress}% completed
            </p>
            <p className="mt-1 text-sm text-slate-500">{helperText}</p>
        </section>
    );
};

export type { ProfileReadingGoalsProps };
export default ProfileReadingGoals;
