import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { BookActionsProps } from "../types/book.types";

type ReadingStatus =
    | "want_to_read"
    | "currently_reading"
    | "currently_listening"
    | "finished_reading"
    | "finished_listening"
    | "on_break"
    | "did_not_finish";
type OwnershipFormat = "physical" | "ebook" | "audiobook";

const statusOptions: Array<{ value: ReadingStatus; label: string; description: string }> = [
    {
        value: "want_to_read",
        label: "Want to Read",
        description: "Save it for later",
    },
    {
        value: "currently_reading",
        label: "Currently Reading",
        description: "Reading a physical or digital copy",
    },
    {
        value: "currently_listening",
        label: "Currently Listening",
        description: "Listening to the audiobook",
    },
    {
        value: "finished_reading",
        label: "Read",
        description: "Completed the book",
    },
    {
        value: "on_break",
        label: "On Break",
        description: "Paused for now",
    },
    {
        value: "did_not_finish",
        label: "Did Not Finish",
        description: "Stopped before the end",
    },
];

const formatOptions: Array<{ value: OwnershipFormat; label: string }> = [
    { value: "physical", label: "Physical" },
    { value: "ebook", label: "Ebook" },
    { value: "audiobook", label: "Audiobook" },
];

const defaultLists = ["Favorites", "Romantasy", "Top 2026"];

const statusButtonLabelMap: Record<ReadingStatus, string> = {
    want_to_read: "Want to Read",
    currently_reading: "Currently Reading",
    currently_listening: "Currently Listening",
    finished_reading: "Read",
    finished_listening: "Finished Listening",
    on_break: "On Break",
    did_not_finish: "Did Not Finish",
};

const getInitialStatus = (status?: string): ReadingStatus => {
    if (!status) {
        return "want_to_read";
    }

    if (status in statusButtonLabelMap) {
        return status as ReadingStatus;
    }

    return "want_to_read";
};

