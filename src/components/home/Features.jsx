import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";

const Features = () => {
  // Data for all feature cards
  const features = [
    {
      title: "AI-Powered Resume Creation",
      description:
        "Generate a professional resume instantly using AI suggestions tailored to your experience and career goals.",
      color: "violet",
      border: "border-violet-200",
      hoverBorder: "hover:border-violet-400",
      bg: "bg-violet-100",
      hoverBg: "hover:bg-violet-50/40",
      shadow: "hover:shadow-violet-200/40",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5"
            stroke="#7F22FE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Customizable Templates",
      description:
        "Choose from modern, ATS-friendly templates and personalize fonts, colors, and layouts in minutes.",
      color: "green",
      border: "border-green-200",
      hoverBorder: "hover:border-green-400",
      bg: "bg-green-100",
      hoverBg: "hover:bg-green-50/40",
      shadow: "hover:shadow-green-200/40",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7"
            stroke="#00A63E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Job-Specific Optimization",
      description:
        "AI analyzes job descriptions and helps you highlight the most relevant skills and achievements.",
      color: "orange",
      border: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
      bg: "bg-orange-100",
      hoverBg: "hover:bg-orange-50/40",
      shadow: "hover:shadow-orange-200/40",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667"
            stroke="#F54900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5"
            stroke="#F54900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Export & Download Anywhere",
      description:
        "Download your resume as PDF, DOCX, or shareable link for easy applications.",
      color: "blue",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      bg: "bg-blue-100",
      hoverBg: "hover:bg-blue-50/40",
      shadow: "hover:shadow-blue-200/40",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14 2v18m-6-6l6 6 6-6"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Grammar & Spell Check",
      description:
        "Built-in AI proofreading ensures your resume is error-free and professionally written.",
      color: "pink",
      border: "border-pink-200",
      hoverBorder: "hover:border-pink-400",
      bg: "bg-pink-100",
      hoverBg: "hover:bg-pink-50/40",
      shadow: "hover:shadow-pink-200/40",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 20h18M5 8h18M5 14h18"
            stroke="#EC4899"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      id="features"
      className="flex flex-col items-center mb-10 scroll-mt-12"
    >
      {/* Top badge */}
      <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-6 py-1.5 mb-4">
        <Zap width={14} />
        <span>Simple & Smart</span>
      </div>

      {/* Section title */}
      <Title
        title="Build Your Resume Instantly"
        description="Create a professional resume in minutes with our AI-powered resume builder."
      />

      {/* Feature cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-16 px-4 md:px-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`
              group flex flex-col text-center items-center justify-center rounded-xl p-6 max-w-sm
              ${feature.border} gap-6
              transition-all duration-300 ease-out
              hover:-translate-y-2 hover:shadow-xl ${feature.shadow}
              ${feature.hoverBorder} ${feature.hoverBg}
            `}
          >
            <div
              className={`
                p-6 aspect-square ${feature.bg} rounded-full
                transition-transform duration-300 group-hover:scale-110
                group-hover:shadow-[0_0_0_8px_rgba(0,0,0,0.05)]
              `}
            >
              {feature.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-800">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
