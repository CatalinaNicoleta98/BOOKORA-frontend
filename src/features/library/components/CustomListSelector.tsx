

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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Custom lists
        </p>
        <h2 className="text-xl font-semibold text-white">
          Keep it organized your way
        </h2>
        <p className="text-sm leading-7 text-slate-400">
          Add this book to any personal lists you want to keep close.
        </p>
      </div>

      <div className="mt-5 mb-4 flex flex-wrap gap-3">
        {value.map((list) => (
          <div
            key={list}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
          >
            <span>{list}</span>
            <button
              type="button"
              onClick={() => handleRemove(list)}
              className="text-slate-400 transition-colors hover:text-white"
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
          className="flex-1 rounded-full border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-amber-200/30"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex h-12 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10 px-5 text-sm font-semibold text-amber-100 transition-all hover:border-amber-200/30 hover:bg-amber-200/14"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CustomListsSelector;
