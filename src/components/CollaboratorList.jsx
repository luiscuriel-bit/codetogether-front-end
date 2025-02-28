import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { removeCollaborator } from "../services/collaboratorService";
import ErrorMessage from "./ErrorMessage";
import AuthedUserContext from "../context/AuthedUserContext";

function CollaboratorList({ collaborators, setCollaborators, owner }) {
    const token = useContext(AuthedUserContext);
    const user = jwtDecode(token).user_id;
    const [errorMessage, setErrorMessage] = useState("");

    const handleRemoveCollaborator = async collaboratorId => {
        try {
            const response = await removeCollaborator(collaboratorId);
            if (response) {
                setCollaborators(prev => prev.filter(collaborator => collaborator.id !== collaboratorId));
            }
        } catch (error) {
            setErrorMessage("❌ Error removing collaborator:", error.message);
        }
    };

    return (
        <div className="mt-4">
            <h4 className="font-medium mb-2">Current Collaborators:</h4>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <ul className="space-y-2">
                {collaborators.map(collaborator => (
                    <li
                        key={collaborator.user}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                    >
                        <span>{collaborator.username}</span>
                        <span className="text-sm text-gray-500">{collaborator.role}</span>
                        {owner === user && owner !== collaborator.user && (
                            <button
                                onClick={() => handleRemoveCollaborator(collaborator.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CollaboratorList;