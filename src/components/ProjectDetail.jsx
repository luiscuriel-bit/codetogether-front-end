import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../services/projectService";
import {
    getCollaborators,
    removeCollaborator,
} from "../services/collaboratorService";
import { useContext } from 'react';
import AuthedUserContext from '../context/AuthedUserContext.js';
import { jwtDecode } from "jwt-decode";
import CollaboratorForm from "./CollaboratorForm";
import ErrorMessage from "./ErrorMessage";

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [collaborators, setCollaborators] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const token = useContext(AuthedUserContext);

    useEffect(() => {
        const loadProject = async () => {
            const projectData = await fetchProjectById(id);
            setProject(projectData);
        };

        const loadCollaborators = async () => {
            const collaboratorData = await getCollaborators(id);
            setCollaborators(collaboratorData);
        };

        loadProject();
        loadCollaborators();
    }, [id]);

    const handleRemoveCollaborator = async (collaboratorId) => {
        try {
            const response = await removeCollaborator(collaboratorId);
            if (response) {
                setCollaborators((prev) => prev.filter(c => c.id !== collaboratorId));
            }
        } catch (error) {
            setErrorMessage("❌ Error removing collaborator");
        }
    };

    if (!project || !collaborators) return <p>Cargando...</p>;


    if (!token) {
        console.error("🚨 No token.");
        return;
    }
    const user = jwtDecode(token).user_id;

    return (
        <div>
            <h2>{project.name}</h2>

            <h3>Collaborators</h3>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <ul>
                {collaborators.map(collaborator => (
                    <li key={collaborator.user}>
                        {collaborator.username} - {collaborator.role}
                        {project.owner === user && collaborator.user !== user && (
                            <button onClick={() => handleRemoveCollaborator(collaborator.id)}>
                                Remove
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <CollaboratorForm projectId={id} />
        </div>
    );
}

export default ProjectDetail;
