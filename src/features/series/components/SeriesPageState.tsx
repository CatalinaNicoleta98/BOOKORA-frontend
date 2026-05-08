interface SeriesPageStateProps {
    title: string;
    description: string;
    tone?: "default" | "error";
}

const SeriesPageState = ({
    title,
    description,
    tone = "default",
}: SeriesPageStateProps) => (
    <div className="theme-glass-panel rounded-[2rem] p-8 text-center">
        <p className={`text-lg font-semibold ${tone === "error" ? "text-red-300" : "theme-title"}`}>
            {title}
        </p>
        <p className="theme-text-muted mt-3 text-sm leading-7">{description}</p>
    </div>
);

export default SeriesPageState;
