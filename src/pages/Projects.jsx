import { useEffect, useState } from "react";
import { fetchProjects } from "../services/projectService";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const projectsData = await fetchProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, []);

    return (
        <div>
            <h1>Projects</h1>
            {projects.map(project => (
                <div key={project.id}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Projects;