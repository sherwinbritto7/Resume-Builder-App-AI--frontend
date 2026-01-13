import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div
      id="cta"
      className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-16 mt-28"
    >
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10 w-full">
        <p className="text-xl font-medium max-w-sm">
          Build a Professional Resume Today and Land Your Dream Job!
        </p>
        <Link
          to="/app?state=register"
          type="button"
          className="group flex items-center gap-2 px-8 py-3 cursor-pointer font-medium border border-green-200 rounded-full text-white bg-green-600 hover:bg-green-500 transition active:scale-95"
        >
          Get Started
          <svg
            className="mt-1 group-hover:translate-x-1 transition-all"
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
