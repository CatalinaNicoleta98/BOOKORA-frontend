import { useTheme } from "../../theme/ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isLightTheme = theme === "light";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
            title={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
            className="theme-toggle inline-flex h-11 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
        >
            <span
                className={`theme-toggle-bulb relative inline-flex h-5 w-5 items-center justify-center ${
                    isLightTheme ? "is-on" : "is-off"
                }`}
                aria-hidden="true"
            >
                <span className="theme-toggle-glow absolute inset-0 rounded-full" />
                <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.5 18.25H14.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M10 21H14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M8.75 14.25C7.63905 13.3471 7 11.9959 7 10.5682C7 7.76924 9.23858 5.5 12 5.5C14.7614 5.5 17 7.76924 17 10.5682C17 11.9959 16.361 13.3471 15.25 14.25C14.5552 14.8147 14.1371 15.6391 14.1371 16.5H9.8629C9.8629 15.6391 9.44475 14.8147 8.75 14.25Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <span>{isLightTheme ? "Light" : "Dark"}</span>
        </button>
    );
};

export default ThemeToggle;
