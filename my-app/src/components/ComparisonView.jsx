import React from "react";

const ComparisonView = ({ selected }) => {
  const attributes = ["brand", "price", "features"];

  const getDiffHighlight = (key) => {
    const values = selected.map((p) => JSON.stringify(p[key]));
    return new Set(values).size > 1;
  };

  return (
    <div className="mt-10 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Product Comparison</h2>
      <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600 shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Attribute
            </th>
            {selected.map((p) => (
              <th
                key={p.id}
                className="text-left px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {attributes.map((attr) => (
            <tr key={attr}>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 capitalize">
                {attr}
              </td>
              {selected.map((p) => {
                const value = Array.isArray(p[attr])
                  ? p[attr].join(", ")
                  : p[attr];
                const isDifferent = getDiffHighlight(attr);
                return (
                  <td
                    key={p.id}
                    className={`px-4 py-3 text-sm ${
                      isDifferent
                        ? "bg-yellow-50 dark:bg-yellow-900"
                        : "bg-white dark:bg-gray-800"
                    } text-gray-700 dark:text-gray-200`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonView;
