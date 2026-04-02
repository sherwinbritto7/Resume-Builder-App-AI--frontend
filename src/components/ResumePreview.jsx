import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate.jsx";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full h-full flex justify-center bg-slate-50/50 rounded-2xl p-0 overflow-hidden">
      <div
        id="resume-preview"
        className={
          "w-[210mm] max-w-full aspect-210/297 bg-white shadow-none md:shadow-[0_0_50px_rgba(0,0,0,0.06)] border border-slate-100 print:shadow-none print:border-none ring-1 ring-slate-200/50 transition-all duration-300 " +
          classes
        }
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
