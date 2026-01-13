import { File, Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  // 🔹 Make sure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  const addProject = () => {
    const newProject = { name: "", type: "", description: "" };
    onChange([...safeData, newProject]);
  };

  const removeProject = (index) => {
    const updated = safeData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...safeData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your project</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" /> Add Project
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {safeData.map((projects, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4>Project #{index + 1}</h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Project Name"
                className="px-3 py-2 text-sm rounded-lg"
                value={projects.name || ""}
                onChange={(e) => updateProject(index, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Project Type"
                className="px-3 py-2 text-sm rounded-lg"
                value={projects.type || ""}
                onChange={(e) => updateProject(index, "type", e.target.value)}
              />
              <textarea
                rows={4}
                placeholder="Describe your projects..."
                className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                value={projects.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
