import type { ReaderSummary } from "../types/social.types";

interface ReaderChallengePanelProps {
    summary: ReaderSummary;
}

const getChallengeTarget = (finishedCount: number) => {
    if (finishedCount >= 40) {
        return 50;
    }

    if (finishedCount >= 25) {
        return 40;
    }

    return 20;
};

const ReaderChallengePanel = ({ summary }: ReaderChallengePanelProps) => {
    const target = getChallengeTarget(summary.finishedCount);
    const progress = Math.min(100, Math.round((summary.finishedCount / target) * 100));

    return (
        <section className="theme-content-panel overflow-hidden rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                <div>
                    <p className="theme-eyebrow">Reading challenge</p>
                    <h2 className="theme-title mt-3 text-xl font-semibold sm:text-2xl">
                        Public reading momentum
                    </h2>
                    <p className="theme-text-muted mt-3 max-w-2xl text-sm leading-7">
                        A quick sense of how far this reader has gone through finished books,
                        active reads, and public reviews shared so far.
                    </p>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="theme-text font-medium">
                                {summary.finishedCount} finished
                            </span>
                            <span className="theme-text-muted">
                                {target} book pace marker
                            </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/8">
                            <div
                                className="h-full rounded-full bg-[linear-gradient(135deg,#f3dfb4_0%,#91d9d3_48%,#8bb4ff_100%)]"
                                style={{ width: `${Math.max(progress, summary.finishedCount > 0 ? 10 : 0)}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    <article className="theme-content-panel-soft rounded-[1.2rem] p-4">
                        <p className="theme-text-muted text-xs uppercase tracking-[0.18em]">
                            Finished
                        </p>
                        <p className="theme-title mt-3 text-2xl font-semibold">
                            {summary.finishedCount}
                        </p>
                        <p className="theme-text-soft mt-1 text-sm">
                            books and audiobooks completed
                        </p>
                    </article>

                    <article className="theme-content-panel-soft rounded-[1.2rem] p-4">
                        <p className="theme-text-muted text-xs uppercase tracking-[0.18em]">
                            In progress
                        </p>
                        <p className="theme-title mt-3 text-2xl font-semibold">
                            {summary.inProgressCount}
                        </p>
                        <p className="theme-text-soft mt-1 text-sm">
                            active reads and listens right now
                        </p>
                    </article>

                    <article className="theme-content-panel-soft rounded-[1.2rem] p-4">
                        <p className="theme-text-muted text-xs uppercase tracking-[0.18em]">
                            Public reviews
                        </p>
                        <p className="theme-title mt-3 text-2xl font-semibold">
                            {summary.reviewsCount}
                        </p>
                        <p className="theme-text-soft mt-1 text-sm">
                            visible reviews shared publicly
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export type { ReaderChallengePanelProps };
export default ReaderChallengePanel;
