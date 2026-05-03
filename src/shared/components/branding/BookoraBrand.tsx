interface BookoraBrandProps {
    compact?: boolean;
    tagline?: string;
    className?: string;
    markClassName?: string;
    titleClassName?: string;
}

const BookoraBrand = ({
    compact = false,
    tagline = "Read, track, collect",
    className,
    markClassName,
    titleClassName
}: BookoraBrandProps) => {
    return (
        <div className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
            <div
                className={[
                    "bookora-brand-mark relative flex shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem]",
                    compact ? "h-10 w-10" : "h-11 w-11",
                    markClassName
                ].filter(Boolean).join(" ")}
                aria-hidden="true"
            >
                <svg viewBox="0 0 64 64" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18 16.5C18 14.567 19.567 13 21.5 13H42.5C44.433 13 46 14.567 46 16.5V48.5C46 50.433 44.433 52 42.5 52H21.5C19.567 52 18 50.433 18 48.5V16.5Z"
                        fill="currentColor"
                        fillOpacity="0.18"
                    />
                    <path
                        d="M24 17H39.5C42.5376 17 45 19.4624 45 22.5V46.5C45 46.7761 44.7761 47 44.5 47H28.5C26.0147 47 24 44.9853 24 42.5V17Z"
                        fill="currentColor"
                        fillOpacity="0.9"
                    />
                    <path
                        d="M24 17H21.75C19.6789 17 18 18.6789 18 20.75V43.25C18 45.3211 19.6789 47 21.75 47H28"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M28 23.5H39"
                        stroke="rgba(14,18,29,0.72)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M28 29.5H39"
                        stroke="rgba(14,18,29,0.72)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M28 35.5H35"
                        stroke="rgba(14,18,29,0.72)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle cx="44.5" cy="19.5" r="4.5" fill="#FFF4CF" />
                </svg>
            </div>

            <div className="min-w-0">
                <p
                    className={[
                        "font-[Georgia,'Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-sm font-semibold uppercase tracking-[0.22em] bookora-brand-title",
                        titleClassName
                    ].filter(Boolean).join(" ")}
                >
                    Bookora
                </p>
                {!compact ? (
                    <p className="bookora-brand-tagline text-xs">{tagline}</p>
                ) : null}
            </div>
        </div>
    );
};

export default BookoraBrand;
