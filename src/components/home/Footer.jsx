import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/80 to-white mt-40">
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <a href="#">
            <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
          </a>
          <div>
            <p className="text-slate-800 font-semibold">Product</p>
            <ul className="mt-2 space-y-2">
              {/* <li>
                <Link to="/" className="hover:text-green-600 transition">
                  Home
                </Link>
              </li> */}
              <li>
                <Link to="/support" className="hover:text-green-600 transition">
                  Support
                </Link>
              </li>
              {/* <li>
                <Link to="/" className="hover:text-green-600 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-green-600 transition">
                  Affiliate
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <p className="text-slate-800 font-semibold">Resources</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/" className="hover:text-green-600 transition">
                  Company
                </Link>
              </li>
              {/* <li>
                <Link to="/" className="hover:text-green-600 transition">
                  Blogs
                </Link>
              </li> */}
              {/* <li>
                <Link to="/" className="hover:text-green-600 transition">
                  Community
                </Link>
              </li> */}
              <li>
                <Link to="/about" className="hover:text-green-600 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-slate-800 font-semibold">Legal</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-green-600 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-600 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-60">
            Making every customer feel valued—no matter the size of your
            audience.
          </p>
          <div className="flex items-center gap-4 mt-3">
            {/* Social Icons (keep as-is) */}
          </div>
          <p className="mt-3 text-center">© 2025 ZenResume</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  );
};

export default Footer;
