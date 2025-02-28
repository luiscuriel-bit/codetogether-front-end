import { useState } from "react";
import { createProject } from "../services/projectService";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
    const [form, setForm] = useState({ name: "", code: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = event => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const newProject = await createProject(form);
            if (newProject && newProject.id) {
                setForm({ name: "", code: "" });
                setErrorMessage("");
                navigate(`/projects/${newProject.id}`);
            } else {
                setErrorMessage("Error creating project");
            }
        } catch (error) {
            setErrorMessage(`Error creating project: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2 font-medium">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                                placeholder="My Awesome Project"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Creating..." : "Create Project"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProjectForm;
