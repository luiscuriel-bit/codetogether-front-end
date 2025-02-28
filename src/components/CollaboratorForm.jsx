import { useState } from "react";
import { addCollaborator } from "../services/collaboratorService";
import ErrorMessage from "./ErrorMessage";

function CollaboratorForm({ setCollaborators, projectId }) {
    const [form, setForm] = useState({ user: '', role: 'viewer' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const newCollaborator = await addCollaborator({ projectId, ...form });
            if (newCollaborator) {
                setCollaborators(prev => {
                    const collaboratorIndex = prev.findIndex(
                        collaborator => collaborator.username === newCollaborator.collaborator.username
                    );
                    if (collaboratorIndex !== -1) {
                        return prev.map((collaborator, index) =>
                            index === collaboratorIndex
                                ? { ...collaborator, role: newCollaborator.collaborator.role }
                                : collaborator
                        );
                    } else {
                        return [...prev, newCollaborator.collaborator];
                    }
                });
                setForm({ user: '', role: 'viewer' });
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding collaborator");
            }
        } catch (error) {
            setErrorMessage(`Error adding collaborator: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (event) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    return (

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-medium mb-4">Add Collaborator</h4>
            {errorMessage && <ErrorMessage message={errorMessage} />}

            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    name="user"
                    value={form.user}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <select
                    value={form.role}
                    onChange={handleChange}
                    name="role"
                    className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isSubmitting ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    );
}

export default CollaboratorForm;
