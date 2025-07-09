import ProductCard from "./components/ProductCard";
import CompareBar from "./components/CompareBar";
import ComparisonView from "./components/ComparisonView";
import { products } from "./data/products";
import { useEffect, useState } from "react";

const App = () => {
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(true); // default to dark

  // 🔄 Toggle dark/light theme
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // 📦 Load compare list on mount
  useEffect(() => {
    const saved = localStorage.getItem("compareList");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompareList(parsed);
        if (parsed.length >= 2) setShowCompare(true);
      } catch {
        localStorage.removeItem("compareList");
      }
    }
  }, []);

  // 💾 Save compare list to localStorage
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  // 🌗 Load saved theme preference or fallback to system
  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");

    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setDarkMode(true);
    } else {
      root.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleProduct = (product) => {
    const exists = compareList.some((p) => p.id === product.id);
    if (exists) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, product]);
    }
    setShowCompare(false);
  };

  const clearAll = () => {
    setCompareList([]);
    setShowCompare(false);
  };

  const removeOne = (id) => {
    setCompareList(compareList.filter((p) => p.id !== id));
    setShowCompare(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* 🌗 Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded shadow bg-gray-100 dark:bg-gray-800 text-sm dark:text-white hover:opacity-90 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* 🧱 Main Layout */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
          Product Comparison Tool
        </h1>

        {/* 🔍 Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search products..."
            className="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

        {/* 📦 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products
            .filter(
              (p) =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.brand.toLowerCase().includes(searchTerm)
            )
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCompareClick={toggleProduct}
                isSelected={compareList.find((p) => p.id === product.id)}
              />
            ))}
        </div>

        {/* 🧮 Compare Bar */}
        {compareList.length >= 2 && (
          <CompareBar
            selected={compareList}
            onClearAll={clearAll}
            onRemove={removeOne}
            onCompare={() => setShowCompare(true)}
          />
        )}

        {/* 📊 Comparison Table */}
        {showCompare && <ComparisonView selected={compareList} />}
      </div>
    </div>
  );
};

export default App;
