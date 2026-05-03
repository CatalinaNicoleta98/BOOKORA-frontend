


interface ReadingDatesFormProps {
  dateStarted?: string;
  dateFinished?: string;
  onDateStartedChange: (value?: string) => void;
  onDateFinishedChange: (value?: string) => void;
}

const toDateInputValue = (value?: string) => {
  if (!value) return "";
  return value.slice(0, 10);
};

const toOptionalDate = (value: string) => {
  return value ? value : undefined;
};

export const ReadingDatesForm = ({
  dateStarted,
  dateFinished,
  onDateStartedChange,
  onDateFinishedChange
}: ReadingDatesFormProps) => {
  return (
    <div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Reading dates
        </p>
        <h2 className="text-xl font-semibold text-white">
          Mark the timeline
        </h2>
        <p className="text-sm leading-7 text-slate-400">
          Add start and finish dates to keep your reading history complete.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Date started
          </label>
          <input
            type="date"
            value={toDateInputValue(dateStarted)}
            onChange={(event) =>
              onDateStartedChange(toOptionalDate(event.target.value))
            }
            className="w-full rounded-[1.1rem] border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-200/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Date finished
          </label>
          <input
            type="date"
            value={toDateInputValue(dateFinished)}
            onChange={(event) =>
              onDateFinishedChange(toOptionalDate(event.target.value))
            }
            className="w-full rounded-[1.1rem] border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-200/30"
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingDatesForm;
