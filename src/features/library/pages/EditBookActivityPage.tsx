import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type {
  LibraryEntry,
  ReadingStatus,
  BookFormat,
  UpdateLibraryEntryPayload,
  CreateLibraryEntryPayload
} from "../types/library.types";

import {
  getLibraryEntryByBookId,
  upsertLibraryEntry
} from "../services/libraryService";

import OwnershipFormatSelector from "../components/OwnershipFormatSelector";
import CustomListsSelector from "../components/CustomListSelector";


import BookRatingStars from "../../../features/book/components/BookRatingStars";
import ReadingDatesForm from "../components/ReadingDatesForm";


// EditBookActivityPage

const DEFAULT_STATUS: ReadingStatus = "want_to_read";

export const EditBookActivityPage = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const [entry, setEntry] = useState<LibraryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Form state
  const [status, setStatus] = useState<ReadingStatus>(DEFAULT_STATUS);
  const [formats, setFormats] = useState<BookFormat[]>([]);
  const [customLists, setCustomLists] = useState<string[]>([]);
  const [rating, setRating] = useState<number | undefined>();
  const [reviewText, setReviewText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [dateStarted, setDateStarted] = useState<string | undefined>();
  const [dateFinished, setDateFinished] = useState<string | undefined>();

  // Load existing entry

  useEffect(() => {
    const load = async () => {
      if (!bookId) return;

      try {
        const existing = await getLibraryEntryByBookId(bookId);
        setEntry(existing);

        if (existing) {
          setStatus(existing.status);
          setFormats(existing.formats ?? []);
          setCustomLists(existing.customLists ?? []);
          setRating(existing.rating);
          setReviewText(existing.reviewText ?? "");
          setIsSpoiler(existing.isSpoiler ?? false);
          setDateStarted(existing.dateStarted);
          setDateFinished(existing.dateFinished);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [bookId]);

  // Save handler

  const handleSave = async () => {
    if (!bookId) return;

    setSaving(true);
    setSaveMessage(null);
    setSaveError(null);

    try {
      const createPayload: CreateLibraryEntryPayload = {
        bookSource: "open_library",
        externalBookId: bookId,
        title: entry?.title ?? "",
        author: entry?.author,
        cover: entry?.cover,
        publishedYear: entry?.publishedYear,
        status,
        formats,
        customLists,
        rating,
        reviewText,
        isSpoiler,
        dateStarted,
        dateFinished
      };

      const updatePayload: UpdateLibraryEntryPayload = {
        status,
        formats,
        customLists,
        rating,
        reviewText,
        isSpoiler,
        dateStarted,
        dateFinished
      };

      const saved = await upsertLibraryEntry(entry, createPayload, updatePayload);
      setEntry(saved);
      setSaveMessage("Activity saved.");
    } catch {
      setSaveError("Could not save activity. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // UI

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Edit Activity</h1>

      <div className="space-y-6">
        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className="w-full rounded-lg border bg-transparent px-3 py-2"
          >
            <option value="want_to_read">Want to read</option>
            <option value="currently_reading">Currently reading</option>
            <option value="finished_reading">Read</option>
            <option value="currently_listening">Currently listening</option>
            <option value="finished_listening">Listened</option>
            <option value="on_break">On break</option>
            <option value="did_not_finish">Did not finish</option>
          </select>
        </div>

        {/* Formats */}
        <OwnershipFormatSelector
          value={formats}
          onChange={setFormats}
        />

        {/* Custom Lists */}
        <CustomListsSelector
          value={customLists}
          onChange={setCustomLists}
        />

        {/* Rating */}
        <div>
          <label className="mb-2 block text-sm font-medium">Your rating</label>
          <BookRatingStars
            value={rating ?? 0}
            onChange={(value: number) => setRating(value)}
          />
        </div>

        {/* Reading Dates */}
        <ReadingDatesForm
          dateStarted={dateStarted}
          dateFinished={dateFinished}
          onDateStartedChange={setDateStarted}
          onDateFinishedChange={setDateFinished}
        />

        {/* Review */}
        <div>
          <label className="mb-2 block text-sm font-medium">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={5}
            className="w-full rounded-lg border bg-transparent px-3 py-2"
          />
        </div>

        {/* Spoiler */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
          />
          <span className="text-sm">Contains spoilers</span>
        </div>

        {(saveMessage || saveError) && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              saveError
                ? "border-red-400/40 bg-red-950/30 text-red-200"
                : "border-emerald-400/40 bg-emerald-950/30 text-emerald-200"
            }`}
          >
            {saveError ?? saveMessage}
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookActivityPage;