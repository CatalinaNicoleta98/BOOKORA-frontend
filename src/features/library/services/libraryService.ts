
import { httpClient } from "../../../shared/api/httpClient";
import type {
  LibraryEntry,
  BookFormat,
  CreateLibraryEntryPayload,
  ReadingSession,
  UpdateLibraryEntryPayload
} from "../types/library.types";

// Library Service
// Handles all API calls related to user library

const BASE_URL = "/library";

type LibraryEntryApiRecord = {
  _id?: string;
  id?: string;
  bookSource?: "open_library" | "manual";
  externalBookId?: string;
  title?: string;
  author?: string;
  cover?: string;
  publishedYear?: number;
  status: LibraryEntry["status"];
  formats?: BookFormat[];
  format?: BookFormat;
  customLists?: string[];
  rating?: number;
  reviewText?: string;
  notes?: string;
  isSpoiler?: boolean;
  dateStarted?: string;
  dateFinished?: string;
  readingSessions?: Array<{
    dateStarted?: string;
    dateFinished?: string;
  }>;
  progressValue?: number;
  progressMax?: number;
  progressUnit?: LibraryEntry["progressUnit"];
  createdAt?: string;
  updatedAt?: string;
};

type LibraryCollectionResponse = {
  data?: LibraryEntryApiRecord[];
};

const normalizeLibraryEntry = (entry: LibraryEntryApiRecord): LibraryEntry => {
  const readingSessions: ReadingSession[] =
    entry.readingSessions?.map((session, index) => ({
      id: `${entry._id ?? entry.id ?? "session"}-${index}`,
      dateStarted: session.dateStarted,
      dateFinished: session.dateFinished
    })) ??
    [
      {
        id: `${entry._id ?? entry.id ?? "session"}-0`,
        dateStarted: entry.dateStarted,
        dateFinished: entry.dateFinished
      }
    ].filter((session) => session.dateStarted || session.dateFinished);

  return {
    id: entry._id ?? entry.id ?? "",
    bookSource: entry.bookSource ?? "open_library",
    externalBookId: entry.externalBookId,
    title: entry.title ?? "",
    author: entry.author,
    cover: entry.cover,
    publishedYear: entry.publishedYear,
    status: entry.status,
    formats: entry.formats ?? (entry.format ? [entry.format] : []),
    customLists: entry.customLists ?? [],
    rating: entry.rating,
    reviewText: entry.reviewText,
    isSpoiler: entry.isSpoiler ?? false,
    notes: entry.notes,
    dateStarted: entry.dateStarted,
    dateFinished: entry.dateFinished,
    readingSessions,
    progressValue: entry.progressValue,
    progressMax: entry.progressMax,
    progressUnit: entry.progressUnit,
    createdAt: entry.createdAt ?? new Date().toISOString(),
    updatedAt: entry.updatedAt
  };
};

const buildLibraryPayload = (
  payload: CreateLibraryEntryPayload | UpdateLibraryEntryPayload
) => {
  return {
    ...payload,
    format: payload.formats?.[0],
    dateStarted: payload.readingSessions?.[payload.readingSessions.length - 1]?.dateStarted ?? payload.dateStarted,
    dateFinished:
      payload.readingSessions?.[payload.readingSessions.length - 1]?.dateFinished ?? payload.dateFinished,
    readingSessions: payload.readingSessions?.map((session) => ({
      dateStarted: session.dateStarted,
      dateFinished: session.dateFinished
    }))
  };
};

const normalizeBookId = (bookId: string) => bookId.replace("/works/", "").trim();

// Get full user library
export const getLibrary = async (): Promise<LibraryEntry[]> => {
  const response = await httpClient.get<LibraryEntry[] | LibraryCollectionResponse>(
    BASE_URL
  );

  const payload = Array.isArray(response.data)
    ? response.data
    : response.data.data ?? [];

  return payload.map(normalizeLibraryEntry);
};

// Get library entry by external book id (Open Library work id)
export const getLibraryEntryByBookId = async (
  externalBookId: string
): Promise<LibraryEntry | null> => {
  const entries = await getLibrary();
  const normalizedBookId = normalizeBookId(externalBookId);

  return (
    entries.find((entry) => normalizeBookId(entry.externalBookId ?? "") === normalizedBookId) ??
    null
  );
};

// Create new library entry
export const createLibraryEntry = async (
  payload: CreateLibraryEntryPayload
): Promise<LibraryEntry> => {
  const { data } = await httpClient.post<LibraryEntryApiRecord>(
    BASE_URL,
    buildLibraryPayload(payload)
  );

  return normalizeLibraryEntry(data);
};

// Update existing library entry
export const updateLibraryEntry = async (
  entryId: string,
  payload: UpdateLibraryEntryPayload
): Promise<LibraryEntry> => {
  const { data } = await httpClient.put<LibraryEntryApiRecord>(
    `${BASE_URL}/${entryId}`,
    buildLibraryPayload(payload)
  );

  return normalizeLibraryEntry(data);
};

export const deleteLibraryEntry = async (entryId: string): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${entryId}`);
};

// Create or update helper (used from book page / edit page)
export const upsertLibraryEntry = async (
  existingEntry: LibraryEntry | null,
  createPayload: CreateLibraryEntryPayload,
  updatePayload: UpdateLibraryEntryPayload
): Promise<LibraryEntry> => {
  if (existingEntry) {
    return updateLibraryEntry(existingEntry.id, updatePayload);
  }

  return createLibraryEntry(createPayload);
};
