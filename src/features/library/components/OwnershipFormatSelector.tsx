

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
      <label className="mb-2 block text-sm font-medium">
        How do you own this book?
      </label>

      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((option) => {
          const isActive = value.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleFormat(option.value)}
              className={`rounded-lg border px-4 py-2 text-sm transition
                ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-neutral-600 hover:border-white"
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