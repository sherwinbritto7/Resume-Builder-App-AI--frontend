import { useEffect, useState } from "react";
import { data, Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );
      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume: ", error);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      //remove image from updatedResumeData
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to={"/app"}
              className="inline-flex gap-2 items-center text-xs font-bold text-slate-400 hover:text-green-600 transition-all uppercase tracking-widest mb-3"
            >
              <ArrowLeftIcon className="size-3" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
              {resumeData.title || "Untitled Resume"}
              <div className="text-[10px] font-bold text-green-700 bg-green-500/10 border border-green-200 rounded-full px-3 py-1 uppercase tracking-tighter">
                Live Editing
              </div>
            </h1>
          </div>

          <div className="flex items-center gap-3">
              <button
                onClick={changeResumeVisibility}
                className={`flex items-center px-5 py-2.5 gap-2 text-xs font-bold rounded-xl transition-all active:scale-95 border ${
                  resumeData.public 
                  ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {resumeData.public ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
                {resumeData.public ? "PUBLIC" : "PRIVATE"}
              </button>
              
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center px-5 py-2.5 gap-2 text-xs font-bold bg-white text-slate-600 border border-slate-200 rounded-xl hover:border-slate-300 active:scale-95 transition-all shadow-sm"
                >
                  <Share2Icon size={14} /> SHARE
                </button>
              )}
              
              <button
                onClick={downloadResume}
                className="flex items-center px-5 py-2.5 gap-2 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-green-600 active:scale-95 transition-all shadow-lg shadow-slate-900/10"
              >
                <DownloadIcon size={14} /> DOWNLOAD
              </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Panel - Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-24">
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100 relative">
                <div
                    className="absolute top-0 left-0 h-full bg-linear-to-r from-green-500 to-green-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                  style={{
                    width: `${
                      ((activeSectionIndex + 1) * 100) / sections.length
                    }%`,
                  }}
                />
              </div>

              <div className="p-8">
                {/* Section Navigation Header */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(template) =>
                        setResumeData((prev) => ({ ...prev, template }))
                      }
                    />
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(color) =>
                        setResumeData((prev) => ({
                          ...prev,
                          accent_color: color,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    <button
                      className="p-2 rounded-xl text-slate-400 hover:text-green-600 hover:bg-white transition-all disabled:opacity-30"
                      disabled={activeSectionIndex === 0}
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <span className="text-[10px] font-bold text-slate-400 px-2 tracking-widest uppercase">
                      {activeSectionIndex + 1} / {sections.length}
                    </span>
                    <button
                      className="p-2 rounded-xl text-slate-400 hover:text-green-600 hover:bg-white transition-all disabled:opacity-30"
                      disabled={activeSectionIndex === sections.length - 1}
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.min(prevIndex + 1, sections.length - 1)
                        )
                      }
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="min-h-[400px]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
                        <activeSection.icon size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 leading-tight">{activeSection.name}</h2>
                        <p className="text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">Step {activeSectionIndex + 1}</p>
                    </div>
                  </div>

                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {activeSection.id === "personal" && (
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    )}
                    {activeSection.id === "summary" && (
                      <ProfessionalSummaryForm
                        data={resumeData.professional_summary}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            professional_summary: data,
                          }))
                        }
                        setResumeData={setResumeData}
                      />
                    )}
                    {activeSection.id === "experience" && (
                      <ExperienceForm
                        data={resumeData.experience}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "education" && (
                      <EducationForm
                        data={resumeData.education}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            education: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "projects" && (
                      <ProjectForm
                        data={resumeData.projects}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            projects: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "skills" && (
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            skills: data,
                          }))
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between gap-4">
                    <p className="text-[10px] text-slate-400 font-medium italic">Changes are saved automatically to draft.</p>
                    <button
                        onClick={() => {
                        toast.promise(saveResume, { loading: "Mirroring your changes...", success: "Resume Saved!", error: "Save Failed" });
                        }}
                        className="px-8 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-green-500/20 text-xs tracking-widest uppercase"
                    >
                        Save Final Version
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview Area */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 md:p-8">
                <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
