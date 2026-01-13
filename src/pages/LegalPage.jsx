import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/home/Title";

const LegalPage = ({ type }) => {
  const navigate = useNavigate();
  const isPrivacy = type === "privacy";
  const buttonRef = useRef(null);

  // Scroll the button into view on page load
  useEffect(() => {
    buttonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const content = isPrivacy ? (
    <>
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-green-600 mb-3">
          Your Privacy Matters
        </h2>
        <p className="text-gray-700 mb-3">
          At ZenResume, your privacy is our top priority. We only collect the
          information necessary to help you build professional resumes quickly
          and efficiently.
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>We collect data like your name, email, and resume details.</li>
          <li>
            All data is securely stored using modern encryption standards.
          </li>
          <li>
            We never sell or rent your personal information to third parties.
          </li>
          <li>You can request to delete your data at any time.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-green-600 mb-3">
          Cookies & Analytics
        </h2>
        <p className="text-gray-700">
          We may use cookies or analytics tools to improve our service and
          provide a personalized experience. These tools do not store sensitive
          personal information.
        </p>
      </section>
    </>
  ) : (
    <>
      <section className="mt-6">
        <h2 className="text-xl font-semibold text-green-600 mb-3">
          Terms of Service
        </h2>
        <p className="text-gray-700 mb-3">
          By using ZenResume, you agree to the following terms:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Provide accurate information when creating your resume.</li>
          <li>
            Accounts are for personal use; sharing login credentials is
            prohibited.
          </li>
          <li>
            ZenResume is not responsible for the outcome of your job
            applications.
          </li>
          <li>
            All AI-generated content is for personal use only and should not be
            redistributed commercially.
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-green-600 mb-3">
          Modifications
        </h2>
        <p className="text-gray-700">
          ZenResume may update these Terms at any time. Continued use of the
          service constitutes acceptance of any changes.
        </p>
      </section>
    </>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-16 py-16">
      {/* Sticky Go Back Button */}
      <button
        ref={buttonRef}
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition
                   sticky top-4 z-50 md:static md:top-auto"
      >
        ← Go Back
      </button>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <Title
          title={isPrivacy ? "Privacy Policy" : "Terms of Service"}
          description="Understand how we protect your information and the rules for using ZenResume."
        />
      </div>

      {/* Content Card */}
      <div className="bg-white shadow-md rounded-xl p-8 space-y-6">
        {content}
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-500 mt-10 text-sm">
        © 2025 ZenResume. All rights reserved.
      </p>
    </div>
  );
};

export default LegalPage;
