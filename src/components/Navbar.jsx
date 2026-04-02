import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };
  return (
    <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-6 py-4">
        <Link to="/app" className="hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <div className="size-2 bg-green-500 rounded-full animate-pulse" />
            <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
          </div>
          <button
            onClick={logoutUser}
            className="text-sm font-bold text-slate-700 hover:text-green-600 transition-colors uppercase tracking-widest px-2"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
