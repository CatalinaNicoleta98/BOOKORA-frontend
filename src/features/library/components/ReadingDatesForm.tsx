


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
      <label className="mb-2 block text-sm font-medium">Reading dates</label>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-neutral-400">
            Date started
          </label>
          <input
            type="date"
            value={toDateInputValue(dateStarted)}
            onChange={(event) =>
              onDateStartedChange(toOptionalDate(event.target.value))
            }
            className="w-full rounded-lg border border-neutral-700 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-white"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-neutral-400">
            Date finished
          </label>
          <input
            type="date"
            value={toDateInputValue(dateFinished)}
            onChange={(event) =>
              onDateFinishedChange(toOptionalDate(event.target.value))
            }
            className="w-full rounded-lg border border-neutral-700 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingDatesForm;