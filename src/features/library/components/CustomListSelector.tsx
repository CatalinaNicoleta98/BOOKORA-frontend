

import { useState } from "react";

interface CustomListsSelectorProps {
  value: string[];
  onChange: (lists: string[]) => void;
}

export const CustomListsSelector = ({
  value,
  onChange
}: CustomListsSelectorProps) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();

    if (!trimmed || value.includes(trimmed)) {
      setInput("");
      return;
    }

    onChange([...value, trimmed]);
    setInput("");
  };

  const handleRemove = (list: string) => {
    onChange(value.filter((l) => l !== list));
  };

  return (
    <div>
      <div className="space-y-2">
        <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.18em]">
          Custom lists
        </p>
        <h2 className="theme-title text-xl font-semibold">
          Keep it organized your way
        </h2>
        <p className="theme-text-muted text-sm leading-7">
          Add this book to any personal lists you want to keep close.
        </p>
      </div>

      <div className="mt-5 mb-4 flex flex-wrap gap-3">
        {value.map((list) => (
          <div
            key={list}
            className="theme-button-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          >
            <span>{list}</span>
            <button
              type="button"
              onClick={() => handleRemove(list)}
              className="theme-text-muted transition-colors hover:text-[var(--bookora-title)]"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Create new list..."
          className="theme-input flex-1 rounded-full px-4 py-3 text-sm"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="theme-button-accent inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CustomListsSelector;
