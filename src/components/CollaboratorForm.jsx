import { useState } from "react";
import { addCollaborator } from "../services/collaboratorService";
import ErrorMessage from "./ErrorMessage";

function CollaboratorForm({ projectId }) {
    const [form, setForm] = useState({ user: '', role: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addCollaborator({ projectId, ...form });
            setForm({ user: '', role: '' });
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
        <>
            {errorMessage && <ErrorMessage message={errorMessage} />}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User ID"
                    name="user"
                    value={form.user}
                    onChange={handleChange}
                    required
                />
                <select value={form.role} onChange={handleChange} name="role">
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Collaborator"}
                </button>
            </form>
        </>
    );
}

export default CollaboratorForm;
