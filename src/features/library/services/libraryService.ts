

import { httpClient } from "../../../shared/api/httpClient";
import type {
  LibraryEntry,
  CreateLibraryEntryPayload,
  UpdateLibraryEntryPayload
} from "../types/library.types";

// Library Service
// Handles all API calls related to user library

const BASE_URL = "/library";

// Get full user library
export const getLibrary = async (): Promise<LibraryEntry[]> => {
  const { data } = await httpClient.get<LibraryEntry[]>(BASE_URL);
  return data;
};

// Get library entry by external book id (Open Library work id)
export const getLibraryEntryByBookId = async (
  externalBookId: string
): Promise<LibraryEntry | null> => {
  try {
    const { data } = await httpClient.get<LibraryEntry>(
      `${BASE_URL}/${externalBookId}`
    );
    return data;
  } catch (error) {
    return null; // not found is valid state
  }
};

// Create new library entry
export const createLibraryEntry = async (
  payload: CreateLibraryEntryPayload
): Promise<LibraryEntry> => {
  const { data } = await httpClient.post<LibraryEntry>(
    BASE_URL,
    payload
  );
  return data;
};

// Update existing library entry
export const updateLibraryEntry = async (
  entryId: string,
  payload: UpdateLibraryEntryPayload
): Promise<LibraryEntry> => {
  const { data } = await httpClient.patch<LibraryEntry>(
    `${BASE_URL}/${entryId}`,
    payload
  );
  return data;
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