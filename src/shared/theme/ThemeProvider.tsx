import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode
} from "react";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
    theme: ThemeMode;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

const THEME_STORAGE_KEY = "bookora-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): ThemeMode => {
    if (typeof window === "undefined") {
        return "dark";
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => getInitialTheme());

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.body.dataset.theme = theme;
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const value = useMemo<ThemeContextValue>(() => ({
        theme,
        toggleTheme: () => {
            setThemeState((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
        },
        setTheme: (nextTheme: ThemeMode) => {
            setThemeState(nextTheme);
        }
    }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }

    return context;
};
