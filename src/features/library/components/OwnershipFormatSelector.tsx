

import type { BookFormat } from "../types/library.types";

interface OwnershipFormatSelectorProps {
  value: BookFormat[];
  onChange: (formats: BookFormat[]) => void;
}

const OPTIONS: { label: string; value: BookFormat }[] = [
  { label: "Physical", value: "physical" },
  { label: "Ebook", value: "ebook" },
  { label: "Audiobook", value: "audiobook" }
];

export const OwnershipFormatSelector = ({
  value,
  onChange
}: OwnershipFormatSelectorProps) => {
  const toggleFormat = (format: BookFormat) => {
    if (value.includes(format)) {
      onChange(value.filter((f) => f !== format));
      return;
    }

    onChange([...value, format]);
  };

  return (
    <div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Formats
        </p>
        <h2 className="text-xl font-semibold text-white">
          How are you reading this one?
        </h2>
        <p className="text-sm leading-7 text-slate-400">
          Pick every format that applies so your activity feels accurate.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {OPTIONS.map((option) => {
          const isActive = value.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleFormat(option.value)}
              className={`inline-flex h-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all
                ${
                  isActive
                    ? "border-amber-200/30 bg-amber-200/12 text-amber-100"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OwnershipFormatSelector;
