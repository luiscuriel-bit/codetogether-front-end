import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as projectService from '../services/projectService';
import * as collaboratorService from '../services/collaboratorService';
import ErrorMessage from './ErrorMessage';
import CollaboratorForm from './CollaboratorForm.jsx';
import { jwtDecode } from "jwt-decode";


function ProjectDetail({token}) {
    const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const userId = jwtDecode(token).user_id;
    const [project, setProject] = useState(null);
    const [collaborators, setCollaborators] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectData = await projectService.fetchProjectById(id);
                const collaboratorsData = await collaboratorService.getCollaborators(id);
                setProject(projectData);
                setCollaborators(collaboratorsData);
            } catch (error) {
                console.error('Error fetching project:', error);
                setErrorMessage + ('Error fetching project:', error);
            }
        };
        fetchData();
    }, [id]);


    if (!project) return <p>Loading...</p>;

    return (
        <div>
            {errorMessage && <ErrorMessage message="There was a problem loading the project." />}
            <h2>{project.name}</h2>
            <p>{project.description}</p>

            <h3>Collaborators</h3>
            <ul>
                {collaborators.map(collab => (
                    <li key={collab.id}>{collab.username} - {collab.role}</li>
                ))}
            </ul>

            <CollaboratorForm projectId={id} userId={userId} />

            <Link to={`/projects/${id}/edit`}>
                <button>Edit Code</button>
            </Link>
        </div>
    );
}

export default ProjectDetail;