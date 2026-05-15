export const DEFAULT_READING_GOAL = 20;

const MIN_READING_GOAL = 1;
const MAX_READING_GOAL = 999;

const clampReadingGoal = (value: number) => {
    return Math.min(MAX_READING_GOAL, Math.max(MIN_READING_GOAL, Math.round(value)));
};

const getGoalOwnerKey = (userKey?: string | null) => {
    return userKey?.trim().toLowerCase() || "default";
};

export const getReadingGoalYear = () => {
    return new Date().getFullYear();
};

export const getReadingGoalLabel = (year = getReadingGoalYear()) => {
    return `${year} Reading Goal`;
};

export const getStoredReadingGoal = (
    userKey?: string | null,
    year = getReadingGoalYear()
) => {
    if (typeof window === "undefined") {
        return DEFAULT_READING_GOAL;
    }

    const storageKey = `bookora:reading-goal:${getGoalOwnerKey(userKey)}:${year}`;

    try {
        const storedValue = window.localStorage.getItem(storageKey);

        if (!storedValue) {
            return DEFAULT_READING_GOAL;
        }

        const parsedValue = Number.parseInt(storedValue, 10);

        if (!Number.isFinite(parsedValue)) {
            return DEFAULT_READING_GOAL;
        }

        return clampReadingGoal(parsedValue);
    } catch {
        return DEFAULT_READING_GOAL;
    }
};

export const saveStoredReadingGoal = (
    userKey: string | null | undefined,
    value: number,
    year = getReadingGoalYear()
) => {
    if (typeof window === "undefined") {
        return clampReadingGoal(value);
    }

    const normalizedValue = clampReadingGoal(value);
    const storageKey = `bookora:reading-goal:${getGoalOwnerKey(userKey)}:${year}`;

    try {
        window.localStorage.setItem(storageKey, String(normalizedValue));
    } catch {
        return normalizedValue;
    }

    return normalizedValue;
};
