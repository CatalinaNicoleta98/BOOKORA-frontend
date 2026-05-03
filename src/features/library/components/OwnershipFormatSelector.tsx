

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
        <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
          Formats
        </p>
        <h2 className="theme-title text-xl font-semibold">
          How are you reading this one?
        </h2>
        <p className="theme-text-muted text-sm leading-7">
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
                    ? "theme-button-accent"
                    : "theme-button-ghost"
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
