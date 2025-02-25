import { useState } from "react";
import { addCollaborator } from "../services/collaboratorService";

function CollaboratorForm({ projectId }) {
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("viewer");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCollaborator({ projectId, user_id: userId, role });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Add Collaborator</button>
        </form>
    );
}

export default CollaboratorForm;