const BookActions = ({
    currentStatus,
    onAddToLibrary,
    onWantToRead,
    onRemoveFromLibrary,
    isSaving = false,
}: BookActionsProps) => {
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<ReadingStatus>(getInitialStatus(currentStatus));
    const [selectedFormats, setSelectedFormats] = useState<OwnershipFormat[]>(["physical"]);

    const isShelved = Boolean(currentStatus);
    const activeStatus = currentStatus ? getInitialStatus(currentStatus) : undefined;
    const activeStatusLabel = activeStatus ? statusButtonLabelMap[activeStatus] : "Want to Read";
    const portalRoot = useMemo(() => {
        if (typeof document === "undefined") {
            return null;
        }

        return document.body;
    }, []);

    useEffect(() => {
        setSelectedStatus(getInitialStatus(currentStatus));
    }, [currentStatus]);

    useEffect(() => {
        if (!isManageOpen) {
            return undefined;
        }

        const { overflow } = document.body.style;
        const { overflow: htmlOverflow } = document.documentElement.style;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsManageOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = overflow;
            document.documentElement.style.overflow = htmlOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isManageOpen]);

    const toggleFormat = (format: OwnershipFormat) => {
        setSelectedFormats((currentFormats) => {
            if (currentFormats.includes(format)) {
                return currentFormats.filter((currentFormat) => currentFormat !== format);
            }

            return [...currentFormats, format];
        });
    };

    const handlePrimaryAction = async () => {
        if (isShelved || isSaving) {
            return;
        }

        setSelectedStatus("want_to_read");
        await onWantToRead();
    };

    const handleSaveChanges = async () => {
        if (isSaving) {
            return;
        }

        await onAddToLibrary(selectedStatus);
        setIsManageOpen(false);
    };

    const handleRemoveFromShelf = async () => {
        if (isSaving) {
            return;
        }

        await onRemoveFromLibrary();
        setIsManageOpen(false);
    };

    const manageModal = isManageOpen ? (
        <div
            className="fixed inset-0 z-[200] overflow-y-auto"
            onClick={() => setIsManageOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Manage this book"
        >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
            <div
                className="relative z-10 flex min-h-full w-full items-end justify-center p-3 sm:items-center sm:p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="theme-glass-panel-strong flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-[2rem] text-white sm:max-h-[min(calc(100dvh-3rem),48rem)]">
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6">
                        <div>
                            <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.22em]">
                                Manage this book
                            </p>
                            <h3 className="theme-title mt-2 text-3xl font-semibold tracking-tight">
                                Choose a shelf, format, and lists
                            </h3>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsManageOpen(false)}
                            className="theme-button-ghost inline-flex h-10 w-10 items-center justify-center rounded-full text-lg"
                            aria-label="Close manage book panel"
                        >
                            ×
                        </button>
                    </div>

                    <div className="bookora-modal-scroll min-h-0 flex-1 overflow-y-auto px-6 py-6">
                        <div className="space-y-6">
                            <section>
                                <p className="theme-text-muted text-sm font-semibold uppercase tracking-[0.18em]">
                                    Reading status
                                </p>
                                <div className="mt-4 space-y-3">
                                    {statusOptions.map((option) => {
                                        const isSelected = selectedStatus === option.value;

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setSelectedStatus(option.value)}
                                                className={`flex w-full items-center justify-between rounded-full border px-5 py-3 text-left transition-all ${
                                                    isSelected
                                                        ? "theme-button-accent text-[var(--bookora-title)]"
                                                        : "theme-button-ghost text-[var(--bookora-text)]"
                                                }`}
                                            >
                                                <span>
                                                    <span className="block text-base font-semibold">{option.label}</span>
                                                    <span className="theme-text-muted block text-sm">{option.description}</span>
                                                </span>
                                                <span className="theme-accent-text text-lg">{isSelected ? "✓" : ""}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <section>
                                <p className="theme-text-muted text-sm font-semibold uppercase tracking-[0.18em]">
                                    Formats you own or use
                                </p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {formatOptions.map((option) => {
                                        const isSelected = selectedFormats.includes(option.value);

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => toggleFormat(option.value)}
                                                className={`inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all ${
                                                    isSelected
                                                        ? "theme-button-accent"
                                                        : "theme-button-ghost"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="theme-text-muted text-sm font-semibold uppercase tracking-[0.18em]">
                                        Custom lists
                                    </p>
                                    <button
                                        type="button"
                                        className="theme-accent-text text-sm font-semibold transition-colors hover:text-[var(--bookora-title)]"
                                    >
                                        + Create new list
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {defaultLists.map((listName) => (
                                        <button
                                            key={listName}
                                            type="button"
                                            className="theme-button-ghost inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium"
                                        >
                                            {listName}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="border-t border-white/10 bg-[color:color-mix(in_srgb,var(--bookora-bg-strong)_92%,transparent)] px-6 py-4 [padding-bottom:calc(1rem+env(safe-area-inset-bottom))]">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={handleRemoveFromShelf}
                                className="theme-text-muted text-left text-sm font-semibold transition-colors hover:text-[var(--bookora-title)]"
                            >
                                Remove from shelf
                            </button>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => setIsManageOpen(false)}
                                    className="theme-button-ghost inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveChanges}
                                    disabled={isSaving}
                                    className="theme-button-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <div className="theme-button-accent mt-2 flex overflow-hidden rounded-full shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
                <button
                    type="button"
                    onClick={() => void handlePrimaryAction()}
                    disabled={isSaving}
                    className={`inline-flex h-12 flex-1 items-center justify-center gap-2 px-5 text-sm font-semibold transition-all duration-300 ${
                        isShelved
                            ? "cursor-default text-[var(--bookora-title)]"
                            : "text-[var(--bookora-accent-strong)] hover:bg-white/10"
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                >
                    {isShelved ? <span aria-hidden="true">✓</span> : <span aria-hidden="true">＋</span>}
                    <span>{isSaving ? "Saving..." : activeStatusLabel}</span>
                </button>

                {isShelved ? (
                    <button
                        type="button"
                        onClick={() => setIsManageOpen(true)}
                        disabled={isSaving}
                        className="inline-flex h-12 w-12 items-center justify-center border-l border-[color:var(--bookora-border)] text-[var(--bookora-accent-strong)] transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                        aria-label="Open reading status menu"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 7l5 6 5-6" />
                        </svg>
                    </button>
                ) : null}
            </div>

            {portalRoot ? createPortal(manageModal, portalRoot) : manageModal}
        </>
    );
};

export default BookActions;
