import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProjectById } from "../services/projectService";
import CollaboratorForm from "./CollaboratorForm";
import ErrorMessage from "./ErrorMessage";
import CollaboratorList from "./CollaboratorList.jsx";
import { getCollaborators } from "../services/collaboratorService.js";
import AuthedUserContext from "../context/AuthedUserContext.js";
import { jwtDecode } from "jwt-decode";

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [collaborators, setCollaborators] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const token = useContext(AuthedUserContext);
    const user = jwtDecode(token).user_id;
    const [currentCollaborator, setCurrentCollaborator] = useState(null);

    useEffect(() => {
        const loadProject = async () => {
            try {
                const projectData = await fetchProjectById(id);
                setProject(projectData);
            } catch (error) {
                setErrorMessage("❌ Error fetching project:", error.message);
            }
        };
        
        if (token) {
            loadProject();
        }
    }, [id, token, user]);

    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const collaboratorData = await getCollaborators(id);
                setCurrentCollaborator(collaboratorData.find(collaborator => collaborator.user === user));
                setCollaborators(collaboratorData)
            } catch (error) {
                setErrorMessage("❌ Error fetching collaborators:", error.message);
            }
        };

        if (token) {
            fetchCollaborators();
        }
    }, [id, token, user]);


    if (!project || !currentCollaborator) return <p>Loading...</p>;


    if (!token) {
        console.error("🚨 No token.");
        return;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-22">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                    <Link
                        to={`/projects/${project.id}/edit`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Go to Code Editor
                    </Link>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Collaborators</h3>

                    {errorMessage && <ErrorMessage message={errorMessage} />}

                    <CollaboratorList
                        currentCollaborator={currentCollaborator}
                        collaborators={collaborators}
                        setCollaborators={setCollaborators}
                        owner={project.owner}
                    />

                    {currentCollaborator.role === 'admin' && <CollaboratorForm
                        currentCollaborator={currentCollaborator}
                        setCollaborators={setCollaborators}
                        projectId={id}
                    />}
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
