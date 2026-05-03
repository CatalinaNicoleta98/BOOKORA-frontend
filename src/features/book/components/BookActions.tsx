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
            className="fixed inset-0 z-[200] flex items-start justify-center p-4 sm:items-center sm:p-6"
            onClick={() => setIsManageOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Manage this book"
        >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
            <div
                className="relative z-10 flex w-full max-w-xl justify-center py-2 sm:py-0"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex max-h-[calc(100vh-3rem)] w-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(5,8,18,0.98))] text-white shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                Manage this book
                            </p>
                            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                                Choose a shelf, format, and lists
                            </h3>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsManageOpen(false)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="Close manage book panel"
                        >
                            ×
                        </button>
                    </div>

                    <div className="bookora-modal-scroll overflow-y-auto px-6 py-6">
                        <div className="space-y-6">
                            <section>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
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
                                                        ? "border-amber-200/30 bg-amber-200/10 text-white"
                                                        : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                                                }`}
                                            >
                                                <span>
                                                    <span className="block text-base font-semibold">{option.label}</span>
                                                    <span className="block text-sm text-slate-400">{option.description}</span>
                                                </span>
                                                <span className="text-lg text-amber-200">{isSelected ? "✓" : ""}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <section>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
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
                                                        ? "border-amber-200/30 bg-amber-200/12 text-amber-100"
                                                        : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
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
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                                        Custom lists
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm font-semibold text-amber-200 transition-colors hover:text-amber-100"
                                    >
                                        + Create new list
                                    </button>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {defaultLists.map((listName) => (
                                        <button
                                            key={listName}
                                            type="button"
                                            className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 transition-all hover:bg-white/10"
                                        >
                                            {listName}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                                <button
                                    type="button"
                                    onClick={handleRemoveFromShelf}
                                    className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                                >
                                    Remove from shelf
                                </button>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsManageOpen(false)}
                                        className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveChanges}
                                        disabled={isSaving}
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#20150f] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2d1d15] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSaving ? "Saving..." : "Save changes"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <div className="mt-2 flex overflow-hidden rounded-full border border-amber-200/20 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(251,191,36,0.08))] shadow-[0_14px_30px_rgba(15,23,42,0.18)]">
                <button
                    type="button"
                    onClick={() => void handlePrimaryAction()}
                    disabled={isSaving}
                    className={`inline-flex h-12 flex-1 items-center justify-center gap-2 px-5 text-sm font-semibold transition-all duration-300 ${
                        isShelved
                            ? "cursor-default text-amber-50"
                            : "text-amber-100 hover:bg-[linear-gradient(180deg,rgba(251,191,36,0.2),rgba(251,191,36,0.1))]"
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
                        className="inline-flex h-12 w-12 items-center justify-center border-l border-amber-200/20 text-amber-100 transition-all duration-300 hover:bg-[linear-gradient(180deg,rgba(251,191,36,0.2),rgba(251,191,36,0.1))] disabled:cursor-not-allowed disabled:opacity-70"
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
