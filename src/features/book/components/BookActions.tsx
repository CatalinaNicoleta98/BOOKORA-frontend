import { useEffect, useState } from "react";

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
        return "currently_reading";
    }

    if (status in statusButtonLabelMap) {
        return status as ReadingStatus;
    }

    return "currently_reading";
};

const BookActions = ({ currentStatus, onAddToLibrary, onWantToRead }: BookActionsProps) => {
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<ReadingStatus>(getInitialStatus(currentStatus));
    const [selectedFormats, setSelectedFormats] = useState<OwnershipFormat[]>(["physical"]);

    const activeStatusLabel = statusButtonLabelMap[selectedStatus];

    useEffect(() => {
        setSelectedStatus(getInitialStatus(currentStatus));
    }, [currentStatus]);

    const toggleFormat = (format: OwnershipFormat) => {
        setSelectedFormats((currentFormats) => {
            if (currentFormats.includes(format)) {
                return currentFormats.filter((currentFormat) => currentFormat !== format);
            }

            return [...currentFormats, format];
        });
    };

    const handleSelectStatus = (status: ReadingStatus) => {
        setSelectedStatus(status);

        if (status === "want_to_read") {
            onWantToRead();
            return;
        }

        onAddToLibrary();
    };

    return (
        <>
            <div className="mt-2">
                <button
                    type="button"
                    onClick={() => setIsManageOpen(true)}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border border-amber-200/20 bg-[linear-gradient(180deg,rgba(251,191,36,0.16),rgba(251,191,36,0.08))] px-5 text-sm font-semibold text-amber-100 shadow-[0_14px_30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-amber-200/30 hover:bg-[linear-gradient(180deg,rgba(251,191,36,0.2),rgba(251,191,36,0.1))] hover:shadow-[0_18px_40px_rgba(15,23,42,0.24)]"
                >
                    {activeStatusLabel}
                </button>
            </div>

            {isManageOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/78 px-6 backdrop-blur-md">
                    <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(5,8,18,0.98))] p-6 text-white shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl">
                        <div className="flex items-start justify-between gap-4">
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

                        <div className="mt-6 space-y-6">
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
                                                onClick={() => handleSelectStatus(option.value)}
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
                                    className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                                    onClick={() => console.log("Remove from shelf")}
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
                                        onClick={() => {
                                            setIsManageOpen(false);
                                            onAddToLibrary();
                                        }}
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#20150f] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2d1d15]"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default BookActions;
