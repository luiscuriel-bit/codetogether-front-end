import { useState } from "react";
import { addCollaborator } from "../services/collaboratorService";
import ErrorMessage from "./ErrorMessage";

function CollaboratorForm({ projectId }) {
    const [form, setForm] = useState({ user: '', role: 'viewer' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addCollaborator({ projectId, ...form });
            setForm({ user: '', role: 'viewer' });
        } catch (error) {
            setErrorMessage(`Error adding collaborator: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleChange = (event) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    // return (
    //     <>
    //         {errorMessage && <ErrorMessage message={errorMessage} />}

    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 placeholder="User ID"
    //                 name="user"
    //                 value={form.user}
    //                 onChange={handleChange}
    //                 required
    //             />
    //             <select value={form.role} onChange={handleChange} name="role">
    //                 <option value="viewer">Viewer</option>
    //                 <option value="admin">Admin</option>
    //             </select>
    //             <button type="submit" disabled={isSubmitting}>
    //                 {isSubmitting ? "Adding..." : "Add Collaborator"}
    //             </button>
    //         </form>
    //     </>
    // );
    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Add Collaborator</h4>
            
            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMessage}</div>
            )}

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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    {isSubmitting ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    );
}

export default CollaboratorForm;
