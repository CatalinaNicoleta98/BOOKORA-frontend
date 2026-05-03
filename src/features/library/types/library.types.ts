
// Library Types (Frontend)
export type ReadingStatus =
  | "want_to_read"
  | "currently_reading"
  | "finished_reading"
  | "currently_listening"
  | "finished_listening"
  | "on_break"
  | "did_not_finish";

export type BookFormat = "physical" | "ebook" | "audiobook";

export interface ReadingSession {
  id: string;
  dateStarted?: string;
  dateFinished?: string;
}

export interface LibraryBookSeed {
  externalBookId: string;
  title: string;
  author?: string;
  cover?: string;
  publishedYear?: number;
}

export interface EditBookActivityLocationState {
  book?: LibraryBookSeed;
  focusSection?: "review";
}

export interface LibraryEntry {
  id: string;

  // Book reference
  bookSource: "open_library" | "manual";
  externalBookId?: string;

  // Snapshot (for fast UI rendering)
  title: string;
  author?: string;
  cover?: string;
  publishedYear?: number;

  // User relationship
  status: ReadingStatus;

  // Formats (multi-select)
  formats: BookFormat[];

  // Custom lists (names for now)
  customLists: string[];

  // Rating & review
  rating?: number; // 0.5 - 5
  reviewText?: string;
  isSpoiler?: boolean;

  // Optional private notes
  notes?: string;

  // Reading activity
  dateStarted?: string; // ISO string
  dateFinished?: string; // ISO string
  readingSessions?: ReadingSession[];

  // Progress
  progressValue?: number;
  progressMax?: number;
  progressUnit?: "pages" | "percent" | "minutes" | "hours";

  createdAt: string;
  updatedAt?: string;
}

// Payloads (Create / Update)
export interface CreateLibraryEntryPayload {
  bookSource: "open_library" | "manual";
  externalBookId?: string;

  title: string;
  author?: string;
  cover?: string;
  publishedYear?: number;

  status: ReadingStatus;

  formats?: BookFormat[];
  customLists?: string[];

  rating?: number;
  reviewText?: string;
  isSpoiler?: boolean;
  notes?: string;

  dateStarted?: string;
  dateFinished?: string;
  readingSessions?: ReadingSession[];

  progressValue?: number;
  progressMax?: number;
  progressUnit?: "pages" | "percent" | "minutes" | "hours";
}

export type UpdateLibraryEntryPayload = Partial<CreateLibraryEntryPayload>;
