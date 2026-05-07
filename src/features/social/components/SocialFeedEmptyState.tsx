interface SocialFeedEmptyStateProps {
    title: string;
    description: string;
}

const SocialFeedEmptyState = ({
    title,
    description
}: SocialFeedEmptyStateProps) => {
    return (
        <div className="theme-content-panel-muted mt-6 overflow-hidden rounded-[1.5rem] border-dashed p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="theme-content-panel-soft flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] text-xs font-semibold uppercase tracking-[0.2em]">
                    Feed
                </div>

                <div className="min-w-0">
                    <p className="theme-text text-base font-medium">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
                </div>
            </div>
        </div>
    );
};

export type { SocialFeedEmptyStateProps };
export default SocialFeedEmptyState;
