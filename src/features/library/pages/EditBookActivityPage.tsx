import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import BookRatingStars from "../../book/components/BookRatingStars";
import { getBookDetail } from "../../book/services/bookService";
import { mapBookDetailToViewModel } from "../../book/utils/bookPage.utils";
import OwnershipFormatSelector from "../components/OwnershipFormatSelector";
import CustomListsSelector from "../components/CustomListSelector";
import ReadingDatesForm from "../components/ReadingDatesForm";
import {
  deleteLibraryEntry,
  getLibraryEntryByBookId,
  upsertLibraryEntry
} from "../services/libraryService";
import type {
  BookFormat,
  CreateLibraryEntryPayload,
  EditBookActivityLocationState,
  LibraryBookSeed,
  LibraryEntry,
  ReadingSession,
  ReadingStatus,
  UpdateLibraryEntryPayload
} from "../types/library.types";

const DEFAULT_STATUS: ReadingStatus = "want_to_read";

const statusOptions: Array<{
  value: ReadingStatus;
  label: string;
  description: string;
}> = [
  {
    value: "want_to_read",
    label: "Want to Read",
    description: "Save it for later and keep it on your radar."
  },
  {
    value: "currently_reading",
    label: "Currently Reading",
    description: "Track your active reading progress."
  },
  {
    value: "currently_listening",
    label: "Currently Listening",
    description: "Use this when you are in the audiobook."
  },
  {
    value: "finished_reading",
    label: "Read",
    description: "Mark the book as finished."
  },
  {
    value: "finished_listening",
    label: "Listened",
    description: "Mark the audiobook as finished."
  },
  {
    value: "on_break",
    label: "On Break",
    description: "Pause without losing your place."
  },
  {
    value: "did_not_finish",
    label: "Did Not Finish",
    description: "Record books you stepped away from."
  }
];

const getPublishedYear = (publishDate?: string) => {
  if (!publishDate) {
    return undefined;
  }

  const matchedYear = publishDate.match(/\b(\d{4})\b/);

  if (!matchedYear) {
    return undefined;
  }

  return Number.parseInt(matchedYear[1], 10);
};

const getBookSeedFromEntry = (libraryEntry: LibraryEntry): LibraryBookSeed => ({
  externalBookId: libraryEntry.externalBookId ?? libraryEntry.id,
  title: libraryEntry.title,
  author: libraryEntry.author,
  cover: libraryEntry.cover,
  publishedYear: libraryEntry.publishedYear
});

const getFallbackReadingSessions = (
  dateStarted?: string,
  dateFinished?: string
): ReadingSession[] => {
  if (!dateStarted && !dateFinished) {
    return [];
  }

  return [
    {
      id: "session-existing-0",
      dateStarted,
      dateFinished
    }
  ];
};

const getStatusBadgeCopy = (status: ReadingStatus) => {
  switch (status) {
    case "currently_reading":
      return "Reading now";
    case "currently_listening":
      return "Listening now";
    case "finished_reading":
      return "Finished";
    case "finished_listening":
      return "Finished audio";
    case "on_break":
      return "Paused";
    case "did_not_finish":
      return "Stopped";
    case "want_to_read":
    default:
      return "Want to read";
  }
};

const EditBookActivityPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as EditBookActivityLocationState | null;
  const reviewTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [entry, setEntry] = useState<LibraryEntry | null>(null);
  const [bookSeed, setBookSeed] = useState<LibraryBookSeed | null>(
    locationState?.book ?? null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [status, setStatus] = useState<ReadingStatus>(DEFAULT_STATUS);
  const [formats, setFormats] = useState<BookFormat[]>([]);
  const [customLists, setCustomLists] = useState<string[]>([]);
  const [rating, setRating] = useState<number | undefined>();
  const [reviewText, setReviewText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      if (!bookId) {
        setLoadError("Book id is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setLoadError(null);
        setSaveMessage(null);
        setSaveError(null);

        const normalizedBookId = bookId.replace("/works/", "").trim();
        const existing = await getLibraryEntryByBookId(normalizedBookId);

        if (isCancelled) {
          return;
        }

        if (existing) {
          setEntry(existing);
          setBookSeed(getBookSeedFromEntry(existing));
          setStatus(existing.status);
          setFormats(existing.formats ?? []);
          setCustomLists(existing.customLists ?? []);
          setRating(existing.rating);
          setReviewText(existing.reviewText ?? existing.notes ?? "");
          setIsSpoiler(existing.isSpoiler ?? false);
          setReadingSessions(
            existing.readingSessions?.length
              ? existing.readingSessions
              : getFallbackReadingSessions(existing.dateStarted, existing.dateFinished)
          );
          return;
        }

        if (locationState?.book) {
          setBookSeed(locationState.book);
          setStatus(DEFAULT_STATUS);
          setReadingSessions([]);
          return;
        }

        const response = await getBookDetail(normalizedBookId);

        if (!response.data || isCancelled) {
          return;
        }

        const mappedBook = mapBookDetailToViewModel(response.data);
        setBookSeed({
          externalBookId: mappedBook.id,
          title: mappedBook.title,
          author: mappedBook.authors[0],
          cover: mappedBook.coverUrl,
          publishedYear: getPublishedYear(mappedBook.publishDate)
        });
      } catch {
        if (!isCancelled) {
          setLoadError("Could not load this book activity right now.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      isCancelled = true;
    };
  }, [bookId, locationState?.book]);

  useEffect(() => {
    if (loading || locationState?.focusSection !== "review") {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      reviewTextareaRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
      reviewTextareaRef.current?.focus();
    }, 60);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [loading, locationState?.focusSection]);

  const pageHeading = entry ? "Edit your activity" : "Start tracking this book";
  const activeStatusDetails = useMemo(() => {
    return (
      statusOptions.find((option) => option.value === status) ?? statusOptions[0]
    );
  }, [status]);

  const handleSave = async () => {
    if (!bookId) {
      return;
    }

    setSaving(true);
    setSaveMessage(null);
    setSaveError(null);

    try {
      const normalizedBookId = bookId.replace("/works/", "").trim();
      const resolvedSeed =
        bookSeed ??
        (entry ? getBookSeedFromEntry(entry) : null) ?? {
          externalBookId: normalizedBookId,
          title: "Untitled book"
        };

      const createPayload: CreateLibraryEntryPayload = {
        bookSource: "open_library",
        externalBookId: resolvedSeed.externalBookId,
        title: resolvedSeed.title,
        author: resolvedSeed.author,
        cover: resolvedSeed.cover,
        publishedYear: resolvedSeed.publishedYear,
        status,
        formats,
        customLists,
        rating,
        reviewText,
        notes: reviewText,
        isSpoiler,
        dateStarted: readingSessions[readingSessions.length - 1]?.dateStarted,
        dateFinished: readingSessions[readingSessions.length - 1]?.dateFinished,
        readingSessions
      };

      const updatePayload: UpdateLibraryEntryPayload = {
        status,
        formats,
        customLists,
        rating,
        reviewText,
        notes: reviewText,
        isSpoiler,
        dateStarted: readingSessions[readingSessions.length - 1]?.dateStarted,
        dateFinished: readingSessions[readingSessions.length - 1]?.dateFinished,
        readingSessions
      };

      const saved = await upsertLibraryEntry(entry, createPayload, updatePayload);

      setEntry(saved);
      setBookSeed(getBookSeedFromEntry(saved));
      setReviewText(saved.reviewText ?? saved.notes ?? "");
      setReadingSessions(
        saved.readingSessions?.length
          ? saved.readingSessions
          : getFallbackReadingSessions(saved.dateStarted, saved.dateFinished)
      );
      setSaveMessage("Activity saved to your library.");
    } catch {
      setSaveError("Could not save activity. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFromShelf = async () => {
    if (!entry) {
      navigate(bookId ? `/books/${bookId}` : "/");
      return;
    }

    try {
      setSaving(true);
      setSaveMessage(null);
      setSaveError(null);
      await deleteLibraryEntry(entry.id);
      navigate(bookId ? `/books/${bookId}` : "/");
    } catch {
      setSaveError("Could not remove this book from your shelves right now.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="theme-content-panel-soft theme-text rounded-[1.5rem] px-6 py-4 text-sm">
          Loading your activity editor...
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-[1.75rem] border border-red-400/30 bg-red-950/20 p-6 text-red-100">
          <p className="text-lg font-semibold">Could not open this activity editor.</p>
          <p className="mt-2 text-sm text-red-200/90">{loadError}</p>
          {bookId ? (
            <button
              type="button"
              onClick={() => navigate(`/books/${bookId}`)}
              className="theme-button-ghost mt-5 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
            >
              Back to book
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <Link
              to={bookId ? `/books/${bookId}` : "/"}
              className="theme-text-muted inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--bookora-title)]"
            >
              <span aria-hidden="true">←</span>
              Back to book
            </Link>
            <div className="space-y-2">
              <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.22em]">
                Book activity
              </p>
              <h1 className="theme-title text-3xl font-semibold tracking-tight sm:text-4xl">
                {pageHeading}
              </h1>
              <p className="theme-text-muted max-w-2xl text-sm leading-7">
                Save your shelf, formats, dates, and review in one place. Everything here feeds back into your Bookora reading history.
              </p>
            </div>
          </div>

          <div className="theme-button-accent inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
            {getStatusBadgeCopy(status)}
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <div className="theme-content-panel overflow-hidden rounded-[2rem]">
              {bookSeed?.cover ? (
                <img
                  src={bookSeed.cover}
                  alt={bookSeed.title}
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : (
                <div className="theme-cover-shell theme-text-muted flex aspect-[3/4] w-full items-center justify-center px-8 text-center text-sm font-medium uppercase tracking-[0.2em]">
                  No cover available
                </div>
              )}

              <div className="space-y-4 px-5 py-5">
                <div>
                  <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                    Editing
                  </p>
                  <h2 className="theme-title mt-2 text-xl font-semibold">
                    {bookSeed?.title ?? "This book"}
                  </h2>
                  <p className="theme-text-muted mt-1 text-sm">
                    {bookSeed?.author ?? "Unknown author"}
                    {bookSeed?.publishedYear ? ` · ${bookSeed.publishedYear}` : ""}
                  </p>
                </div>

                <div className="theme-content-panel-soft rounded-[1.25rem] p-4">
                  <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                    Current focus
                  </p>
                  <p className="theme-text mt-2 text-base font-semibold">
                    {activeStatusDetails.label}
                  </p>
                  <p className="theme-text-muted mt-1 text-sm leading-6">
                    {activeStatusDetails.description}
                  </p>
                </div>

                <div className="theme-content-panel-soft rounded-[1.25rem] p-4">
                  <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                    Your rating
                  </p>
                  <div className="mt-3">
                    <BookRatingStars
                      value={rating ?? null}
                      onChange={(value) => setRating(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="theme-content-panel rounded-[2rem] p-5 sm:p-6">
              <div className="space-y-2">
                <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                  Reading status
                </p>
                <h2 className="theme-title text-xl font-semibold">
                  Choose the shelf that fits best
                </h2>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {statusOptions.map((option) => {
                  const isSelected = status === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setStatus(option.value)}
                      className={`rounded-[1.5rem] border px-5 py-4 text-left transition-all ${
                        isSelected
                          ? "theme-button-accent shadow-[0_18px_40px_rgba(251,191,36,0.08)]"
                          : "theme-content-panel-soft hover:border-[color:var(--bookora-border-strong)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="theme-title text-base font-semibold">
                            {option.label}
                          </p>
                          <p className="theme-text-muted mt-1 text-sm leading-6">
                            {option.description}
                          </p>
                        </div>
                        <span className="theme-accent-text pt-1 text-lg">
                          {isSelected ? "✓" : ""}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="theme-content-panel rounded-[2rem] p-5 sm:p-6">
              <OwnershipFormatSelector value={formats} onChange={setFormats} />
            </section>

            <section className="theme-content-panel rounded-[2rem] p-5 sm:p-6">
              <CustomListsSelector value={customLists} onChange={setCustomLists} />
            </section>

            <section className="theme-content-panel rounded-[2rem] p-5 sm:p-6">
              <ReadingDatesForm
                readingSessions={readingSessions}
                onChange={setReadingSessions}
              />
            </section>

            <section className="theme-content-panel rounded-[2rem] p-5 sm:p-6">
              <div className="space-y-2">
                <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
                  Review
                </p>
                <h2 className="theme-title text-xl font-semibold">
                  Add your thoughts
                </h2>
                <p className="theme-text-muted text-sm leading-7">
                  Write a quick reaction or a full review. If you already reviewed this book, it is loaded here for editing.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <textarea
                  ref={reviewTextareaRef}
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  rows={8}
                  placeholder="What stood out to you about this book?"
                  className="theme-input min-h-48 w-full rounded-[1.5rem] px-4 py-3 text-sm leading-7"
                />

                <label className="theme-text-soft inline-flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={isSpoiler}
                    onChange={(event) => setIsSpoiler(event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950/40 text-amber-300 focus:ring-amber-200/30"
                  />
                  Mark this review as containing spoilers
                </label>
              </div>
            </section>

            {(saveMessage || saveError) ? (
              <div
                className={`rounded-[1.5rem] border px-5 py-4 text-sm ${
                  saveError
                    ? "border-red-400/30 bg-red-950/20 text-red-100"
                    : "border-emerald-400/30 bg-emerald-950/20 text-emerald-100"
                }`}
              >
                {saveError ?? saveMessage}
              </div>
            ) : null}

            <div className="theme-content-panel-soft flex flex-wrap items-center justify-between gap-3 rounded-[2rem] p-4 sm:p-5">
              <p className="theme-text-muted text-sm">
                Changes update your shelf history and your review snapshot for this book.
              </p>

              <div className="flex flex-wrap gap-3">
                {entry ? (
                  <button
                    type="button"
                    onClick={handleRemoveFromShelf}
                    disabled={saving}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-red-400/20 bg-red-950/20 px-5 text-sm font-medium text-red-100 transition-colors hover:bg-red-950/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Remove from shelf
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => navigate(bookId ? `/books/${bookId}` : "/")}
                  className="theme-button-ghost inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="theme-button-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : entry ? "Save changes" : "Save activity"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookActivityPage;
