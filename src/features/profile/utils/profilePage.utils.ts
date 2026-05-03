import type { AuthUser } from "../../auth/types/auth.types";
import type { LibraryEntry } from "../../library/types/library.types";
import type {
    ProfileActivityItem,
    ProfileDashboardData,
    ProfileShelfItem,
    ProfileSpotlightItem,
    ProfileStatItem,
    ProfileUser
} from "../types/profile.types";

const PROFILE_DEFAULT_BIO =
    "Curating future favorites, tracking every format, and slowly building a reading life worth revisiting.";

const STATUS_LABELS: Record<LibraryEntry["status"], string> = {
    want_to_read: "Want to Read",
    currently_reading: "Currently Reading",
    finished_reading: "Read",
    currently_listening: "Currently Listening",
    finished_listening: "Listened",
    on_break: "On Break",
    did_not_finish: "Did Not Finish"
};

const CURRENTLY_ACTIVE_STATUSES: LibraryEntry["status"][] = [
    "currently_reading",
    "currently_listening"
];

const FINISHED_STATUSES: LibraryEntry["status"][] = [
    "finished_reading",
    "finished_listening"
];

const getPrimaryFormatLabel = (entry: LibraryEntry) => {
    const format = entry.formats[0];

    if (format === "ebook") {
        return "ebook";
    }

    if (format === "audiobook") {
        return "audiobook";
    }

    return "book";
};

const formatDate = (value?: string) => {
    if (!value) {
        return "Recently updated";
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return "Recently updated";
    }

    return parsed.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

const getProgressLabel = (entry: LibraryEntry) => {
    if (entry.progressValue == null || entry.progressValue <= 0) {
        return undefined;
    }

    if (entry.progressUnit === "pages") {
        return `${entry.progressValue}/${entry.progressMax ?? "?"} pages`;
    }

    if (entry.progressUnit === "minutes") {
        return `${entry.progressValue} minutes in`;
    }

    if (entry.progressUnit === "hours") {
        return `${entry.progressValue} hours in`;
    }

    return `${entry.progressValue}% complete`;
};

const describeShelf = (shelfId: string, count: number) => {
    if (shelfId === "want_to_read") {
        return count > 0
            ? "The books queued up for a future reading mood."
            : "Start building a future stack for the stories waiting on deck.";
    }

    if (shelfId === "in_progress") {
        return count > 0
            ? "Your active reads and listens, ready to jump back into."
            : "Anything in progress will show up here once a reading session begins.";
    }

    if (shelfId === "finished") {
        return count > 0
            ? "Finished titles that now live in your reading history."
            : "Completed books and audiobooks will collect here over time.";
    }

    return count > 0
        ? "Paused or abandoned books that are still part of your reading story."
        : "Books you pause or set aside will be grouped here.";
};

const buildStats = (entries: LibraryEntry[]): ProfileStatItem[] => {
    const totalBooks = entries.length;
    const finishedCount = entries.filter((entry) => FINISHED_STATUSES.includes(entry.status)).length;
    const activeCount = entries.filter((entry) => CURRENTLY_ACTIVE_STATUSES.includes(entry.status)).length;
    const reviewCount = entries.filter((entry) => entry.reviewText?.trim()).length;

    return [
        {
            label: "Books in library",
            value: totalBooks.toString(),
            helperText: "Everything you have shelved across reading and listening."
        },
        {
            label: "Finished",
            value: finishedCount.toString(),
            helperText: "Titles you marked as completed in your reading history."
        },
        {
            label: "In progress",
            value: activeCount.toString(),
            helperText: "Books and audiobooks you are actively moving through."
        },
        {
            label: "Reviews written",
            value: reviewCount.toString(),
            helperText: "Public thoughts you have left on the books you tracked."
        }
    ];
};

const buildShelves = (entries: LibraryEntry[]): ProfileShelfItem[] => {
    const featuredShelves = [
        {
            id: "want_to_read",
            name: "Want to Read",
            statuses: ["want_to_read"] as LibraryEntry["status"][]
        },
        {
            id: "in_progress",
            name: "In Progress",
            statuses: ["currently_reading", "currently_listening"] as LibraryEntry["status"][]
        },
        {
            id: "finished",
            name: "Finished",
            statuses: ["finished_reading", "finished_listening"] as LibraryEntry["status"][]
        },
        {
            id: "paused",
            name: "Paused or Dropped",
            statuses: ["on_break", "did_not_finish"] as LibraryEntry["status"][]
        }
    ];

    return featuredShelves.map((shelf) => {
        const matchingEntries = entries.filter((entry) => shelf.statuses.includes(entry.status));

        return {
            id: shelf.id,
            name: shelf.name,
            count: matchingEntries.length,
            description: describeShelf(shelf.id, matchingEntries.length),
            previewBooks: matchingEntries.slice(0, 4).map((entry) => ({
                id: entry.externalBookId ?? entry.id,
                title: entry.title,
                coverUrl: entry.cover
            }))
        };
    });
};

const buildActivity = (entries: LibraryEntry[]): ProfileActivityItem[] => {
    return entries.slice(0, 7).map((entry) => {
        const hasReview = Boolean(entry.reviewText?.trim());
        const hasRating = typeof entry.rating === "number" && entry.rating > 0;
        const progressLabel = getProgressLabel(entry);
        let title = "Updated your reading activity";
        let description = `${entry.title} is now shelved as ${STATUS_LABELS[entry.status].toLowerCase()}.`;

        if (hasReview) {
            title = hasRating ? "Published a review and rating" : "Published a review";
            description = `Shared thoughts on ${entry.title}${hasRating ? ` with a ${entry.rating}-star rating.` : "."}`;
        } else if (entry.status === "want_to_read") {
            title = "Added a book to Want to Read";
            description = `${entry.title} is waiting in your future stack.`;
        } else if (entry.status === "currently_reading") {
            title = "Marked a book as currently reading";
            description = progressLabel
                ? `${entry.title} is in progress at ${progressLabel}.`
                : `${entry.title} is now part of your active reading stack.`;
        } else if (entry.status === "currently_listening") {
            title = "Started an audiobook";
            description = progressLabel
                ? `${entry.title} is in progress at ${progressLabel}.`
                : `${entry.title} is now in your active listening rotation.`;
        } else if (FINISHED_STATUSES.includes(entry.status)) {
            title = entry.status === "finished_listening" ? "Finished listening" : "Finished reading";
            description = `${entry.title} moved into your finished shelf.`;
        } else if (entry.status === "on_break") {
            title = "Paused a book";
            description = `${entry.title} is on hold for now.`;
        }

        return {
            id: entry.id,
            title,
            description,
            timestamp: formatDate(entry.updatedAt ?? entry.createdAt),
            bookId: entry.externalBookId ?? entry.id,
            bookTitle: entry.title,
            coverUrl: entry.cover,
            statusLabel: STATUS_LABELS[entry.status]
        };
    });
};

const buildSpotlight = (entries: LibraryEntry[]): ProfileSpotlightItem[] => {
    const activeEntries = entries.filter((entry) => CURRENTLY_ACTIVE_STATUSES.includes(entry.status));
    const fallbackEntries = entries.filter((entry) => entry.status === "want_to_read");
    const source = activeEntries.length > 0 ? activeEntries : fallbackEntries;

    return source.slice(0, 3).map((entry) => ({
        id: entry.externalBookId ?? entry.id,
        title: entry.title,
        author: entry.author ?? "Unknown author",
        coverUrl: entry.cover,
        statusLabel: STATUS_LABELS[entry.status],
        progressLabel: getProgressLabel(entry),
        detail:
            CURRENTLY_ACTIVE_STATUSES.includes(entry.status)
                ? `Keep going with this ${getPrimaryFormatLabel(entry)} from your active shelf.`
                : "A good candidate to move from your future shelf into an active read."
    }));
};

export const getInitials = (name?: string) => {
    if (!name) {
        return "BK";
    }

    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");

    return initials || "BK";
};

export const getImageSource = (imagePath?: string) => {
    if (!imagePath) {
        return undefined;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    return `http://localhost:4000${imagePath}`;
};

export const buildProfileFallback = (
    user: ProfileUser | null,
    authUser: AuthUser | null
) => {
    if (user) {
        return user;
    }

    return {
        id: "",
        name: authUser?.name ?? "Bookora Reader",
        email: authUser?.email ?? "reader@bookora.app",
        avatarUrl: authUser?.avatarUrl,
        coverImageUrl: authUser?.coverImageUrl,
        bio: authUser?.bio ?? "",
        isProfilePublic: true,
        role: "user"
    } satisfies ProfileUser;
};

export const getProfileBio = (profileBio?: string) => {
    return profileBio?.trim() || PROFILE_DEFAULT_BIO;
};

export const buildProfileDashboardData = (entries: LibraryEntry[]): ProfileDashboardData => {
    const sortedEntries = [...entries].sort((left, right) => {
        const leftTime = Date.parse(left.updatedAt ?? left.createdAt);
        const rightTime = Date.parse(right.updatedAt ?? right.createdAt);

        return rightTime - leftTime;
    });

    return {
        stats: buildStats(sortedEntries),
        shelves: buildShelves(sortedEntries),
        activity: buildActivity(sortedEntries),
        spotlight: buildSpotlight(sortedEntries),
        goal: {
            target: 20,
            current: sortedEntries.filter((entry) => FINISHED_STATUSES.includes(entry.status)).length
        }
    };
};
