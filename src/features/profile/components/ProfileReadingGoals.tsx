

interface ProfileReadingGoalsProps {
    target: number;
    current: number;
    isEditing?: boolean;
    editValue?: string;
    errorMessage?: string | null;
    successMessage?: string | null;
    onEditValueChange?: (value: string) => void;
    onStartEditing?: () => void;
    onCancelEditing?: () => void;
    onSaveEditing?: () => void;
}

const ProfileReadingGoals = ({
    target,
    current,
    isEditing = false,
    editValue = "",
    errorMessage = null,
    successMessage = null,
    onEditValueChange,
    onStartEditing,
    onCancelEditing,
    onSaveEditing
}: ProfileReadingGoalsProps) => {
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
                <div className="flex items-center gap-3">
                    <span className="theme-text-muted text-sm">
                        {current} / {target}
                    </span>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onCancelEditing}
                                className="theme-button-ghost rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onSaveEditing}
                                className="theme-button-primary rounded-full px-3 py-1.5 text-xs font-medium"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={onStartEditing}
                            className="theme-button-ghost rounded-full px-3 py-1.5 text-xs font-medium"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            {isEditing ? (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label className="theme-text-muted text-sm" htmlFor="reading-goal-target">
                        Goal
                    </label>
                    <input
                        id="reading-goal-target"
                        type="number"
                        min={1}
                        step={1}
                        inputMode="numeric"
                        value={editValue}
                        onChange={(event) => onEditValueChange?.(event.target.value)}
                        className="theme-input min-w-[7rem] rounded-full px-4 py-2 text-sm"
                    />
                    <span className="theme-text-muted text-sm">books this year</span>
                </div>
            ) : null}

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
            {errorMessage ? <p className="mt-3 text-sm text-rose-300">{errorMessage}</p> : null}
            {successMessage ? <p className="mt-3 text-sm text-emerald-300">{successMessage}</p> : null}
        </section>
    );
};

export type { ProfileReadingGoalsProps };
export default ProfileReadingGoals;
