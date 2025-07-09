import React from "react";

const CompareBar = ({ selected, onClearAll, onRemove, onCompare }) => {
  if (selected.length < 2) return null;

  return (
    <div className="mt-10 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          🧮 Comparing:
        </span>

        {/* Selected products */}
        <div className="flex flex-wrap gap-2">
          {selected.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm text-sm text-gray-800 dark:text-gray-100"
            >
              <span>{p.name}</span>
              <button
                onClick={() => onRemove(p.id)}
                className="text-red-500 hover:text-red-600 transition"
                aria-label={`Remove ${p.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Compare button */}
        <button
          onClick={onCompare}
          className="ml-auto px-4 py-2 rounded-md text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow"
        >
          🔍 Compare
        </button>

        {/* Clear all button */}
        <button
          onClick={onClearAll}
          className="text-red-600 hover:text-red-700 text-sm underline ml-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CompareBar;
