interface ReaderEmptyStateProps {
    title: string;
    description: string;
}

const ReaderEmptyState = ({ title, description }: ReaderEmptyStateProps) => {
    return (
        <section className="theme-content-panel rounded-[2rem] p-6 sm:p-8">
            <div className="theme-content-panel-muted rounded-[1.6rem] border-dashed p-6 sm:p-7">
                <h2 className="theme-title text-xl font-semibold">{title}</h2>
                <p className="theme-text-muted mt-3 max-w-2xl text-sm leading-7">{description}</p>
            </div>
        </section>
    );
};

export type { ReaderEmptyStateProps };
export default ReaderEmptyState;
