import React from "react";

const ProductCard = ({ product, onCompareClick, isSelected }) => {
  return (
    <div
      className={`rounded-lg shadow-md border transition duration-300 bg-white dark:bg-gray-800 ${
        isSelected ? "border-green-500 ring-2 ring-green-300" : "border-gray-200 dark:border-gray-600"
      } hover:shadow-lg hover:-translate-y-1`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{product.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">{product.price}</p>

        <ul className="text-sm list-disc ml-5 mb-4 text-gray-700 dark:text-gray-300">
          {product.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <button
          tabIndex="0"
          onClick={() => onCompareClick(product)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onCompareClick(product);
            }
          }}
          className={`w-full py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isSelected
              ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-800 dark:text-white"
              : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500"
          }`}
        >
          {isSelected ? "Remove" : "Add to Compare"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
