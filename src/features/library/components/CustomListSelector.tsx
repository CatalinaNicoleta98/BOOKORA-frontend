

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
      <label className="mb-2 block text-sm font-medium">
        Add to lists
      </label>

      {/* Existing lists */}
      <div className="mb-3 flex flex-wrap gap-2">
        {value.map((list) => (
          <div
            key={list}
            className="flex items-center gap-2 rounded-lg border border-neutral-600 px-3 py-1 text-sm"
          >
            <span>{list}</span>
            <button
              type="button"
              onClick={() => handleRemove(list)}
              className="text-neutral-400 hover:text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add new list */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Create new list..."
          className="flex-1 rounded-lg border bg-transparent px-3 py-2 text-sm"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg border px-4 py-2 text-sm hover:border-white"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CustomListsSelector;