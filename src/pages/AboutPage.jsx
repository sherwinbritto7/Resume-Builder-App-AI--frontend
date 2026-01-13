import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/home/Title";

const AboutPage = () => {
  const navigate = useNavigate();

  // Always start page from top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow
                   transition sticky top-4 z-50 md:static"
      >
        ← Go Back
      </button>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <Title
          title="About ZenResume"
          description="An AI-powered resume builder designed to help you stand out and get hired faster."
        />
      </div>

      {/* Mission Section */}
      <section className="bg-green-50 rounded-xl p-8 shadow-md mb-16">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          ZenResume exists to simplify the job application process. We use
          artificial intelligence to help job seekers craft professional,
          ATS-friendly resumes in minutes — without stress or guesswork.
        </p>
      </section>

      {/* Why ZenResume */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-green-600 mb-8 text-center">
          Why ZenResume?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              title: "AI Resume Writing",
              desc: "Smart suggestions that improve clarity, impact, and hiring relevance.",
            },
            {
              title: "ATS-Friendly Templates",
              desc: "Professionally designed layouts that pass modern ATS systems.",
            },
            {
              title: "Fast & Simple",
              desc: "Create, edit, and download resumes in just a few clicks.",
            },
            {
              title: "Privacy First",
              desc: "Your data is encrypted and never shared without your consent.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col text-center items-center rounded-xl p-6 max-w-sm
                         border border-green-200 gap-3 shadow-sm
                         hover:shadow-lg hover:border-green-400
                         hover:bg-green-50/50 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="text-center">
        <p className="text-gray-700 mb-4">
          Whether you're a student, fresher, or professional — ZenResume helps
          you present your best self.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
        >
          Start Building Your Resume
        </button>
      </section>

      <p className="text-center text-gray-500 mt-10 text-sm">
        © 2025 ZenResume. All rights reserved.
      </p>
    </div>
  );
};

export default AboutPage;
