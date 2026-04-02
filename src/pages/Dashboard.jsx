import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  Plus,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  FileTextIcon,
  ClockIcon,
  LayoutDashboardIcon,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setallResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadallResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setallResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } },
      );
      setallResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Please select a file");
    const resumeText = await pdfToText(resume);
    if (!resumeText) return toast.error("Selected file is empty");

    setIsLoading(true);
    try {
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(
        `/api/resumes/update/`,
        { resumeId: editResumeId, resumeData: { title } },
        {
          headers: { Authorization: token },
        },
      );
      setallResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?",
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setallResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadallResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="group flex-1 bg-white p-8 rounded-3xl border border-slate-200 hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 text-left flex flex-col gap-5"
          >
            <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-all duration-500 w-fit shadow-sm">
              <Plus className="size-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Create Resume
              </h3>
              <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                Land your dream job with a fresh, AI-optimized resume started
                from scratch.
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="group flex-1 bg-white p-8 rounded-3xl border border-slate-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-400/10 transition-all duration-500 text-left flex flex-col gap-5"
          >
            <div className="p-4 bg-green-50 text-green-500 rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-all duration-500 w-fit shadow-sm">
              <UploadCloudIcon className="size-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Upload Existing
              </h3>
              <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                Already have a resume? Let our AI parse your PDF and improve it
                instantly.
              </p>
            </div>
          </button>
        </div>

        {/* Resumes Grid */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-5">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <FileTextIcon className="size-6 text-green-600" />
            Recent Resumes
          </h2>
          <div className="text-xs font-bold text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-100 uppercase tracking-tighter">
            {allResumes.length}{" "}
            {allResumes.length === 1 ? "Project" : "Projects"}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {allResumes.length === 0 ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-4xl bg-slate-50/30">
              <div className="p-6 bg-white rounded-full shadow-sm mb-6">
                <FileTextIcon className="size-10 text-slate-200" />
              </div>
              <p className="text-xl font-semibold text-slate-500">
                No resumes yet
              </p>
              <p className="text-slate-400 mt-2 mb-6">
                Your professional journey starts here.
              </p>
              <button
                onClick={() => setShowCreateResume(true)}
                className="px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-green-500/20"
              >
                Create your first resume
              </button>
            </div>
          ) : (
            allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={resume._id}
                  className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500"
                >
                  <div
                    onClick={() => navigate(`/app/builder/${resume._id}`)}
                    className="h-44 cursor-pointer flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}05, ${baseColor}20)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, ${baseColor} 1px, transparent 0)`,
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="p-5 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:scale-110">
                      <FileTextIcon
                        className="size-10"
                        style={{ color: baseColor }}
                      />
                    </div>
                  </div>

                  <div className="p-5 relative">
                    <h3
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className="font-bold text-slate-800 truncate cursor-pointer hover:text-green-600 transition-colors uppercase tracking-tight text-xs mb-2"
                    >
                      {resume.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-semibold uppercase tracking-widest">
                      <ClockIcon className="size-3" />
                      <span>
                        {new Date(resume.updatedAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={() => navigate(`/app/builder/${resume._id}`)}
                        className="flex-1 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-green-600 transition-colors"
                      >
                        OPEN
                      </button>
                      <button
                        onClick={() => {
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                        }}
                        className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Rename"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        onClick={() => deleteResume(resume._id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div>
          {showCreateResume && (
            <form
              onSubmit={createResume}
              onClick={() => showCreateResume(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                  required
                />
                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Create Resume
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle("");
                  }}
                />
              </div>
            </form>
          )}

          {showUploadResume && (
            <form
              onSubmit={uploadResume}
              onClick={() => showUploadResume(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                  required
                />
                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm text-slate-700"
                  >
                    Select Resume File
                    <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10  my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                      {resume ? (
                        <p className="text-green-700">{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className="size-14 stroke-1" />
                          <p>Upload Resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="resume-input"
                    accept="application/pdf"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading && (
                    <LoaderCircleIcon className="animate-spin size-4 text-white" />
                  )}
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle("");
                  }}
                />
              </div>
            </form>
          )}

          {editResumeId && (
            <form
              onSubmit={editTitle}
              onClick={() => setEditResumeId("")}
              className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                  required
                />
                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Update
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setEditResumeId("");
                    setTitle("");
                  }}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
