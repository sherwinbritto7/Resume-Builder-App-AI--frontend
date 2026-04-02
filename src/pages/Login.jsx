import { ArrowLeft, Loader, Lock, Mail, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative overflow-hidden font-['Poppins']">
      {/* Background Blurs to match Home theme */}
      <div className="absolute top-[-10%] left-[-10%] size-72 sm:size-96 bg-green-200 blur-[120px] opacity-40 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] size-72 sm:size-96 bg-indigo-200 blur-[120px] opacity-30 -z-10"></div>

      <div className="z-10 w-full max-w-[540px] px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-2xl border border-slate-100 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] rounded-[3rem] p-8 md:p-14 text-center"
        >
          <div className="flex justify-start mb-6 -mt-4">
            <Link
              to="/"
              className="group flex items-center gap-2 text-[10px] font-extrabold text-slate-400 hover:text-green-600 transition-all uppercase tracking-[0.2em]"
            >
              <div className="p-2 rounded-full border border-slate-100 group-hover:border-green-100 transition-colors">
                <ArrowLeft size={10} />
              </div>
              Back to Home
            </Link>
          </div>

          <div className="mb-10 text-left">
            <h1 className="text-slate-900 text-3xl font-bold tracking-tight mb-2 leading-tight">
              {state === "login" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80">
              {state === "login"
                ? "Welcome back! Enter your credentials to continue."
                : "Enter your details to start building your resume."}
            </p>
          </div>

          <div className="space-y-4">
            {state !== "login" && (
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors">
                  <User2Icon size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full h-14 bg-slate-50/50 border border-slate-100 rounded-2xl pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full h-14 bg-slate-50/50 border border-slate-100 rounded-2xl pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full h-14 bg-slate-50/50 border border-slate-100 rounded-2xl pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {state === "login" && (
            <div className="mt-4 text-right">
              <button
                type="button"
                className="text-[10px] font-extrabold text-slate-400 hover:text-green-600 transition-colors uppercase tracking-widest"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-10 w-fit mx-auto px-12 h-11 rounded-full text-white bg-green-500 hover:bg-green-600 shadow-[0_8px_16px_-4px_rgba(34,197,94,0.25)] hover:shadow-[0_12px_24px_-6px_rgba(34,197,94,0.4)] active:scale-[0.98] transition-all font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <Loader className="animate-spin w-5 h-5 text-white" />
            ) : (
              <span>{state === "login" ? "Sign In" : "Create Account"}</span>
            )}
          </button>

          <p className="text-slate-500 text-sm mt-10 font-medium">
            {state === "login"
              ? "New to ZenResume?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setState(state === "login" ? "register" : "login")}
              className="text-green-600 font-bold hover:text-green-700 ml-1 underline-offset-4 hover:underline transition-all"
            >
              {state === "login" ? "Create Account" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
