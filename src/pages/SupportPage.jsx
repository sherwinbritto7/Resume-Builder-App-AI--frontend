import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/home/Title";

const SupportPage = () => {
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
          title="Support & Help Center"
          description="We're here to help you get the most out of ZenResume."
        />
      </div>

      {/* Support Intro */}
      <section className="bg-green-50 rounded-xl p-8 shadow-md mb-16">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Need Assistance?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          If you’re facing issues, have questions, or need guidance while
          building your resume, our support team is ready to help you every step
          of the way.
        </p>
      </section>

      {/* Support Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-green-600 mb-8 text-center">
          How Can We Help You?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              title: "Account & Login Issues",
              desc: "Trouble signing in or managing your account settings.",
            },
            {
              title: "Resume Builder Help",
              desc: "Guidance on using AI tools, templates, and editing features.",
            },
            {
              title: "Privacy & Security",
              desc: "Concerns about your data, privacy, and account safety.",
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

      {/* Contact Section */}
      <section className="bg-green-50 rounded-xl p-8 shadow-md mb-16">
        <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
          Contact Support
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div
            className="flex flex-col text-center items-center rounded-xl p-6 max-w-sm
                       border border-green-200 gap-3 shadow-sm
                       hover:shadow-lg hover:border-green-400
                       hover:bg-green-50/50 transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">📧 Email Us</h3>
            <p className="text-sm text-gray-600">
              For support, feedback, or queries
            </p>
            <p className="text-green-600 font-medium">support@zenresume.ai</p>
          </div>

          <div
            className="flex flex-col text-center items-center rounded-xl p-6 max-w-sm
                       border border-green-200 gap-3 shadow-sm
                       hover:shadow-lg hover:border-green-400
                       hover:bg-green-50/50 transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              ⏱ Response Time
            </h3>
            <p className="text-sm text-gray-600">We usually respond within</p>
            <p className="text-green-600 font-medium">24 business hours</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-gray-700 mb-4">
          We’re committed to making your resume-building experience smooth and
          stress-free.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
        >
          Go to Home
        </button>
      </section>

      <p className="text-center text-gray-500 mt-10 text-sm">
        © 2025 ZenResume. All rights reserved.
      </p>
    </div>
  );
};

export default SupportPage;
