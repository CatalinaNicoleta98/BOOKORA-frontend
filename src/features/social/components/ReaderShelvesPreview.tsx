import type { ReaderShelfSummary } from "../types/social.types";

interface ReaderShelvesPreviewProps {
    shelves: ReaderShelfSummary;
}

const SHELF_ITEMS: Array<{
    key: keyof ReaderShelfSummary;
    label: string;
    description: string;
}> = [
    {
        key: "want_to_read",
        label: "Want to Read",
        description: "Books waiting for the right reading mood."
    },
    {
        key: "currently_reading",
        label: "Currently Reading",
        description: "Active books that are part of the current stack."
    },
    {
        key: "currently_listening",
        label: "Currently Listening",
        description: "Audiobooks that are in the current rotation."
    },
    {
        key: "finished_reading",
        label: "Finished Reading",
        description: "Completed print and ebook reads."
    },
    {
        key: "finished_listening",
        label: "Finished Listening",
        description: "Completed audiobook listens."
    },
    {
        key: "on_break",
        label: "On Break",
        description: "Books paused without being fully abandoned."
    },
    {
        key: "did_not_finish",
        label: "Did Not Finish",
        description: "Titles this reader chose to step away from."
    }
];

const ReaderShelvesPreview = ({ shelves }: ReaderShelvesPreviewProps) => {
    return (
        <section className="theme-glass-panel rounded-[2rem] p-6 sm:p-8">
            <div>
                <p className="theme-eyebrow">Shelf snapshot</p>
                <h2 className="theme-title mt-2 text-2xl font-semibold">How this reader organizes their library</h2>
                <p className="theme-text-muted mt-3 max-w-2xl text-sm leading-7">
                    A quick count across the main reading states already supported in Bookora.
                </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {SHELF_ITEMS.map((item) => (
                    <article key={item.key} className="theme-content-panel-soft rounded-[1.6rem] p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="theme-title text-lg font-semibold">{item.label}</h3>
                                <p className="theme-text-muted mt-2 text-sm leading-7">{item.description}</p>
                            </div>
                            <span className="theme-pill-subtle shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                                {shelves[item.key]}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export type { ReaderShelvesPreviewProps };
export default ReaderShelvesPreview;
