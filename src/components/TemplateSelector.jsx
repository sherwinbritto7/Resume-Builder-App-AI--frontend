import { Check, Layout } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean and traditional resume layout with a focus on readability.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "A modern and sleek resume layout with a focus on design.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "A minimal and clean resume layout with a focus on simplicity.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "A minimal with a single image and clean resume layout with a focus on simplicity.",
    },
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
        className="flex items-center gap-1 text-sm text-green-600 bg-linear-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden tracking-tight font-medium">Template</span>
      </button>

      {isOpen && (
        <div className="absolute top-full w-72 p-3 mt-2 space-y-3 z-10 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/50">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-xl cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-green-400 bg-green-50"
                  : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">{template.name}</h4>
                <div className="mt-2 p-2 bg-slate-50/50 rounded-lg text-[10px] text-slate-500 italic leading-relaxed">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
