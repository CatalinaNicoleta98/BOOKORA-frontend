

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
        <section className="theme-content-panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between">
                <h2 className="theme-title text-lg font-semibold">Reading goal</h2>
                <span className="theme-text-muted text-sm">
                    {current} / {target}
                </span>
            </div>

            <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="theme-text-muted mt-3 text-sm">
                {progress}% completed
            </p>
            <p className="theme-text-muted mt-1 text-sm">{helperText}</p>
        </section>
    );
};

export type { ProfileReadingGoalsProps };
export default ProfileReadingGoals;
