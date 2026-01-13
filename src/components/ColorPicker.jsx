import { Check, Palette } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const colors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Orange", value: "#f97316" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Yellow", value: "#eab308" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#1f2937" },
    { name: "Indigo", value: "#6366f1" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-1 ring-purple-300 hover:ring-purple-400 transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-10 grid grid-cols-4 w-60 gap-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/30 transition-colors flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <Check className="size-5 text-white drop-shadow" />
                )}
              </div>

              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
