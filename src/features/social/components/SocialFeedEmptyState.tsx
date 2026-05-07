interface SocialFeedEmptyStateProps {
    title: string;
    description: string;
}

const SocialFeedEmptyState = ({
    title,
    description
}: SocialFeedEmptyStateProps) => {
    return (
        <div className="theme-content-panel-muted mt-5 rounded-[1.4rem] border-dashed p-5 text-sm leading-7 text-slate-400">
            <p className="theme-text text-base font-medium">{title}</p>
            <p className="mt-2">{description}</p>
        </div>
    );
};

export type { SocialFeedEmptyStateProps };
export default SocialFeedEmptyState;
